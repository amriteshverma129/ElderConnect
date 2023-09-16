import { NextApiRequest, NextApiResponse } from "next";
import { ssrGetAllEventDetail } from "../../generated/page";
import { gql } from "@apollo/client";
import client from "../../apolloClient";
import { verifySignature } from "@upstash/qstash/nextjs";

const insertPrismicMeetingDetailQuery = gql`
    mutation insert_prismicMeetingDetail($List: [prismicMeetingDetail_insert_input!]!) {
        insert_prismicMeetingDetail(
            objects: $List
            on_conflict: {
                constraint: prismicMeetingDetail_meetingId_key
                update_columns: [category, roles, tag, categoryArr]
            }
        ) {
            affected_rows
        }
    }
`;

export async function updatePrismicContent(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await ssrGetAllEventDetail.getServerPage(
            {
                variables: {},
            },
            {},
        );
        const edges = await response.props.data.allEventdetailpages.edges;
        if (edges && edges.length) {
            const List = edges.map((item) => {
                return {
                    meetingId: item?.node.meetingId,
                    roles: item?.node.roles2?.map((role) => role.plan?.trim()),
                    category: item?.node.category,
                    categoryArr: item?.node.category?.split(",").map((cate) => cate?.trim().toLowerCase()),
                    tag: item?.node.tag,
                };
            });
            await client
                .mutate({
                    mutation: insertPrismicMeetingDetailQuery,
                    variables: {
                        List: List,
                    },
                })
                .then(() => {
                    res.status(200).json({ success: true });
                })
                .catch(() => {
                    res.status(400).json({ success: false, error: "something is wrong with hasura" });
                });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching data from Prismic." });
    }
}

export default verifySignature(updatePrismicContent);

export const config = {
    api: {
        bodyParser: false,
    },
};
