import ApolloClient, { InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';

export class Client {

    private client : ApolloClient<InMemoryCache>

    constructor(uri = "/graphql") {
        this.client = new ApolloClient({
            uri: uri,
            cache: new InMemoryCache({
            addTypename: false
            })
        });
    }

    fetchAPI = (): Promise<any> => {
        return this.client.query({
            query: gql`
            {
                api {
                    gitRef,
                    projectVersion,
                    buildDate
                }
            }
            `
        });
    }

}

export const client = new Client();
