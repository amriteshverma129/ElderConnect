import { SetStateAction, Dispatch } from "react";
import client from "../apolloClient";
import moment from "moment";
import {
  getUserDetailCountUsingEmailQuery,
  getUserDetailUsingEmailQuery,
  getUserDetailUsingPhoneQuery,
} from "../components/Account/Queries";
import { nodeType, stringType } from "../components/Event/Type";
import { GetAllEventDetailPageQuery } from "../generated/graphql";
import { ErrorType, UserProfile } from "../components/Home/Type";
import { userType } from "../components/Account/Type";
import { gql } from "@apollo/client";
import { NextRouter } from "next/router";

//below function to fetch One Time access token to access Auth0
export const fetchAccessToken = async () => {
  try {
    const authRes = await fetch(
      `https://dev-4ltmz52olaylamco.us.auth0.com/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: "kQdFOvKpkobiWhFrGcjJl3ItD1BbsN3w",
          client_secret:
            "Ut4O7Sa9Y8_dQhF61zZmOVXVDQ5SfLPhNGHm7ZjtYUCyGjsgTCl0SUpDDOC50Vrj",
          audience: "https://dev-4ltmz52olaylamco.us.auth0.com/api/v2/",
          grant_type: "client_credentials",
        }),
      }
    );
    if (authRes.status >= 400) {
      return { status: 400, success: false, message: "Unauthorized" };
    }
    const data = await authRes.json();
    const access_token = await data.access_token;
    return { status: 200, success: true, access_token: access_token };
  } catch (error) {
    return { status: 400, success: false, message: "Unauthorized" };
  }
};

//below function to fetch One Time access token to access Zoom.
export const fetchZoomAccessToken = async () => {
  const clientId = "";
  const clientSecret = "";
  const accountId = "";
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );
  try {
    const authRes = await fetch(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
      }
    );
    if (authRes.status >= 400) {
      return { status: 400, success: false, message: "Unauthorized" };
    }
    const data = await authRes.json();
    const access_token = await data.access_token;
    return { status: 200, success: true, access_token: access_token };
  } catch (error) {
    return { status: 400, success: false, message: "Unauthorized" };
  }
};

export const checkCommonRoles = (
  roles: string[] | [],
  nodeRole: Array<{ plan?: string }>
) => {
  return roles.some(
    (role: string) =>
      nodeRole &&
      nodeRole.some(
        (p: { plan?: string }) =>
          p.plan?.toLowerCase()?.trim() === role?.toLowerCase()?.trim()
      )
  );
};
export const setEventsCMSContent = (
  setMap: Dispatch<SetStateAction<Map<number, nodeType>>>,
  roles: string[] | [],
  props: GetAllEventDetailPageQuery
) => {
  const map2 = new Map();
  if (props.allEventdetailpages.edges) {
    props.allEventdetailpages.edges.forEach((item) => {
      if (item !== undefined) {
        const node = item.node;
        if (
          node.meetingId !== undefined &&
          node.image !== undefined &&
          node.roles2 !== undefined &&
          roles
        ) {
          if (checkCommonRoles(roles, node.roles2)) {
            map2.set(node.meetingId, {
              image: node.image,
              passcode: node.passcode,
              host: node.host,
              category: node.category,
              description: node.description,
              link: node.link,
              descriptions: node.descriptions,
            });
          }
        }
      }
    });
    const prismicContentStr = JSON.stringify(Array.from(map2));
    localStorage.setItem("prismicContent", prismicContentStr);
    setMap(map2);
  }
};

export const setEventsCMSContent2 = (
  setMap: Dispatch<SetStateAction<Map<number, nodeType>>>,
  props: GetAllEventDetailPageQuery
) => {
  const map2 = new Map();
  if (props.allEventdetailpages.edges) {
    props.allEventdetailpages.edges.forEach((item) => {
      if (item !== undefined) {
        const node = item.node;
        if (node.meetingId !== undefined && node.image !== undefined) {
          map2.set(node.meetingId, {
            image: node.image,
            passcode: node.passcode,
            host: node.host,
            category: node.category,
            description: node.description,
            link: node.link,
            descriptions: node.descriptions,
          });
        }
      }
    });
    const prismicContentStr = JSON.stringify(Array.from(map2));
    localStorage.setItem("prismicContent", prismicContentStr);
    setMap(map2);
  }
};

export const validatePassword = (
  name: string,
  value: string,
  form: {
    email?: string;
    otp?: string;
    password1: string;
    password2: string;
  },
  error: {
    emailErrorMessage?: string;
    otpErrorMessage?: string;
    errorMessage1?: string;
    errorMessage2?: string;
  },
  setError: Dispatch<
    SetStateAction<{
      emailErrorMessage?: string;
      otpErrorMessage?: string;
      errorMessage1?: string;
      errorMessage2?: string;
    }>
  >
) => {
  if (name === "password1") {
    if (
      value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/
      )
    ) {
      setError({ ...error, errorMessage1: "" });
    } else {
      setError({
        ...error,
        errorMessage1:
          "Password should have at least 8 characters, one number, one uppercase, one lowercase and one special character",
      });
    }
    if (form.password2 !== value && form.password2 !== "") {
      setError((prevError) => {
        return { ...prevError, errorMessage2: "Password not matched" };
      });
    } else {
      setError((prevError) => {
        return { ...prevError, errorMessage2: "" };
      });
    }
  }
  if (name === "password2") {
    if (form.password1 !== value) {
      setError({ ...error, errorMessage2: "Password not matched" });
    } else {
      setError({ ...error, errorMessage2: "" });
    }
  }
};

export const validateDate = (startDate: string, endDate: string) => {
  return new Promise((resolve, reject) => {
    if (startDate !== "" && endDate === "") {
      reject("End date field can not be empty.");
    } else if (startDate === "" && endDate !== "") {
      reject("Start date field can not be empty");
    } else {
      if (
        moment(moment(startDate).format("YYYY-MM-DD")).isAfter(
          moment(endDate).format("YYYY-MM-DD")
        )
      ) {
        reject("End date should be greater than start date");
      }
    }
    resolve("success");
  });
};

export const validateTime = (
  startTime: string,
  endTime: string,
  startDate: string,
  endDate: string
) => {
  return new Promise((resolved, reject) => {
    if (startTime !== "" && endTime === "") {
      reject("End time field can not be empty.");
      return;
    } else if (startTime === "" && endTime !== "") {
      reject("Start time field can not be empty");
      return;
    } else {
      if (
        moment(moment(startDate).format("YYYY-MM-DD")).isSame(
          moment(endDate).format("YYYY-MM-DD")
        )
      ) {
        if (startTime >= endTime) {
          reject("End time should be greater than start time");
          return;
        }
      }
    }
    if (
      startTime !== "" &&
      endTime !== "" &&
      startDate === "" &&
      endDate === ""
    ) {
      if (startTime >= endTime) {
        reject("End time should be greater than start time");
        return;
      }
    }
    resolved("Success");
  });
};

//Below function will be triggered everytime window size change and based on that it will show the required no of cards on screen
export const handleResize = (
  setDisplayedCards: Dispatch<SetStateAction<number>>,
  setPageSecondIndex: Dispatch<SetStateAction<number>>,
  setPageFirstIndex: Dispatch<SetStateAction<number>>,
  setPageNo: Dispatch<SetStateAction<number>>,
  cardsInTablet: number,
  cardsInDeskTop: number
) => {
  setPageFirstIndex(0);
  setPageNo(0);
  if (window.innerWidth <= 768) {
    setDisplayedCards(1);
    setPageSecondIndex(1);
  } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
    setDisplayedCards(cardsInTablet);
    setPageSecondIndex(cardsInTablet);
  } else {
    setDisplayedCards(cardsInDeskTop);
    setPageSecondIndex(cardsInDeskTop);
  }
};

export const setStartEndDate = (
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string
) => {
  let eventStartTime = "";
  let eventEndTime = "";
  if (startDate !== "" && endDate !== "") {
    if (startTime !== "" && endTime !== "") {
      eventStartTime = moment(startDate + " " + startTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      eventEndTime = moment(endDate + " " + endTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    } else {
      eventStartTime = moment(startDate + " " + "00:00").format(
        "YYYY-MM-DD HH:mm:ss"
      );
      eventEndTime = moment(endDate + " " + "23:59").format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }
  } else {
    if (startTime !== "" && endTime !== "") {
      eventStartTime = moment(
        moment(new Date()).format("MM DD YYYY") + " " + startTime
      ).format("YYYY-MM-DD HH:mm:ss");
      eventEndTime = moment(
        moment(new Date()).format("MM DD YYYY") + " " + endTime
      ).format("YYYY-MM-DD HH:mm:ss");
    } else {
      eventStartTime = "";
      eventEndTime = "";
    }
  }
  return [eventStartTime, eventEndTime];
};

//use
export const sendResponseToKeap = async (
  contactId: stringType,
  keapToken: string | undefined,
  callName: string
) => {
  try {
    if (keapToken !== undefined) {
      const response = await fetch(
        `https://api.infusionsoft.com/crm/rest/v1/campaigns/goals/uqq968/${callName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Keap-API-Key": keapToken,
          },
          body: JSON.stringify({
            contact_id: Number(contactId),
          }),
        }
      );
      if (response.status >= 400) {
        return "resolved";
      }
      return "resolved";
    }
  } catch (error) {
    console.log(error);
    return "resolved";
  }
};

