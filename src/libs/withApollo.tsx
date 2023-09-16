import { NextPage } from "next";
import { PrismicLink } from "apollo-link-prismic";
import { ApolloClient, NormalizedCacheObject, InMemoryCache, ApolloProvider } from "@apollo/client";
import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { accessToken, baseEndpoint } from "./prismicConfiguration";
import React from "react";

export type ApolloClientContext = {
    req?: IncomingMessage & {
        cookies: NextApiRequestCookies;
    };
};

interface WithApolloProps {
    __APOLLO_STATE__?: NormalizedCacheObject;
}

export function withApollo<T>(Comp: NextPage<T & WithApolloProps>) {
    const WithApollo = (props: T & WithApolloProps) => {
        return (
            <ApolloProvider client={getApolloClient(undefined, props.__APOLLO_STATE__)}>
                <Comp {...props} />
            </ApolloProvider>
        );
    };

    return WithApollo;
}

export const getApolloClient = (ctx?: ApolloClientContext, initialState?: NormalizedCacheObject) => {
    if (ctx && ctx.req) {
        const { req } = ctx;
        // Do something with the cookies here, maybe add a header for authentication
        const cookies = req.cookies;
        console.log(cookies);
    }

    const cache = new InMemoryCache().restore(initialState || {});
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: PrismicLink({
            uri: `${baseEndpoint}/graphql`,
            accessToken,
        }),
        cache,
    });
};
