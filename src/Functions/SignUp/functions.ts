import { sendEmail, sendSMS } from "../functions";
import emailTemplate from "../Email/emailTemplate";
import smsTemplate from "../SMS/smsTemplate";
import client from "../../apolloClient";
import { getUserDetailUsingEmailQuery2, getUserDetailUsingPhoneQuery2 } from "../../components/Account/Queries";
import { Dispatch, SetStateAction } from "react";
import { NextRouter } from "next/router";
import CustomError from "../../components/CustomError/CustomError";
import moment from "moment";
import { ErrorType, signUpFormType } from "../../components/Authenticate/Type";

//API to create a new Contact in Keap
export const createUserOnKeap = async (form: signUpFormType, signUpWithEmail: boolean) => {
    const response = await fetch(`/api/createUserOnKeap2`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            userName: signUpWithEmail
                ? form.email.toLowerCase()
                : form.countryCode + form.phone.replaceAll("-", "").replaceAll(" ", ""),
            connection: signUpWithEmail ? "email" : "sms",
            partnerCode: form.partnerCode.trim(),
            nameOfBusiness: form.nameOfBusiness.trim(),
        }),
    });
    if (response.status >= 400) {
        if (response.status === 401) {
            throw new CustomError("Unauthorized", 401);
        } else {
            throw new CustomError("Internal Server Error, please try again later", 500);
        }
    }
    return response.json();
};

//API to create a new User In Auth0
export const createUserOnAuth0 = async (form: signUpFormType, signUpWithEmail: boolean) => {
    if (signUpWithEmail) {
        const response = await fetch(`/api/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: form.firstName + " " + form.lastName,
                userName: form.email.toLowerCase(),
                password: form.password,
            }),
        });
        if (response.status >= 400) {
            if (response.status === 401) {
                throw new CustomError("Unauthorized", 401);
            } else if (response.status === 409) {
                return "resolved";
            } else {
                throw new CustomError("Internal Server Error, please try again later", 500);
            }
        }
        return response.json();
    } else {
        const response = await fetch(`/api/createNewUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: form.firstName + " " + form.lastName,
                userName: signUpWithEmail
                    ? form.email.toLowerCase()
                    : form.countryCode + form.phone.replaceAll("-", "").replaceAll(" ", ""),
                connection: signUpWithEmail ? "email" : "sms",
            }),
        });
        if (response.status >= 400) {
            if (response.status === 401) {
                throw new CustomError("Unauthorized", 401);
            } else {
                throw new CustomError("Internal Server Error, please try again later", 500);
            }
        }
        return response.json();
    }
};

//API to create a new User in Hasura Cloud
export const createUserOnHasura = async (
    contactId: number | string,
    form: signUpFormType,
    signUpWithEmail: boolean,
) => {
    const response = await fetch(`/api/createUserOnHasura`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            userName: signUpWithEmail
                ? form.email.toLowerCase()
                : form.countryCode + form.phone.replaceAll("-", "").replaceAll(" ", ""),
            connection: signUpWithEmail ? "email" : "sms",
            contactId: contactId,
            roles: form.role,
            nameOfBusiness: form.nameOfBusiness.trim(),
        }),
    });
    if (response.status >= 400) {
        if (response.status === 401) {
            throw new CustomError("Unauthorized", 401);
        } else {
            throw new CustomError("Internal Server Error, please try again later", 500);
        }
    }
    return response.json();
};

//Sending Welcome message to User on Successfull Sign Up
export const sendWelcomeEmail = (form: signUpFormType, signUpWithEmail: boolean) => {
    if (signUpWithEmail) {
        sendEmail(
            form.email.toLowerCase(),
            "Welcome to LOOP Village",
            emailTemplate("welcomeMail", form.firstName),
            window.location.origin,
        );
    } else {
        sendSMS(
            form.countryCode + form.phone.replaceAll("-", "").replaceAll(" ", ""),
            smsTemplate("welcomeSMS", form.firstName),
            window.location.origin,
        );
    }
};

export const checkEmailOrPhoneDuplicacy = async (
    form: { email: string; phone: string; countryCode: string },
    signUpWithEmail: boolean,
) => {
    const cacheKey = client.cache.identify(
        signUpWithEmail
            ? {
                  __typename: "Query",
                  email: form.email.toLowerCase(),
              }
            : {
                  __typename: "Query",
                  phone: form.countryCode + form.phone.replaceAll("-", "").replaceAll(" ", ""),
              },
    );
    client.cache.evict({ id: cacheKey });
    client.cache.gc();
    try {
        const hasuraRes = await client.query(
            signUpWithEmail
                ? {
                      query: getUserDetailUsingEmailQuery2,
                      variables: {
                          email: form.email.toLowerCase(),
                      },
                  }
                : {
                      query: getUserDetailUsingPhoneQuery2,
                      variables: {
                          phone: form.countryCode + form.phone.replaceAll("-", "").replaceAll(" ", ""),
                      },
                  },
        );
        const hasuraData = await hasuraRes.data;
        const userDetails = await hasuraData.userDetails;
        if (userDetails.length) {
            return "Exist";
        }
        return "Not Exist";
    } catch (error) {
        throw new CustomError("Internal Server Error, please try again later", 500);
    }
};

