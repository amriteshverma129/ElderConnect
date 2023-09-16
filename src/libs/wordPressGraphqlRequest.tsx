import { DocumentNode, print } from "graphql";

export async function wordPressGraphqlRequest(query: DocumentNode) {
    const url = "https://loopvillagepro.wpengine.com/graphql";
    const headers = { "Content-Type": "application/json" };

    try {
        const res = await fetch(url, {
            headers,
            method: "post",
            body: JSON.stringify({ query: print(query) }),
        });

        const resJson = await res.json();

        return resJson;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
