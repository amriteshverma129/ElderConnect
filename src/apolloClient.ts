import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

// HTTP Link
const httpLink = new HttpLink({
    uri: "https://loop-web-members.hasura.app/v1/graphql",
});

const wsLink =
    typeof window !== "undefined"
        ? new GraphQLWsLink(
              createClient({
                  url: "wss://loop-web-members.hasura.app/v1/graphql",
                  connectionParams: {
                      headers: {
                          "x-hasura-admin-secret": "diwfY5Oevvht7qMjEs1qmmixdogiZdDCYlFkKGgt4liHrYmUxlq94Gocj79BLf7E",
                      },
                  },
              }),
          )
        : null;

// Apollo Link for authentication
const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            "x-hasura-admin-secret": "diwfY5Oevvht7qMjEs1qmmixdogiZdDCYlFkKGgt4liHrYmUxlq94Gocj79BLf7E",
        },
    });
    return forward(operation);
});

// Split Link for handling HTTP and WebSocket requests
const splitLink = wsLink
    ? split(
          ({ query }) => {
              const definition = getMainDefinition(query);
              return definition.kind === "OperationDefinition" && definition.operation === "subscription";
          },
          wsLink,
          authLink.concat(httpLink),
      )
    : authLink.concat(httpLink);

// Apollo Client
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

export default client;
