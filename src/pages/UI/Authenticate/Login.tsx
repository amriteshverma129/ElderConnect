import Head from "next/head";
import { Box } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import styles from "../../../components/Authenticate/style/login.module.scss";
import Image from "next/image";
import { fetchCountryCodes, validateChange } from "../../../Functions/functions";
import InputField from "../../../components/InputField/InputField";
import PhoneBox from "../../../components/PhoneBox/PhoneBox";
import { handleContinue, handleSubmit, sendVerificationLink, validateUser } from "../../../Functions/Login/functions";
import ErrorBox from "../../../components/ErrorBox/ErrorBox";
import PasswordField from "../../../components/PasswordField/PasswordField";
import ResetModal from "../../../components/Modal/ResetModal";
import { UserProfile } from "../../../components/Home/Type";
import Loader2 from "../../../components/Loader/Loader2";

const Login: NextPage = () => {
    const router = useRouter();
    const [form, setForm] = useState<{
        email: string;
        phone: string;
        countryCode: string;
        selected: string;
        otp: string;
        password: string;
    }>({
        email: "",
        phone: "",
        countryCode: "+1",
        selected: "US",
        otp: "",
        password: "",
    });
    const [error, setError] = useState<{
        emailErrorMessage?: string;
        phoneErrorMessage?: string;
        otpErrorMessage?: string;
        passwordErrorMessage?: string;
    }>({
        emailErrorMessage: "",
        phoneErrorMessage: "",
        otpErrorMessage: "",
        passwordErrorMessage: "",
    });
    const [loginWithEmail, setLoginWithEmail] = useState(true);
    const [otpPage, setOtpPage] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [countryCodeList, setCountryCodeList] = useState<
        Array<{ countryName: string; countryCode: string; code: string }> | []
    >([]);
    // const [timer, setTimer] = useState(30);
    // const [timerActive, setTimerActive] = useState<boolean>(false);
    // const timeoutRef = useRef(null);
    // const intervalRef = useRef(null);
    const [button1, setButton1] = useState({
        btnText: "Login",
        disabled: true,
    });
    const [button2, setButton2] = useState({
        btnText: "Verify",
        disabled: true,
    });
    const [user, setUser] = useState<UserProfile>({});
    const [loader, setLoader] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        if ((name === "phone" || name === "otp") && !value.match(/^\d*$/)) {
            return;
        } else if (name === "phone" && value.length > 15) {
            return;
        }
        setForm({ ...form, [name]: value });
        validateChange(name, value, setError, error);
    };
    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        const local_loginWithEmail = localStorage.getItem("loginWithEmail");
        const userName = localStorage.getItem("userName");
        const localLogoutTimeout = localStorage.getItem("logoutTimeout");
        if (access_token && local_loginWithEmail && userName && localLogoutTimeout) {
            router.push("/UI/Events/");
        }
    }, [router]);

    useEffect(() => {
        if (
            (form.email !== "" && form.password !== "" && error.emailErrorMessage === "") ||
            (form.phone !== "" && error.phoneErrorMessage === "")
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

    // useEffect(() => {
    //     if (otpPage) {
    //         startTimer(setTimer, setTimerActive, timeoutRef, intervalRef);
    //     }
    // }, [otpPage]);

    useEffect(() => {
        fetchCountryCodes(setCountryCodeList);
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
                <title>Login</title>
                <meta name="description" content="Generated by create next app" />
                <link
                    rel="icon"
                    href="https://images.prismic.io/loop-web-members/4df527d2-6dfb-4c78-9499-a0facef03af3_looptech.webp?auto=compress,format"
                />
            </Head>
            <div className={styles["login"]} ref={containerRef}>
                <div className={styles["login-form-container"]}>
                    <div className={styles["login-form"]}>
                        {otpPage && (
                            <button
                                className={styles["login-back-btn"]}
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
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Image
                                src="https://images.prismic.io/loop-web-members/4df527d2-6dfb-4c78-9499-a0facef03af3_looptech.webp?auto=compress,format"
                                alt="logo"
                                height="80px"
                                width="80px"
                                loading="lazy"
                            ></Image>
                        </div>
                        {router.query.postVerification === "true" ? (
                            <div className={styles["login-heading"]}>
                                Thank you for verifying your email.
                                <div className={styles["login-subHeading"]}> Login below to proceed.</div>
                            </div>
                        ) : (
                            <div className={styles["login-heading"]}>Login to continue to LOOP Village</div>
                        )}
                        {!otpPage ? (
                            <div>
                                {" "}
                                {loginWithEmail ? (
                                    <div>
                                        <InputField
                                            placeholder="Enter email"
                                            value={form.email}
                                            id="email"
                                            name="email"
                                            handleChange={handleChange}
                                            type="text"
                                            errorMessage={error.emailErrorMessage}
                                            label="Email"
                                            required={true}
                                        />
                                        <PasswordField
                                            placeholder="Enter password"
                                            value={form.password}
                                            id="password"
                                            name="password"
                                            handleChange={handleChange}
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
                                {errorMessage !== "Email is not verified" && (
                                    <ErrorBox
                                        successMessage={successMessage}
                                        errorMessage={errorMessage}
                                        alignment="center"
                                    />
                                )}
                                {errorMessage === "Email is not verified" && (
                                    <div
                                        className={styles["login-link"]}
                                        style={{
                                            marginBottom: "20px",
                                            marginTop: "10px",
                                            color: "#d92d3e",
                                            textAlign: "center",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Check your email to activate your account or
                                        <div>
                                            <label
                                                className={styles["login-notice"]}
                                                style={{
                                                    display: "inline-block",
                                                    textDecoration: "underline",
                                                    fontWeight: "500",
                                                    color: "#142c60",
                                                }}
                                                onClick={() =>
                                                    sendVerificationLink(
                                                        user,
                                                        setErrorMessage,
                                                        setSuccessMessage,
                                                        setButton1,
                                                    )
                                                }
                                            >
                                                Resend email
                                            </label>{" "}
                                        </div>
                                    </div>
                                )}
                                <div className={`${styles["login-field"]} ${styles["login-field-link"]}`}>
                                    {loginWithEmail ? (
                                        <label
                                            className={styles["login-notice"]}
                                            onClick={() => {
                                                setLoginWithEmail(false);
                                                setError({
                                                    emailErrorMessage: "",
                                                    phoneErrorMessage: "",
                                                    otpErrorMessage: "",
                                                    passwordErrorMessage: "",
                                                });
                                                setForm({
                                                    email: "",
                                                    phone: "",
                                                    countryCode: "+1",
                                                    selected: "US",
                                                    otp: "",
                                                    password: "",
                                                });
                                                setSuccessMessage("");
                                                setErrorMessage("");
                                            }}
                                        >
                                            Login with Phone Number
                                        </label>
                                    ) : (
                                        <label
                                            className={styles["login-notice"]}
                                            onClick={() => {
                                                setLoginWithEmail(true);
                                                setError({
                                                    emailErrorMessage: "",
                                                    phoneErrorMessage: "",
                                                    otpErrorMessage: "",
                                                    passwordErrorMessage: "",
                                                });
                                                setForm({
                                                    email: "",
                                                    phone: "",
                                                    countryCode: "+1",
                                                    selected: "US",
                                                    otp: "",
                                                    password: "",
                                                });
                                                setSuccessMessage("");
                                                setErrorMessage("");
                                            }}
                                        >
                                            Login with Email Address
                                        </label>
                                    )}
                                </div>
                                <div className={styles["login-submit"]}>
                                    {loginWithEmail ? (
                                        <button
                                            type="button"
                                            disabled={button1.disabled}
                                            ref={buttonRef}
                                            onClick={() =>
                                                validateUser(
                                                    form,
                                                    setErrorMessage,
                                                    loginWithEmail,
                                                    router,
                                                    setButton1,
                                                    setUser,
                                                    setLoader,
                                                )
                                            }
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
                                                    loginWithEmail,
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
                                    label="Enter Verification code"
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
                                    <div className={`${styles["login-field"]} ${styles["login-field-link"]}`}>
                                        <div className="verificationCode">
                                            <label className={styles["login-notice"]}>Resend Verification Code</label>
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
                                    className={`${styles["login-field"]} ${styles["login-field-link"]}`}
                                    onClick={() => {
                                        handleContinue(
                                            form,
                                            setErrorMessage,
                                            setSuccessMessage,
                                            loginWithEmail,
                                            setOtpPage,
                                            setButton1,
                                            setLoader,
                                        );
                                        // startTimer(setTimer, setTimerActive, timeoutRef, intervalRef);
                                    }}
                                >
                                    <label className={styles["login-notice"]}>Resend Verification Code</label>
                                </div>
                                {/* )} */}
                                <div className={styles["login-submit"]}>
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
                                                setForm,
                                                setErrorMessage,
                                                loginWithEmail,
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
                        {loginWithEmail && (
                            <ResetModal>
                                <div className={styles["login-link"]} style={{ marginBottom: "8px" }}>
                                    <label className={styles["login-notice"]}>
                                        <span>Forgot Password?</span>
                                    </label>
                                </div>
                            </ResetModal>
                        )}
                        <div className={styles["login-link"]}>
                            <label
                                className={styles["login-notice"]}
                                onClick={() => router.push("/UI/Authenticate/SignUp")}
                            >
                                Don&apos;t have an account? <span>Sign Up</span>
                            </label>
                        </div>
                        {/* <div className={styles["login-link"]}>
                            <label className={styles["login-notice"]} onClick={() => router.push("/UI/Partner/SignUp")}>
                                or <span>Sign Up as Partner</span>
                            </label>
                        </div> */}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default Login;
