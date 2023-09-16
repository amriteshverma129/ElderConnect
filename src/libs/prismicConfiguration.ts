import { LinkResolver } from "prismic-reactjs";

const repoName = process.env.NEXTJS_PRISMIC_REPOSITORY_NAME || "loop-web-members";
export const baseEndpoint = `https://${repoName}.cdn.prismic.io`;
export const accessToken = "";

export const linkResolver: LinkResolver = (doc) => {
    switch (doc.type) {
        case "homepage":
            return "/home";
        default:
            return "/";
    }
};