export const handleContinue = (
    form: signUpFormType,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    signUpWithEmail: boolean,
    setOtpPage: Dispatch<SetStateAction<boolean>>,
    setButton: Dispatch<SetStateAction<{ btnText: string; disabled: boolean }>>,
    setLoader: Dispatch<SetStateAction<boolean>>,
) => {
    if (form.TermCondition === "") {
        setErrorMessage("Please accept Term & conditions");
        return;
    }
    setLoader(true);
    setErrorMessage("");
    setButton({ btnText: "Creating Account...", disabled: true });
    checkEmailOrPhoneDuplicacy(form, signUpWithEmail)
        .then((res1) => {
            if (res1 === "Exist") {
                signUpWithEmail
                    ? setErrorMessage("Email Address already exist")
                    : setErrorMessage("Phone number already exist");
                setButton({ btnText: "Create Account", disabled: false });
                setLoader(false);
            } else {
                setSuccessMessage("Sending message...");
                createUserOnAuth0(form, signUpWithEmail)
                    .then(() => {
                        setOtpPage(true);
                        setSuccessMessage("Verification code has been sent to your phone");
                        setButton({ btnText: "Create Account", disabled: false });
                        setLoader(false);
                    })
                    .catch((error) => {
                        setSuccessMessage("");
                        if (error.statusCode === 401) {
                            setErrorMessage(error.message);
                        } else if (error.statusCode === 500) {
                            signUpWithEmail
                                ? setErrorMessage("Internal Server Erorr or check your entered Email Address")
                                : setErrorMessage("Internal Server Error or check your entered Phone Number");
                        }
                        setButton({ btnText: "Create Account", disabled: false });
                        setLoader(false);
                    });
            }
        })
        .catch((error) => {
            setErrorMessage(error.message);
            setButton({ btnText: "Create Account", disabled: false });
            setLoader(false);
        });
};

export const createUserOnKeapAndHasura = (
    form: signUpFormType,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setButton: Dispatch<SetStateAction<{ btnText: string; disabled: boolean }>>,
    signUpWithEmail: boolean,
    setForm: Dispatch<SetStateAction<signUpFormType>>,
    router: NextRouter,
    access_token: string,
    setLoader: Dispatch<SetStateAction<boolean>>,
) => {
    console.log(access_token);
    localStorage.clear();
    if (
        !signUpWithEmail &&
        !(router?.query?.brand === "Spectrum" || router?.query?.brand === "OneGen" || router?.query?.brand === "USC")
    ) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("loginWithEmail", `${signUpWithEmail}`);
        localStorage.setItem(
            "userName",
            signUpWithEmail
                ? form.email.toLowerCase()
                : String(form.countryCode + form.phone.replaceAll("-", "").replaceAll(" ", "")),
        );
        const logoutTimeout = moment().add(720, "hour").format("YYYY-MM-DDTHH:mm:ss");
        localStorage.setItem("logoutTimeout", logoutTimeout);
    }
    createUserOnKeap(form, signUpWithEmail)
        .then((response) => {
            !signUpWithEmail &&
                !(
                    router?.query?.brand === "Spectrum" ||
                    router?.query?.brand === "OneGen" ||
                    router?.query?.brand === "USC"
                ) &&
                localStorage.setItem(
                    "userDetail",
                    JSON.stringify({
                        firstName: form.firstName,
                        lastName: form.lastName,
                        email: signUpWithEmail ? form.email.toLowerCase() : null,
                        phone: signUpWithEmail
                            ? null
                            : form.countryCode + form.phone.replaceAll("-", "").replaceAll(" ", ""),
                        roles: form.role,
                        buddy: null,
                        buddyIntakeForm: null,
                        aboutMe: null,
                        contactId: response.data.id,
                    }),
                );
            createUserOnHasura(response.data.id, form, signUpWithEmail)
                .then(() => {
                    setLoader(false);
                    // sendWelcomeEmail(form, signUpWithEmail);
                    if (signUpWithEmail) {
                        router.push("/UI/Authenticate/Thankyou?signUpWithEmail=true");
                    } else if (
                        !signUpWithEmail &&
                        (router?.query?.brand === "Spectrum" ||
                            router?.query?.brand === "OneGen" ||
                            router?.query?.brand === "USC")
                    ) {
                        router.push("/UI/Authenticate/Thankyou?signUpWithEmail=false");
                    } else {
                        router.push("/UI/Events");
                    }
                    resetForm(form, setForm);
                    signUpWithEmail
                        ? setButton({ btnText: "Create Account", disabled: false })
                        : setButton({ btnText: "Verify Account", disabled: false });
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                    resetForm(form, setForm);
                    signUpWithEmail
                        ? setButton({ btnText: "Create Account", disabled: false })
                        : setButton({ btnText: "Verify Account", disabled: false });
                    setLoader(false);
                });
        })
        .catch((error) => {
            setErrorMessage(error.message);
            signUpWithEmail
                ? setButton({ btnText: "Create Account", disabled: false })
                : setButton({ btnText: "Verify Account", disabled: false });
            setLoader(false);
        });
};

