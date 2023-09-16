import Head from "next/head";
import { Box } from "@mui/material";
import { NextPage } from "next";
import styles from "../../../components/Authenticate/style/signUp.module.scss";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { fetchCountryCodes, validateChange, fetchRoleList, toCapitalizeLetter } from "../../../Functions/functions";
import ErrorBox from "../../../components/ErrorBox/ErrorBox";
import InputField from "../../../components/InputField/InputField";
import PhoneBox from "../../../components/PhoneBox/PhoneBox";
import {
    createUser,
    handleContinue,
    handleSubmit,
    resetError,
    resetForm,
    setRole,
} from "../../../Functions/SignUp/functions";
import TermConditionModal from "../../../components/Modal/TermConditionModal";
import PasswordField from "../../../components/PasswordField/PasswordField";
import Loader2 from "../../../components/Loader/Loader2";
import Link from "next/link";
import FitnessWaiverModal from "../../../components/Modal/FitnessWaiverModal";
import PrivacyPolicyModal from "../../../components/Modal/PrivacyPolicyModal";
import { ErrorType, signUpFormType } from "../../../components/Authenticate/Type";

const SignUp: NextPage = () => {
    const router = useRouter();
    const [form, setForm] = useState<signUpFormType>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        selected: "US",
        TermCondition: "",
        countryCode: "+1",
        otp: "",
        password: "",
        partnerCode: "",
        role: "The Loop Trial Role",
        nameOfBusiness: "",
    });
    const [error, setError] = useState<ErrorType>({
        firstNameErrorMessage: "",
        lastNameErrorMessage: "",
        emailErrorMessage: "",
        phoneErrorMessage: "",
        otpErrorMessage: "",
        passwordErrorMessage: "",
        partnerErrorMessage: "",
    });
    const [signUpWithEmail, setSignUpWithEmail] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [countryCodeList, setCountryCodeList] = useState<
        Array<{ countryName: string; countryCode: string; code: string }> | []
    >([]);
    const [otpPage, setOtpPage] = useState(false);
    // const [timer, setTimer] = useState(30);
    // const [timerActive, setTimerActive] = useState<boolean>(false);
    // const timeoutRef = useRef(null);
    // const intervalRef = useRef(null);
    const [button1, setButton1] = useState({
        btnText: "Create Account",
        disabled: true,
    });
    const [button2, setButton2] = useState({
        btnText: "Verify Account",
        disabled: true,
    });
    const [loader, setLoader] = useState<boolean>(false);
    const timeoutRef2 = useRef<NodeJS.Timeout | null>(null);
    const [roleList, setRoleList] = useState<Array<{ role: string; partnerCode: string }> | []>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "partnerCode") {
            if (value === "") {
                setError({ ...error, partnerErrorMessage: "Partner Code can not be Empty" });
                setForm({ ...form, role: "The Loop Trial Role", partnerCode: "" });
                return;
            }
            setForm({ ...form, role: "The Loop Trial Role", partnerCode: value });
            if (!roleList.some((roleObj) => roleObj.partnerCode === value.trim().toLowerCase())) {
                setError({ ...error, partnerErrorMessage: "Partner code is incorrect." });
            } else {
                setError({ ...error, partnerErrorMessage: "" });
            }
            return;
        }
        if ((name === "phone" || name === "otp") && !value.match(/^\d*$/)) {
            return;
        } else if (name === "phone" && value.length > 15) {
            return;
        }
        if (name === "TermCondition") {
            setForm({ ...form, [name]: form.TermCondition === "" ? value : "" });
        } else {
            setForm({ ...form, [name]: value });
        }
        validateChange(name, value, setError, error);
    };

    useEffect(() => {
        if (
            form.firstName !== "" &&
            form.lastName !== "" &&
            form.TermCondition !== "" &&
            form.partnerCode !== "" &&
            error.partnerErrorMessage === "" &&
            error.firstNameErrorMessage === "" &&
            error.lastNameErrorMessage === "" &&
            ((form.email !== "" &&
                form.password !== "" &&
                error.emailErrorMessage === "" &&
                error.passwordErrorMessage === "") ||
                (form.phone !== "" && error.phoneErrorMessage === ""))
        ) {
            setButton1({ ...button1, disabled: false });
        } else {
            setButton1({ ...button1, disabled: true });
        }
    }, [form, error]);

    useEffect(() => {
        if (otpPage) {
            if (form.otp !== "" && error.otpErrorMessage === "") {
                setButton2({ ...button2, disabled: false });
            } else {
                setButton2({ ...button2, disabled: true });
            }
        }
    }, [form, otpPage, error]);

    useEffect(() => {
        setRole(timeoutRef2, form, setForm, roleList);
    }, [form.partnerCode, roleList]);

    // useEffect(() => {
    //     if (otpPage) {
    //         startTimer(setTimer, setTimerActive, timeoutRef, intervalRef);
    //     }
    // }, [otpPage]);

    useEffect(() => {
        fetchCountryCodes(setCountryCodeList);
        fetchRoleList(setRoleList);
    }, []);

    const handleSelect = (code: string) => {
        const country = countryCodeList.filter((item) => item.code === code);
        setForm({ ...form, selected: code, countryCode: country[0].countryCode });
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;
            if (event.key === "Enter" && target.tagName === "INPUT") {
                if (buttonRef.current) {
                    buttonRef.current.click();
                }
            }
        };
        const container = containerRef.current;
        if (container) {
            container.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            if (container) {
                container.removeEventListener("keydown", handleKeyDown);
            }
        };
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            {loader && <Loader2 />}
            <Head>
                <title>Sign Up</title>
                <meta name="description" content="Generated by create next app" />
                <link
                    rel="icon"
                    href="https://images.prismic.io/loop-web-members/4df527d2-6dfb-4c78-9499-a0facef03af3_looptech.webp?auto=compress,format"
                />
            </Head>
            <div className={styles["signUp"]} ref={containerRef}>
                <div className={styles["signUp-form-container"]}>
                    <div className={styles["signUp-form"]}>
                        {otpPage && (
                            <button
                                className={styles["signUp-back-btn"]}
                                onClick={() => {
                                    setOtpPage(false);
                                    setForm({ ...form, otp: "" });
                                    setError({ ...error, otpErrorMessage: "" });
                                    setSuccessMessage("");
                                    setErrorMessage("");
                                }}
                            >
                                &lt; back
                            </button>
                        )}
                        {router &&
                        router.query &&
                        (router.query.brand === "Spectrum" ||
                            router.query.brand === "OneGen" ||
                            router?.query?.brand === "USC") ? (
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                                <Image
                                    src="https://images.prismic.io/loop-web-members/4df527d2-6dfb-4c78-9499-a0facef03af3_looptech.webp?auto=compress,format"
                                    alt="logo"
                                    height="80px"
                                    width="80px"
                                    loading="lazy"
                                ></Image>
                                <span
                                    style={{
                                        height: "60px",
                                        width: "3px",
                                        backgroundColor: "#d3d3d3",
                                        display: "inline-block",
                                        margin: "auto 25px",
                                    }}
                                ></span>
                                {router && router.query && router.query.brand === "Spectrum" && (
                                    <Image
                                        src="https://images.prismic.io/loop-web-members/485c0c9f-a026-45ae-ae14-222691b71354_MicrosoftTeams-image.png?auto=compress,format"
                                        alt="Spectrum Image"
                                        height={80}
                                        width={200}
                                        loading="lazy"
                                    />
                                )}
                                {router && router.query && router.query.brand === "OneGen" && (
                                    <Image
                                        src="https://images.prismic.io/loop-web-members/c401ed9c-3122-4fd5-bf85-1c977f7f19af_Screenshot+2023-07-05+160748.png?auto=compress,format"
                                        alt="One Generation Image"
                                        height={80}
                                        width={200}
                                        loading="lazy"
                                    />
                                )}
                                {router && router.query && router.query.brand === "USC" && (
                                    <Image
                                        src="https://images.prismic.io/loop-web-members/e51b3166-f084-4e82-b375-27375c926b23_download-1.webp?auto=compress,format"
                                        alt="USC Image"
                                        height={80}
                                        width={250}
                                        objectFit="contain"
                                        loading="lazy"
                                    />
                                )}
                            </div>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                                <Image
                                    src="https://images.prismic.io/loop-web-members/4df527d2-6dfb-4c78-9499-a0facef03af3_looptech.webp?auto=compress,format"
                                    alt="logo"
                                    height="90px"
                                    width="90px"
                                ></Image>
                            </div>
                        )}
                        <div className={styles["signUp-heading"]}>LOOP Community Partner Sign-Up</div>
                        <div className={`${styles["signUp-link"]}`}>
                            <Link href="/UI/Authenticate/Login" passHref>
                                <a target="_blank">
                                    <label className={styles["signUp-notice"]}>
                                        Already a member? <span>Sign In</span>
                                    </label>
                                </a>
                            </Link>
                        </div>
                        {!otpPage ? (
                            <div>
                                <InputField
                                    id="partnerCode"
                                    name="partnerCode"
                                    type="text"
                                    value={form.partnerCode}
                                    placeholder="Enter partner code"
                                    handleChange={handleChange}
                                    label="Partner Code"
                                    errorMessage={error.partnerErrorMessage}
                                    required={true}
                                />
                                <InputField
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={toCapitalizeLetter(form.firstName)}
                                    placeholder="Enter first name"
                                    handleChange={handleChange}
                                    label="First Name"
                                    errorMessage={error.firstNameErrorMessage}
                                    required={true}
                                />
                                <InputField
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={toCapitalizeLetter(form.lastName)}
                                    placeholder="Enter last name"
                                    handleChange={handleChange}
                                    label="Last Name"
                                    errorMessage={error.lastNameErrorMessage}
                                    required={true}
                                />
                                {signUpWithEmail ? (
                                    <div>
                                        <InputField
                                            id="email"
                                            name="email"
                                            placeholder="Enter email address"
                                            type="text"
                                            value={form.email}
                                            handleChange={handleChange}
                                            label="Email Address"
                                            errorMessage={error.emailErrorMessage}
                                            required={true}
                                        />
                                        <PasswordField
                                            placeholder="Create password"
                                            value={form.password}
                                            id="password"
                                            name="password"
                                            handleChange={handleChange}
                                            errorMessage={error.passwordErrorMessage}
                                            label="Password"
                                            required={true}
                                        />
                                    </div>
                                ) : (
                                    <PhoneBox
                                        selected={form.selected}
                                        countryCode={form.countryCode}
                                        value={form.phone}
                                        errorMessage={error.phoneErrorMessage}
                                        countryCodeList={countryCodeList}
                                        handleChange={handleChange}
                                        handleSelect={handleSelect}
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter phone number"
                                        note="If you want to receive text on your phone, please provide us with your phone number"
                                    />
                                )}
                                <ErrorBox
                                    successMessage={successMessage}
                                    errorMessage={errorMessage}
                                    alignment="center"
                                />
                                {/* Code to switch back and forth between phone and email signup */}
                                <div className={styles["signUp-field"]}>
                                    {signUpWithEmail ? (
                                        <label
                                            className={styles["signUp-notice"]}
                                            onClick={() => {
                                                setSignUpWithEmail(false);
                                                resetError(error, setError);
                                                resetForm(form, setForm);
                                                setSuccessMessage("");
                                                setErrorMessage("");
                                            }}
                                        >
                                            Sign Up with Phone Number
                                        </label>
                                    ) : (
                                        <label
                                            className={styles["signUp-notice"]}
                                            onClick={() => {
                                                setSignUpWithEmail(true);
                                                resetError(error, setError);
                                                resetForm(form, setForm);
                                                setSuccessMessage("");
                                                setErrorMessage("");
                                            }}
                                        >
                                            Sign Up with Email Address
                                        </label>
                                    )}
                                </div>
                                <div className={styles["signUp-checkBox"]}>
                                    <input
                                        id="TermCondition"
                                        name="TermCondition"
                                        type="checkbox"
                                        onChange={(e) => handleChange(e)}
                                        value={"TermCondition"}
                                        checked={form.TermCondition === "" ? false : true}
                                    />
                                    <label style={{ marginLeft: "20px" }}>
                                        By signing up I agree to
                                        <span className={styles["signUp-termsCondition"]}>
                                            <TermConditionModal>Terms and Conditions</TermConditionModal>
                                        </span>
                                        ,
                                        <span className={styles["signUp-fitnessWaiver"]}>
                                            <PrivacyPolicyModal>Privacy Policy</PrivacyPolicyModal>
                                        </span>{" "}
                                        and
                                        <span className={styles["signUp-fitnessWaiver"]}>
                                            <FitnessWaiverModal>Fitness Waiver</FitnessWaiverModal>
                                        </span>
                                    </label>
                                </div>
                                <div className={styles["signUp-submit"]}>
                                    {signUpWithEmail ? (
                                        <button
                                            type="button"
                                            disabled={button1.disabled}
                                            ref={buttonRef}
                                            onClick={() => {
                                                createUser(
                                                    form,
                                                    setErrorMessage,
                                                    setButton1,
                                                    setForm,
                                                    signUpWithEmail,
                                                    router,
                                                    setLoader,
                                                );
                                            }}
                                        >
                                            {button1.btnText}
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={button1.disabled}
                                            ref={buttonRef}
                                            onClick={() =>
                                                handleContinue(
                                                    form,
                                                    setErrorMessage,
                                                    setSuccessMessage,
                                                    signUpWithEmail,
                                                    setOtpPage,
                                                    setButton1,
                                                    setLoader,
                                                )
                                            }
                                        >
                                            {button1.btnText}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <InputField
                                    value={form.otp}
                                    id="otp"
                                    name="otp"
                                    placeholder="Enter verification code"
                                    handleChange={handleChange}
                                    type="text"
                                    label="Enter Verification Code"
                                    required={true}
                                    errorMessage={error.otpErrorMessage}
                                    inputMode={true}
                                />
                                <ErrorBox
                                    successMessage={successMessage}
                                    errorMessage={errorMessage}
                                    alignment="center"
                                />
                                {/* {timerActive ? (
                                    <div className={`${styles["signUp-field"]} ${styles["signUp-field-link"]}`}>
                                        <div className="verificationCode">
                                            <label className={styles["signUp-notice"]}>Resend Verification Code</label>
                                            <div id="verificationCode-countdown">
                                                <div id="verificationCode-countdown-number">{timer}</div>
                                                <svg>
                                                    <circle r="18" cx="20" cy="20"></circle>
                                                    <circle r="18" cx="20" cy="20"></circle>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ) : ( */}
                                <div
                                    className={`${styles["signUp-field"]} ${styles["signUp-field-link"]}`}
                                    onClick={() => {
                                        handleContinue(
                                            form,
                                            setErrorMessage,
                                            setSuccessMessage,
                                            signUpWithEmail,
                                            setOtpPage,
                                            setButton1,
                                            setLoader,
                                        );
                                        //startTimer(setTimer, setTimerActive, timeoutRef, intervalRef);
                                    }}
                                >
                                    <label className={styles["signUp-notice"]}>Resend Verification Code</label>
                                </div>
                                {/* )} */}

                                <div className={styles["signUp-submit"]}>
                                    <button
                                        type="submit"
                                        disabled={button2.disabled}
                                        ref={buttonRef}
                                        onClick={() => {
                                            if (error.otpErrorMessage !== "") return;
                                            else if (form.otp === "") {
                                                setError({
                                                    ...error,
                                                    otpErrorMessage: "Please enter verification code",
                                                });
                                                return;
                                            }
                                            setSuccessMessage("");
                                            handleSubmit(
                                                form,
                                                setErrorMessage,
                                                signUpWithEmail,
                                                setForm,
                                                router,
                                                setButton2,
                                                setLoader,
                                            );
                                        }}
                                    >
                                        {button2.btnText}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default SignUp;
