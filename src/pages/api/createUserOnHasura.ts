import { NextApiRequest, NextApiResponse } from "next";
import client from "../../apolloClient";
import { gql } from "@apollo/client";

export default async function createUserOnHasura(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const body = req.body;
        const username = body.userName;
        const connection = body.connection;
        const firstName = body.firstName;
        const lastName = body.lastName;
        const contactId = body.contactId;
        const roles = body.roles;
        const nameOfBusiness = body.nameOfBusiness;

        try {
            const hasuraRes = await client.mutate({
                variables: {
                    contactId: Number(contactId),
                    firstName: firstName,
                    lastName: lastName,
                    roles: roles,
                    email: connection === "email" ? username : null,
                    phone: connection === "sms" ? username : null,
                    connection: connection?.trim(),
                    nameOfBusiness: nameOfBusiness !== "" ? nameOfBusiness : null,
                },
                mutation: gql`
                    mutation insert_userDetails_one(
                        $contactId: Int
                        $email: String
                        $firstName: String
                        $lastName: String
                        $phone: String
                        $roles: String
                        $connection: String
                        $nameOfBusiness: String
                    ) {
                        insert_userDetails_one(
                            object: {
                                contactId: $contactId
                                email: $email
                                firstName: $firstName
                                lastName: $lastName
                                phone: $phone
                                roles: $roles
                                connection: $connection
                                nameOfBusiness: $nameOfBusiness
                            }
                            on_conflict: {
                                constraint: userDetails_pkey
                                update_columns: [firstName, lastName, roles, phone, email, connection, nameOfBusiness]
                            }
                        ) {
                            contactId
                        }
                    }
                `,
            });
            const data = await hasuraRes.data;
            const insert_userDetails_one = await data.insert_userDetails_one;
            res.status(200).json({ success: true, data: insert_userDetails_one });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "Internal Server Error" });
            return;
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
