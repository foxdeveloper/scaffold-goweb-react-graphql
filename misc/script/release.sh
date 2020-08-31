#!/bin/bash

set -eo pipefail

OS_TARGETS=(linux)
ARCH_TARGETS=${ARCH_TARGETS:-amd64 arm 386}

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
PROJECT_DIR="$DIR/../.."

function build {

  local name=$1
  local srcdir=$2
  local os=$3
  local arch=$4

  local dirname="$name-$os-$arch"
  local destdir="$PROJECT_DIR/release/$dirname"

  rm -rf "$destdir"
  mkdir -p "$destdir"

  echo "building $dirname..."

  CGO_ENABLED=0 GOOS="$os" GOARCH="$arch" go build \
    -ldflags="-s -w -X main.GitCommit=$(current_commit_ref) -X main.ProjectVersion=$(current_version)" \
    -gcflags=-trimpath="${PWD}" \
    -asmflags=-trimpath="${PWD}" \
    -o "$destdir/bin/$name" \
    "$srcdir"

  if [ ! -z "$(which upx)" ]; then
    upx --best "$destdir/bin/$name"
  fi

}

function current_commit_ref {
  git rev-list -1 HEAD
}

function current_version {
  local latest_tag=$(git describe --abbrev=0 2>/dev/null)
  echo ${latest_tag:-0.0.0}
}

function copy {

  local name=$1
  local os=$2
  local arch=$3
  local src=$4
  local dest=$5

  local dirname="$name-$os-$arch"
  local destdir="$PROJECT_DIR/release/$dirname"

  echo "copying '$src' to '$destdir/$dest'..."

  mkdir -p "$(dirname $destdir/$dest)"

  cp -rfL $src "$destdir/$dest"

}

function dump_default_conf {
  # Generate and copy configuration file
  local command=$1
  local os=$2
  local arch=$3
  local tmp_conf=$(mktemp)

  go run "$PROJECT_DIR/cmd/$command" -dump-config > "$tmp_conf"
  copy "$command" $os $arch "$tmp_conf" "$command.conf"
  rm -f "$tmp_conf"
}

function compress {

  local name=$1
  local os=$2
  local arch=$3

  local dirname="$name-$os-$arch"
  local destdir="$PROJECT_DIR/release/$dirname"

  echo "compressing $dirname..."
  tar -czf "$destdir.tar.gz" -C "$destdir/../" "$dirname"
}

function release_server {

  local os=$1
  local arch=$2
  
  build 'server' "$PROJECT_DIR/cmd/server" $os $arch

  dump_default_conf 'server' $os $arch
  
  copy 'server' $os $arch "$PROJECT_DIR/README.md" "README.md"
  copy 'server' $os $arch "$PROJECT_DIR/client/dist" "public"

  compress 'server' $os $arch

}

function main {

  make client-dist

  for os in ${OS_TARGETS[@]}; do
    for arch in ${ARCH_TARGETS[@]}; do
      release_server $os $arch
    done
  done
}

main