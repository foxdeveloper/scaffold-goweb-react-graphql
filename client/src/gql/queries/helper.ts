import { useQuery, DocumentNode } from "@apollo/client";
import { useState, useEffect } from "react";

export function useGraphQLData<T>(q: DocumentNode, key: string, defaultValue: T, options = {}) {
  const query = useQuery(q, options);
  const [data, setData] = useState<T>(defaultValue);
  useEffect(() => {
    setData(query.data ? query.data[key] as T : defaultValue);
  }, [query.loading, query.data]);
  return { data, loading: query.loading, error: query.error };
}