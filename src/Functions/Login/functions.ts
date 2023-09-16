import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { UserProfile } from "../../components/Home/Type";
import { checkEmailOrPhoneDuplicacy } from "../SignUp/functions";
import moment from "moment";

export const handleContinue = async (
    form: {
        email: string;
        phone: string;
        countryCode: string;
        selected: string;
        otp: string;
    },
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    loginWithEmail: boolean,
    setOtpPage: Dispatch<SetStateAction<boolean>>,
    setButton: Dispatch<SetStateAction<{ btnText: string; disabled: boolean }>>,
    setLoader: Dispatch<SetStateAction<boolean>>,
) => {
    setButton({ btnText: "Authenticating...", disabled: true });
    setErrorMessage("");
    setLoader(true);
    checkEmailOrPhoneDuplicacy(form, loginWithEmail)
        .then(async (res1) => {
            if (res1 === "Exist") {
                setSuccessMessage("Sending message...");
                const response = await fetch(`/api/generateOTP`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName: loginWithEmail
                            ? form.email.toLowerCase()
                            : form.countryCode + form.phone.replaceAll("-", "").replaceAll(" ", ""),
                        connection: loginWithEmail ? "email" : "sms",
                    }),
                });
                setButton({ btnText: "Login", disabled: false });
                setLoader(false);
                setSuccessMessage("");
                if (response.status >= 400) {
                    if (response.status === 404) {
                        loginWithEmail
                            ? setErrorMessage("Email Address is not registered")
                            : setErrorMessage("Phone Number is not registered");
                    } else if (response.status === 429) {
                        setErrorMessage("You have exceeded your login attempt, please try again later.");
                    } else if (response.status === 401) {
                        setErrorMessage("Unauthorised");
                    } else if (response.status === 500) {
                        setErrorMessage("Internal Server Error, please try again later");
                    }
                    return;
                }
                setOtpPage(true);
                setSuccessMessage("Verification code has been send to your phone");
            } else {
                loginWithEmail
                    ? setErrorMessage("Email Address is not registered")
                    : setErrorMessage("Phone number is not registered");
                setButton({ btnText: "Login", disabled: false });
                setLoader(false);
            }
        })
        .catch((error) => {
            setErrorMessage(error.message);
            setButton({ btnText: "Login", disabled: false });
            setLoader(false);
        });
};
export const handleSubmit = async (
    form: {
        email: string;
        phone: string;
        countryCode: string;
        selected: string;
        otp: string;
        password: string;
    },
    setForm: Dispatch<
        SetStateAction<{
            email: string;
            phone: string;
            countryCode: string;
            selected: string;
            otp: string;
            password: string;
        }>
    >,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    loginWithEmail: boolean,
    router: NextRouter,
    setButton: Dispatch<SetStateAction<{ btnText: string; disabled: boolean }>>,
    setLoader: Dispatch<SetStateAction<boolean>>,
) => {
    setButton({ btnText: "Verifying...", disabled: true });
    setErrorMessage("");
    setLoader(true);
    const response = await fetch(`/api/validateOTP`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userName: loginWithEmail
                ? form.email.toLowerCase()
                : form.countryCode + form.phone.replaceAll("-", "").replaceAll(" ", ""),
            connection: loginWithEmail ? "email" : "sms",
            otp: form.otp,
        }),
    });
    const data = await response.json();
    setButton({ btnText: "Verify", disabled: false });
    setLoader(false);
    if (response.status >= 400) {
        if (response.status === 403) {
            setErrorMessage(data.message);
        } else if (response.status === 500) {
            setErrorMessage("Internal Server Error, please try again later");
        }
        setForm({ ...form, otp: "" });
        return;
    }
    // Setting seesion token in Local Storage
    localStorage.clear();
    localStorage.setItem("access_token", data.data.access_token);
    localStorage.setItem("loginWithEmail", `${loginWithEmail}`);
    localStorage.setItem(
        "userName",
        loginWithEmail
            ? form.email.toLowerCase()
            : String(form.countryCode + form.phone.replaceAll("-", "").replaceAll(" ", "")),
    );
    const logoutTimeout = moment().add(720, "hour").format("YYYY-MM-DDTHH:mm:ss");
    localStorage.setItem("logoutTimeout", logoutTimeout);
    setForm({ ...form, otp: "" });
    router.push("/UI/Events");
};

