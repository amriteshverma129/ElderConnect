declare module "apollo-link-prismic" {
    import { ApolloLink } from "@apollo/client";

    export function PrismicLink(args: { uri: string; accessToken?: string } & Record<string, unknown>): ApolloLink;
}
