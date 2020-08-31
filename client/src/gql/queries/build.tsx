import { gql, useQuery } from "@apollo/client";
import { useGraphQLData } from "./helper";
import { Build } from "../../types/build";

export const QUERY_BUILD = gql`
query build {
  build {
    gitRef,
    projectVersion,
    buildDate
  }
}`;

export function useBuildQuery() {
  return useQuery(QUERY_BUILD);
}

export function useBuild() {
  const { data, loading, error } = useGraphQLData<Build>(
    QUERY_BUILD, 'build', { gitRef: '', projectVersion: '', buildDate: '' }
  );
  return { build: data, loading, error };
}