export const validateUser = async (
    form: {
        email: string;
        phone: string;
        countryCode: string;
        selected: string;
        otp: string;
        password: string;
    },
    setErrorMessage: Dispatch<SetStateAction<string>>,
    loginWithEmail: boolean,
    router: NextRouter,
    setButton: Dispatch<SetStateAction<{ btnText: string; disabled: boolean }>>,
    setUser: Dispatch<SetStateAction<UserProfile>>,
    setLoader: Dispatch<SetStateAction<boolean>>,
) => {
    setErrorMessage("");
    setButton({ btnText: "Authenticating...", disabled: true });
    setLoader(true);
    checkEmailOrPhoneDuplicacy(form, loginWithEmail)
        .then(async (res1) => {
            if (res1 === "Exist") {
                const response1 = await fetch(`/api/fetchUserInfo2`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: form.email.toLowerCase(),
                    }),
                });
                if (response1.status >= 400) {
                    if (response1.status === 401) {
                        setErrorMessage("Unauthorized");
                    } else if (response1.status === 404) {
                        setErrorMessage("Email is not registered");
                    } else {
                        setErrorMessage("Internal Server Error, please try again later.");
                    }
                    setButton({ btnText: "Login", disabled: false });
                    setLoader(false);
                    return;
                }
                const data1 = await response1.json();
                const user = await data1.user[0];
                if (!user.email_verified) {
                    setButton({ btnText: "Login", disabled: false });
                    setUser(user);
                    setErrorMessage("Email is not verified");
                    setLoader(false);
                    return;
                }
                const response = await fetch(`/api/validateUser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName: form.email.toLowerCase(),
                        password: form.password,
                    }),
                });
                const data = await response.json();
                if (response.status >= 400) {
                    if (response.status === 403) {
                        setErrorMessage(data.message);
                    } else if (response.status === 401) {
                        setErrorMessage("Unauthorised");
                    } else {
                        setErrorMessage("Internal Server Error, please try again later");
                    }
                    setButton({ btnText: "Login", disabled: false });
                    setLoader(false);
                    return;
                }
                setLoader(false);
                // Setting seesion token in Local Storage
                localStorage.clear();
                localStorage.setItem("access_token", data.data.access_token);
                localStorage.setItem("loginWithEmail", `${loginWithEmail}`);
                localStorage.setItem("userName", form.email.toLowerCase());
                const logoutTimeout = moment().add(720, "hour").format("YYYY-MM-DDTHH:mm:ss");
                localStorage.setItem("logoutTimeout", logoutTimeout);

                router.push("/UI/Events");
            } else {
                setErrorMessage("Email Address is not registered");
                setButton({ btnText: "Login", disabled: false });
                setLoader(false);
            }
        })
        .catch((error) => {
            setErrorMessage(error.message);
            setButton({ btnText: "Login", disabled: false });
            setLoader(false);
        });
};

export const sendVerificationLink = async (
    user: UserProfile,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setButton: Dispatch<SetStateAction<{ btnText: string; disabled: boolean }>>,
) => {
    setErrorMessage("");
    setSuccessMessage("Sending mail...");
    setButton({ btnText: "Sending Mail...", disabled: true });
    const response = await fetch(`/api/resendVerificationLink`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: user.user_id,
        }),
    });
    setButton({ btnText: "Login", disabled: false });
    if (response.status >= 400) {
        if (response.status === 401) {
            setSuccessMessage("");
            setErrorMessage("Unauthorized");
        } else if (response.status === 400) {
            setErrorMessage("Email is not registered");
        } else {
            setErrorMessage("Internal Server Error, please try again later.");
        }
        return;
    }
    setSuccessMessage("New verification email has been sent.");
};
