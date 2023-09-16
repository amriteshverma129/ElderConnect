import { NextApiRequest, NextApiResponse } from "next";
import { sendResponseToKeap } from "../../Functions/functions";

const keapToken = process.env.KEAP_TOKEN;

export default async function createUserOnKeap2(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    const username = body.userName;
    const connection = body.connection;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const partnerCode = body.partnerCode;
    const nameOfBusiness = body.nameOfBusiness;
    // Referral Code Custom Field Id in keap is 251
    // Partner Code Custom Field Id in keap is 227
    try {
      const response = await fetch(
        `https://api.infusionsoft.com/crm/rest/v1/contacts`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Keap-API-Key": `${process.env.keapAccessToken}`,
          },
          body: JSON.stringify(
            connection === "email"
              ? {
                  family_name: lastName,
                  given_name: firstName,
                  email_addresses: [
                    {
                      email: username,
                      field: "EMAIL1",
                    },
                  ],
                  custom_fields: [
                    {
                      content: partnerCode,
                      id: nameOfBusiness !== "" ? 251 : 227,
                    },
                    {
                      content: nameOfBusiness,
                      id: 247,
                    },
                  ],
                  opt_in_reason: "Contact gave explicit permission.",
                  duplicate_option: "Email",
                }
              : {
                  family_name: lastName,
                  given_name: firstName,
                  phone_numbers: [
                    {
                      number: username,
                      field: "PHONE1",
                    },
                  ],
                  custom_fields: [
                    {
                      content: partnerCode,
                      id: nameOfBusiness !== "" ? 251 : 227,
                    },
                    {
                      content: nameOfBusiness,
                      id: 247,
                    },
                  ],
                  opt_in_reason: "Contact gave explicit permission.",
                  duplicate_option: "EmailAndName",
                }
          ),
        }
      );
      if (response.status === 401) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
      }
      if (response.status >= 400) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
        return;
      }
      const data = await response.json();
      await sendResponseToKeap(data.id, keapToken, "CreateUserTrial").then(
        (response) => {
          response && res.status(200).json({ success: true, data });
        }
      );
    } catch (err: unknown) {
      res
        .status(500)
        .json({ success: false, message: "Internnal Server Error" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