export const handleSubmit = async (
    form: signUpFormType,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    signUpWithEmail: boolean,
    setForm: Dispatch<SetStateAction<signUpFormType>>,
    router: NextRouter,
    setButton: Dispatch<SetStateAction<{ btnText: string; disabled: boolean }>>,
    setLoader: Dispatch<SetStateAction<boolean>>,
) => {
    setErrorMessage("");
    setButton({ btnText: "Verifying Account...", disabled: true });
    setLoader(true);
    const response = await fetch(`/api/validateOTP`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userName: signUpWithEmail
                ? form.email.toLowerCase()
                : form.countryCode + form.phone.replaceAll("-", "").replaceAll(" ", ""),
            connection: signUpWithEmail ? "email" : "sms",
            otp: form.otp,
        }),
    });
    const data = await response.json();
    if (response.status >= 400) {
        setButton({ btnText: "Verify Account", disabled: false });
        if (response.status === 403) {
            setErrorMessage(data.message);
        } else if (response.status === 500) {
            setErrorMessage("Internal Server Error, please try again later");
        }
        setForm({ ...form, otp: "" });
        setLoader(false);
        return;
    }
    createUserOnKeapAndHasura(
        form,
        setErrorMessage,
        setButton,
        signUpWithEmail,
        setForm,
        router,
        data.data.access_token,
        setLoader,
    );
};

export const createUser = (
    form: signUpFormType,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setButton: Dispatch<SetStateAction<{ btnText: string; disabled: boolean }>>,
    setForm: Dispatch<SetStateAction<signUpFormType>>,
    signUpWithEmail: boolean,
    router: NextRouter,
    setLoader: Dispatch<SetStateAction<boolean>>,
) => {
    setButton({ btnText: "Creating Account...", disabled: true });
    setErrorMessage("");
    setLoader(true);
    checkEmailOrPhoneDuplicacy(form, signUpWithEmail)
        .then((res1) => {
            if (res1 === "Exist") {
                setErrorMessage("Email Address already exist");
                setButton({ btnText: "Create Account", disabled: false });
                setLoader(false);
            } else {
                createUserOnAuth0(form, signUpWithEmail)
                    .then(() => {
                        createUserOnKeapAndHasura(
                            form,
                            setErrorMessage,
                            setButton,
                            signUpWithEmail,
                            setForm,
                            router,
                            "access_Token",
                            setLoader,
                        );
                    })
                    .catch((error) => {
                        if (error.statusCode === 401) {
                            setErrorMessage(error.message);
                        } else if (error.statusCode === 500) {
                            setErrorMessage("Internal Server Error ");
                        }
                        setButton({ btnText: "Create Account", disabled: false });
                        setLoader(false);
                    });
            }
        })
        .catch((error) => {
            setErrorMessage(error.message);
            setButton({ btnText: "Create Account", disabled: false });
            setLoader(false);
        });
};

export const setRole = (
    timeoutRef2: React.MutableRefObject<NodeJS.Timeout | null>,
    form: signUpFormType,
    setForm: Dispatch<SetStateAction<signUpFormType>>,
    roleList: Array<{ role: string; partnerCode: string }> | [],
) => {
    if (timeoutRef2.current) clearTimeout(timeoutRef2.current);
    timeoutRef2.current = setTimeout(() => {
        let selectedRole = "";
        roleList.forEach((roleObj) => {
            if (roleObj.partnerCode === form.partnerCode.trim().toLowerCase()) {
                selectedRole = roleObj.role;
            }
        });
        if (selectedRole === "") setForm({ ...form, role: "The Loop Trial Role" });
        else setForm({ ...form, role: selectedRole });
    }, 500);
};

export const resetForm = (form: signUpFormType, setForm: Dispatch<SetStateAction<signUpFormType>>) => {
    setForm({
        ...form,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        TermCondition: "",
        selected: "US",
        countryCode: "+1",
        otp: "",
        password: "",
        partnerCode: "",
        role: "The Loop Trial Role",
        nameOfBusiness: "",
    });
};

export const resetError = (error: ErrorType, setError: Dispatch<SetStateAction<ErrorType>>) => {
    setError({
        ...error,
        firstNameErrorMessage: "",
        lastNameErrorMessage: "",
        emailErrorMessage: "",
        phoneErrorMessage: "",
        otpErrorMessage: "",
        passwordErrorMessage: "",
        partnerErrorMessage: "",
        nameOfBusinessErrorMessage: "",
    });
};