//used for sending email to user
export const sendEmail = async (
  recipient: string,
  subject: string,
  text: string,
  origin?: string
) => {
  const response = await fetch(`${origin}/api/sendEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipient: recipient,
      subject: subject,
      text: text,
    }),
  });
  if (response.status >= 400) {
    throw new Error("Error sending email");
  } else {
    return response;
  }
};

//used for sending SMS to users
export const sendSMS = async (to: string, body: string, origin?: string) => {
  const response = await fetch(`${origin}/api/sendSMS`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, body }),
  });

  if (!response.ok) {
    throw new Error("Error sending SMS");
  }
};

//fetching user credential from Auth0
export const fetchUser = async () => {
  const loginWithEmail = localStorage.getItem("loginWithEmail");
  if (loginWithEmail === "true") {
    const response = await fetch(`/api/fetchUserInfo2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userName"),
      }),
    });
    if (response.status >= 400) {
      if (response.status === 401) {
        throw new Error("Unauthorize");
      } else if (response.status === 404) {
        throw new Error("Email is not registered");
      } else {
        throw new Error("Internal Server Error, please try again later.");
      }
    }
    const data = await response.json();
    return data.user[0];
  } else {
    const response = await fetch(`/api/fetchUserInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: localStorage.getItem("access_token"),
      }),
    });
    if (response.status >= 400) {
      throw new Error("Unauthorize");
    }
    const data = await response.json();
    return data.user;
  }
};
//fetching user others imp credential from Hasura.
export const fetchUserDetail = async (
  user: UserProfile,
  setUserDetails: Dispatch<SetStateAction<userType>>,
  setTrailExpirePopUp?: Dispatch<SetStateAction<boolean>>,
  router?: NextRouter
) => {
  await client
    .subscribe(
      user.email
        ? {
            query: getUserDetailUsingEmailQuery,
            variables: {
              email: user.email,
            },
          }
        : {
            query: getUserDetailUsingPhoneQuery,
            variables: {
              phone: user.phone_number,
            },
          }
    )
    .subscribe({
      next(response) {
        setUserDetails(response.data?.userDetails[0]);
        const roles = response.data?.userDetails[0]?.roles.trim();
        if (
          roles &&
          router !== undefined &&
          (!router.pathname.includes("/UI/Account") ||
            (router.pathname.includes("/UI/Account") &&
              router.query.account_Card !== "Purchase Membership")) &&
          (roles.includes("The Loop Member Expired") ||
            roles?.includes("The Loop Trial Expired"))
        ) {
          setTrailExpirePopUp && setTrailExpirePopUp(true);
        } else {
          setTrailExpirePopUp && setTrailExpirePopUp(false);
        }
      },
      error(error) {
        console.error("Subscription error:", error);
        localStorage.clear();
        router !== undefined && router.push("/UI/Authenticate/Login");
        return;
      },
      complete() {
        console.log("Subscription completed");
      },
    });
};
//checking the existence of passed email in the record (Hasura)
export const checkEmailExistence = async (email: string) => {
  const hasuraRes = await client.query({
    query: getUserDetailCountUsingEmailQuery,
    variables: {
      email: email,
    },
  });
  const hasuraData = await hasuraRes.data;
  const userDetailsAggregate = await hasuraData.userDetails_aggregate;
  const aggregate = await userDetailsAggregate.aggregate;
  const count = await aggregate.count;
  return count;
};

export const validateFirstName = (
  value: string,
  setError: Dispatch<SetStateAction<ErrorType>>,
  error: ErrorType
) => {
  if (value === "")
    setError({
      ...error,
      firstNameErrorMessage: "Please provide your First Name",
    });
  else if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(value))
    setError({
      ...error,
      firstNameErrorMessage:
        "First name cannot contain digit or special character.",
    });
  else setError({ ...error, firstNameErrorMessage: "" });
};

export const validateLastName = (
  value: string,
  setError: Dispatch<SetStateAction<ErrorType>>,
  error: ErrorType
) => {
  if (value === "")
    setError({
      ...error,
      lastNameErrorMessage: "Please provide your Last Name",
    });
  else if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(value))
    setError({
      ...error,
      lastNameErrorMessage:
        "Last name cannot contain digit or special character.",
    });
  else setError({ ...error, lastNameErrorMessage: "" });
};

export const validateEmail = (
  value: string,
  setError: Dispatch<SetStateAction<ErrorType>>,
  error: ErrorType,
  type?: string
) => {
  if (value === "") {
    if (type) setError({ ...error, emailErrorMessage: "" });
    else
      setError({
        ...error,
        emailErrorMessage: "Please provide your Email Address",
      });
  } else if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
    setError({
      ...error,
      emailErrorMessage: "Please provide valid Email Address",
    });
  else setError({ ...error, emailErrorMessage: "" });
};

export const validatePhone = (
  value: string,
  setError: Dispatch<SetStateAction<ErrorType>>,
  error: ErrorType
) => {
  if (value === "")
    setError({
      ...error,
      phoneErrorMessage: "Please provide your Phone Number",
    });
  else setError({ ...error, phoneErrorMessage: "" });
};

export const validateOTP = (
  value: string,
  setError: Dispatch<SetStateAction<ErrorType>>,
  error: ErrorType
) => {
  if (value === "")
    setError({ ...error, otpErrorMessage: "Please enter verification code." });
  else if (!value.match(/^\d{6}$/))
    setError({ ...error, otpErrorMessage: "Please enter 6 digit." });
  else setError({ ...error, otpErrorMessage: "" });
};

export const validatePassword2 = (
  value: string,
  setError: Dispatch<SetStateAction<ErrorType>>,
  error: ErrorType
) => {
  if (value === "")
    setError({ ...error, passwordErrorMessage: "Please enter your password" });
  else if (
    !value.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/
    )
  )
    setError({
      ...error,
      passwordErrorMessage:
        "Password should have at least 8 characters, one number, one uppercase, one lowercase and one special character",
    });
  else setError({ ...error, passwordErrorMessage: "" });
};

export const validateBusinessName = (
  value: string,
  setError: Dispatch<SetStateAction<ErrorType>>,
  error: ErrorType
) => {
  if (value === "")
    setError({
      ...error,
      nameOfBusinessErrorMessage: "Please provide your Business Name",
    });
  else if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(value))
    setError({
      ...error,
      nameOfBusinessErrorMessage:
        "Business name cannot contain digit or special character.",
    });
  else setError({ ...error, nameOfBusinessErrorMessage: "" });
};

export const validateChange = (
  name: string,
  value: string,
  setError: Dispatch<SetStateAction<ErrorType>>,
  error: ErrorType,
  type?: string
) => {
  if (name === "firstName" || name === "FirstName") {
    validateFirstName(value, setError, error);
  } else if (name === "lastName" || name === "LastName") {
    validateLastName(value, setError, error);
  } else if (name === "email" || name === "Email") {
    validateEmail(value, setError, error, type);
  } else if (name === "phone" || name === "Phone1") {
    validatePhone(value, setError, error);
  } else if (name === "otp") {
    validateOTP(value, setError, error);
  } else if (name === "password") {
    validatePassword2(value, setError, error);
  } else if (name === "nameOfBusiness") {
    validateBusinessName(value, setError, error);
  }
};

//To pull Country Name and its country Codes
export const fetchCountryCodes = async (
  setCountryCodeList: Dispatch<
    SetStateAction<
      Array<{ countryName: string; countryCode: string; code: string }> | []
    >
  >
) => {
  const hasuraRes = await client.query({
    query: gql`
      query getList {
        Countries(order_by: [{ countryName: asc }]) {
          countryName
          countryCode
          code
        }
      }
    `,
  });
  const hasuraData = await hasuraRes.data;
  const countryCodeList = await hasuraData.Countries;
  setCountryCodeList(countryCodeList);
};

//fetching all the partner roles and code from Hasura Cloud.
export const fetchRoleList = async (
  setRoleList: Dispatch<
    SetStateAction<Array<{ role: string; partnerCode: string }> | []>
  >
) => {
  const cacheKey = client.cache.identify({
    __typename: "Query",
  });
  client.cache.evict({ id: cacheKey });
  client.cache.gc();
  const hasuraRes = await client.query({
    query: gql`
      query getRoleList {
        Roles {
          role
          partnerCode
        }
      }
    `,
  });
  const hasuraData = await hasuraRes.data;
  const roleList = await hasuraData.Roles;
  setRoleList(roleList);
};

export const startTimer = (
  setTimer: Dispatch<SetStateAction<number>>,
  setTimerActive: Dispatch<SetStateAction<boolean>>,
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>
) => {
  setTimer(30);
  setTimerActive(true);

  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  intervalRef.current = setInterval(() => {
    setTimer((prevTimer) => prevTimer - 1);
  }, 1000);

  timeoutRef.current = setTimeout(() => {
    intervalRef.current && clearInterval(intervalRef.current);
    setTimerActive(false);
  }, 30000);
};

//used for capitalize the string
export const toCapitalizeLetter = (str?: string) => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};

export const getFormattedTime = (time: string | Date | undefined | string[]) =>
  moment(time).format("YYYY-MM-DDTHH:mm:ss");
