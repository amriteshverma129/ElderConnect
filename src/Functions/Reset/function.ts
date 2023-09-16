import { Dispatch, SetStateAction } from "react";
import crypto from "crypto";
import CustomError from "../../components/CustomError/CustomError";
import { UserProfile } from "../../components/Home/Type";

const ENCRYPTION_ALGORITHM = "aes-256-gcm";
const ENCRYPTION_KEY = "oQnzhKaZCfMkoaSCe5n3ypWt0ZZgV8aR";

export const encryptCode = (code: string) => {
    const iv = crypto.randomBytes(12); // 12-byte IV for GCM mode
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(code, "utf8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");
    return iv.toString("hex") + authTag + encrypted;
};

export const decryptCode = (encryptedCode: string) => {
    const iv = Buffer.from(encryptedCode.slice(0, 24), "hex"); // 24 hex characters for the IV
    const authTag = Buffer.from(encryptedCode.slice(24, 56), "hex"); // 32 hex characters for the authentication tag
    const encryptedData = encryptedCode.slice(56);
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

const generateVerificationCode = () => {
    const randomBytes = crypto.randomBytes(3);
    const code = parseInt(randomBytes.toString("hex"), 16) % 1000000;
    return code.toString().padStart(6, "0");
};

export const fetchUserInfoUsingEmail = async (email: string) => {
    const response = await fetch(`/api/fetchUserInfo2`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
        }),
    });
    if (response.status >= 400) {
        if (response.status === 401) {
            throw new CustomError("Unauthorized", 401);
        } else if (response.status === 404) {
            throw new CustomError("Email is not registered", 404);
        } else {
            throw new CustomError("Internal Server Error, please try again later.", 500);
        }
    }
    const data = await response.json();
    return await data.user[0];
};

export const handleVerificationCode = (
    timeoutRef2: React.MutableRefObject<NodeJS.Timeout | null>,
    setSendVerificationCode: Dispatch<SetStateAction<string>>,
    email: string,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
) => {
    setErrorMessage("");
    setSuccessMessage("Sending Mail...");
    timeoutRef2.current && clearTimeout(timeoutRef2.current);
    const verificationCode = generateVerificationCode();
    const encryptedCode = encryptCode(verificationCode);
    fetch(`/api/sendVerificationCode`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            encryptedCode: encryptedCode,
        }),
    })
        .then(() => {
            setSuccessMessage("Verification code has been sent to your email.");
        })
        .catch(() => {
            setSuccessMessage("");
            setErrorMessage("Error sending email.");
            return;
        });
    setSendVerificationCode(verificationCode);
    timeoutRef2.current = setTimeout(() => {
        setSendVerificationCode("");
    }, 900000);
};

export const handleOTPCheck = (
    setButton: Dispatch<SetStateAction<{ btnText: string; disabled: boolean }>>,
    sentVerificationCode: string,
    setForm: Dispatch<
        SetStateAction<{
            email: string;
            otp: string;
            password1: string;
            password2: string;
        }>
    >,
    form: {
        email: string;
        otp: string;
        password1: string;
        password2: string;
    },
) => {
    setButton({ btnText: "Changing Password...", disabled: true });
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (sentVerificationCode === "") {
                setButton({ btnText: "Change Password", disabled: false });
                setForm({ ...form, otp: "" });
                reject("Verification code has been expired");
            }
            if (sentVerificationCode === form.otp) {
                resolve("success");
            } else {
                setButton({ btnText: "Change Password", disabled: false });
                setForm({ ...form, otp: "" });
                reject("Verification code is not valid");
            }
        }, 500);
    });
};

export const updatePassword = async (
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setSuccessMessage: Dispatch<SetStateAction<string>>,
    setButton: Dispatch<SetStateAction<{ btnText: string; disabled: boolean }>>,
    setForm: Dispatch<
        SetStateAction<{
            email: string;
            otp: string;
            password1: string;
            password2: string;
        }>
    >,
    form: {
        email: string;
        otp: string;
        password1: string;
        password2: string;
    },
    user: UserProfile,
    handleClose: () => void,
) => {
    setErrorMessage("");
    setSuccessMessage("");
    setButton({ btnText: "Changing Password...", disabled: true });
    const res = await fetch(`/api/updatePassword`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            newPassword: form.password1,
            userId: user.user_id,
        }),
    });
    setButton({ btnText: "Change Password", disabled: false });
    if (res.status >= 400) {
        if (res.status === 401) {
            setErrorMessage("Unauthorized");
        } else {
            setForm({ ...form, password1: "", password2: "" });
            setErrorMessage("Password has previously been used");
        }
        return;
    }
    setForm({ ...form, password1: "", password2: "", otp: "", email: "" });
    setSuccessMessage("Password has been updated");
    setTimeout(() => {
        handleClose();
    }, 2000);
};
