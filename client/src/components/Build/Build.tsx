import { useBuild } from "../../gql/queries/build";
import { Fragment } from "react";
import React from "react";

export function Build() {
  const { build, loading, error } = useBuild();

  if (loading) {
    return <>Loading...</>
  }

  return (
    <Fragment>
      version {build.projectVersion}-{build.gitRef}
    </Fragment>
  );
}