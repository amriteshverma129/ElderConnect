import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import styles from "./style/contactUsModal.module.scss";
import { ResetModalProps } from "./Type";
import CrossIcon from "../../icons/CrossIcon";
import { checkEmailExistence, validateChange, validatePassword } from "../../Functions/functions";
import ErrorBox from "../ErrorBox/ErrorBox";
import InputField from "../InputField/InputField";
import { UserProfile } from "../Home/Type";
import {
    fetchUserInfoUsingEmail,
    handleOTPCheck,
    handleVerificationCode,
    updatePassword,
} from "../../Functions/Reset/function";
import { sendVerificationLink } from "../../Functions/Login/functions";
import PasswordField from "../PasswordField/PasswordField";

export default function ResetModal(props: ResetModalProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setUser({});
        setOTPPage(false);
        setForm({ email: "", otp: "", password1: "", password2: "" });
        setSuccessMessage("");
        setErrorMessage("");
        setOpen(false);
    };
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState<UserProfile>({});
    const [button1, setButton1] = useState({
        btnText: "Reset",
        disabled: true,
    });
    const [button2, setButton2] = useState({
        btnText: "Change Password",
        disabled: true,
    });
    const [sentVerificationCode, setSendVerificationCode] = useState<string>("");
    const [otpPage, setOTPPage] = useState<boolean>(false);
    // const [timer, setTimer] = useState(30);
    // const [timerActive, setTimerActive] = useState<boolean>(false);
    // const timeoutRef = useRef(null);
    const timeoutRef2 = useRef<NodeJS.Timeout | null>(null);
    // const intervalRef = useRef(null);
    const [showBtn, setShowBtn] = useState<boolean>(true);
    const [form, setForm] = useState<{
        email: string;
        otp: string;
        password1: string;
        password2: string;
    }>({
        email: "",
        otp: "",
        password1: "",
        password2: "",
    });
    const [error, setError] = useState<{
        emailErrorMessage?: string;
        otpErrorMessage?: string;
        errorMessage1?: string;
        errorMessage2?: string;
    }>({
        emailErrorMessage: "",
        otpErrorMessage: "",
        errorMessage1: "",
        errorMessage2: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
        validateChange(name, value, setError, error);
        validatePassword(name, value, form, error, setError);
    };

    const handleSubmit = async () => {
        setButton1({ btnText: "Resetting...", disabled: true });
        setErrorMessage("");
        checkEmailExistence(form.email).then(async (res) => {
            if (res === 1) {
                fetchUserInfoUsingEmail(form.email)
                    .then((user) => {
                        setButton1({ btnText: "Reset", disabled: false });
                        setUser(user);
                        if (user && !user.email_verified) {
                            setShowBtn(false);
                            setErrorMessage("Email is not verified");
                            return;
                        }
                        handleVerificationCode(
                            timeoutRef2,
                            setSendVerificationCode,
                            form.email,
                            setSuccessMessage,
                            setErrorMessage,
                        );
                        setOTPPage(true);
                        // startTimer(setTimer, setTimerActive, timeoutRef, intervalRef);
                    })
                    .catch((err) => {
                        setErrorMessage(err.message);
                        setButton1({ btnText: "Reset", disabled: false });
                    });
            } else {
                setErrorMessage("Email is not registered");
                setButton1({ btnText: "Reset", disabled: false });
            }
        });
    };

    useEffect(() => {
        if (form.email !== "" && error.emailErrorMessage === "") {
            setButton1({ ...button1, disabled: false });
        } else {
            setButton1({ ...button1, disabled: true });
        }
        if (otpPage) {
            if (
                form.otp !== "" &&
                form.password1 !== "" &&
                form.password2 !== "" &&
                form.password1 === form.password2 &&
                error.otpErrorMessage === "" &&
                error.errorMessage1 === "" &&
                error.errorMessage2 === ""
            ) {
                setButton2({ ...button2, disabled: false });
            } else {
                setButton2({ ...button2, disabled: true });
            }
        }
    }, [form, otpPage, error]);

    return (
        <div>
            <div onClick={handleOpen} style={{ width: "fit-content", margin: "auto" }}>
                {props.children}
            </div>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div className={styles["contactUs"]}>
                    <div className={styles["contactUs-pop-up"]}>
                        <div className={styles["contactUs-heading-cross-holder"]}>
                            <div className={styles["contactUs-heading"]}>Reset Password.</div>
                            <div onClick={handleClose}>
                                <CrossIcon />
                            </div>
                        </div>
                        <div className={styles["infusion-form"]}>
                            {otpPage && (
                                <div>
                                    <PasswordField
                                        placeholder="Enter password"
                                        value={form.password1}
                                        id="password1"
                                        name="password1"
                                        handleChange={handleChange}
                                        errorMessage={error.errorMessage1}
                                        label="New Password"
                                        required={true}
                                    />
                                    <PasswordField
                                        placeholder="Confirm new password"
                                        value={form.password2}
                                        id="password2"
                                        name="password2"
                                        handleChange={handleChange}
                                        errorMessage={error.errorMessage2}
                                        label="Confirm New Password"
                                        required={true}
                                    />
                                    <InputField
                                        value={form.otp}
                                        id="otp"
                                        name="otp"
                                        placeholder="Enter verification code"
                                        handleChange={handleChange}
                                        type="text"
                                        label="Verification Required"
                                        required={true}
                                        errorMessage={error.otpErrorMessage}
                                        note="An email has been sent to you"
                                        inputMode={true}
                                    />
                                    <ErrorBox
                                        successMessage={successMessage}
                                        errorMessage={errorMessage}
                                        alignment="center"
                                    />
                                    {/* {timerActive ? (
                                        <div
                                            className={`${styles["contactUs-field"]} ${styles["contactUs-field-link"]}`}
                                        >
                                            <div className="verificationCode">
                                                <label className={styles["contactUs-notice"]}>
                                                    Resend Verification Code
                                                </label>
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
                                        className={`${styles["contactUs-field"]} ${styles["contactUs-field-link"]}`}
                                        onClick={() => {
                                            setForm({ ...form, otp: "", password1: "", password2: "" });
                                            setSuccessMessage("");
                                            setErrorMessage("");
                                            handleVerificationCode(
                                                timeoutRef2,
                                                setSendVerificationCode,
                                                form.email,
                                                setSuccessMessage,
                                                setErrorMessage,
                                            );
                                            // startTimer(setTimer, setTimerActive, timeoutRef, intervalRef);
                                        }}
                                    >
                                        <label className={styles["contactUs-notice"]}>Resend Verification Code</label>
                                    </div>
                                    {/* )} */}
                                    <div className={styles["contactUs-submit"]}>
                                        <button
                                            disabled={button2.disabled}
                                            onClick={() => {
                                                setSuccessMessage("");
                                                handleOTPCheck(setButton2, sentVerificationCode, setForm, form)
                                                    .then(() => {
                                                        updatePassword(
                                                            setErrorMessage,
                                                            setSuccessMessage,
                                                            setButton2,
                                                            setForm,
                                                            form,
                                                            user,
                                                            handleClose,
                                                        );
                                                    })
                                                    .catch((error) => {
                                                        setErrorMessage(error);
                                                    });
                                            }}
                                        >
                                            {button2.btnText}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {!otpPage && (
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
                                    {errorMessage !== "Email is not verified" && (
                                        <ErrorBox
                                            successMessage={successMessage}
                                            errorMessage={errorMessage}
                                            alignment="center"
                                        />
                                    )}
                                    {errorMessage === "Email is not verified" && (
                                        <div
                                            className={styles["contactUs-link"]}
                                            style={{
                                                marginBottom: "10px",
                                                marginTop: "10px",
                                                color: "#d92d3e",
                                                textAlign: "center",
                                                fontWeight: "500",
                                            }}
                                        >
                                            Check your email to activate your account or
                                            <div>
                                                <label
                                                    className={styles["contactUs-notice"]}
                                                    style={{
                                                        display: "inline-block",
                                                        textDecoration: "underline",
                                                        fontWeight: "500",
                                                        color: "#142c60",
                                                        cursor: "pointer",
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
                                    <div className={styles["infusion-submit"]}>
                                        {showBtn && (
                                            <button disabled={button1.disabled} onClick={() => handleSubmit()}>
                                                {button1.btnText}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
