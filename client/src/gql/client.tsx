import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { Config } from '../config';
import { WebSocketLink } from "@apollo/client/link/ws";
import { RetryLink } from "@apollo/client/link/retry";
import { SubscriptionClient } from "subscriptions-transport-ws";

const subscriptionClient = new SubscriptionClient(Config.subscriptionEndpoint, {
  reconnect: true,
});

const link = new RetryLink({ attempts: { max: 2 } }).split(
  (operation) => operation.operationName === 'subscription',
  new WebSocketLink(subscriptionClient),
  new HttpLink({ uri: Config.graphQLEndpoint, credentials: 'include' })
);

const cache = new InMemoryCache();

export const client = new ApolloClient<any>({
  cache: cache,
  link: link,
});

function mergeArrayByField<T>(fieldName: string) {
  return (existing: T[] = [], incoming: T[], { readField, mergeObjects }) => {
    const merged: any[] = existing ? existing.slice(0) : [];
    const objectFieldToIndex: Record<string, number> = Object.create(null);
    if (existing) {
      existing.forEach((obj, index) => {
        objectFieldToIndex[readField(fieldName, obj)] = index;
      });
    }
    incoming.forEach(obj => {
      const field = readField(fieldName, obj);
      const index = objectFieldToIndex[field];
      if (typeof index === "number") {
        merged[index] = mergeObjects(merged[index], obj);
      } else {
        objectFieldToIndex[name] = merged.length;
        merged.push(obj);
      }
    });
    return merged;
  }
}