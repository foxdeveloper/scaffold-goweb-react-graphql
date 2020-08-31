export const Config = {
  graphQLEndpoint: get<string>("graphQLEndpoint", "http://localhost:8081/api/v1/graphql"),
  subscriptionEndpoint: get<string>("subscriptionEndpoint", "ws://localhost:8081/api/v1/graphql"),
};

function get<T>(key: string, defaultValue: T): T {
  const config = window['__CONFIG__'] || {};
  if (config && config.hasOwnProperty(key)) {
    return config[key] as T;
  } else {
    return defaultValue;
  }
} 