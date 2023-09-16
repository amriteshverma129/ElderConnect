import { NextApiRequest, NextApiResponse } from "next";
import client from "../../apolloClient";
import { gql } from "@apollo/client";
import { sendResponseToKeap } from "../../Functions/functions";

const keapToken = process.env.KEAP_TOKEN;

interface ApiResponse {
    status: number;
    message: string;
}

const updateUserDetail = (req: NextApiRequest): Promise<ApiResponse> => {
    const roles = req.query.roles;
    const firstName = req.query.firstName;
    const contactId = req.query.contactId;
    const buddy = req.query.buddy;
    const buddyIntakeForm = req.query.buddyIntakeForm;
    return new Promise(async (resolve) => {
        try {
            const hasuraRes = await client.mutate({
                variables: {
                    contactId: Number(contactId),
                    firstName: firstName,
                    roles: roles === null || roles === undefined || roles === "" ? null : String(roles),
                    buddy: buddy === null || buddy === undefined || buddy === "" ? null : String(buddy),
                    buddyIntakeForm:
                        buddyIntakeForm === null || buddyIntakeForm === undefined || buddyIntakeForm === ""
                            ? null
                            : String(buddyIntakeForm),
                },
                mutation: gql`
                    mutation insert_userDetails_one(
                        $contactId: Int
                        $firstName: String
                        $roles: String
                        $buddy: String
                        $buddyIntakeForm: String
                    ) {
                        insert_userDetails_one(
                            object: {
                                contactId: $contactId
                                firstName: $firstName
                                roles: $roles
                                buddy: $buddy
                                buddyIntakeForm: $buddyIntakeForm
                            }
                            on_conflict: {
                                constraint: userDetails_pkey
                                update_columns: [roles, buddy, buddyIntakeForm]
                            }
                        ) {
                            contactId
                        }
                    }
                `,
            });
            const data = await hasuraRes.data;
            const insert_userDetails_one = await data.insert_userDetails_one;
            if (insert_userDetails_one) {
                sendResponseToKeap(contactId, keapToken, "SETUSER").then((response) => {
                    console.log(response);
                    resolve({ status: 200, message: "success" });
                });
                return;
            }
            sendResponseToKeap(contactId, keapToken, "SETUSERFAIL").then((response) => {
                console.log(response);
                resolve({ status: 400, message: "something is wrong with hasura client" });
            });
        } catch (err: unknown) {
            sendResponseToKeap(contactId, keapToken, "SETUSERFAIL").then((response) => {
                console.log(response);
                resolve({ status: 500, message: "Internal Server Error" });
            });
            return;
        }
    });
};
export default async function setUserDetails(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const response = await updateUserDetail(req);
            if (response.status >= 400) {
                res.status(response.status).json(response);
                return;
            }
            res.status(response.status).json(response);
        } catch (error) {
            res.status(500).json({ status: 500, message: "Internal Server Error" });
            return;
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
