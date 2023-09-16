import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Style/changePassword.module.scss";
import { validatePassword } from "../../Functions/functions";
import { ChangePasswordProps } from "./Type";
import PasswordField from "../PasswordField/PasswordField";
import ErrorBox from "../ErrorBox/ErrorBox";
import { useUser } from "../Authenticate/UserContext";

const ChangePassword = ({ fullWidth }: ChangePasswordProps) => {
    const { user } = useUser();
    const [form, setForm] = useState({
        password1: "",
        password2: "",
        password3: "",
    });
    const [error, setError] = useState<{
        errorMessage1?: string;
        errorMessage2?: string;
        errorMessage3?: string;
    }>({
        errorMessage1: "",
        errorMessage2: "",
        errorMessage3: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [disable, setDisable] = useState(false);
    const [btnText, setBtnText] = useState("Change Password");

    // Below Function will be called if newPassword and confirmNewPassword value change.
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
        validatePassword(name, value, form, error, setError);
    };

    // api call to update the password
    const updatePassword = async () => {
        setErrorMessage("");
        setSuccessMessage("");
        setDisable(true);
        setBtnText("Changing Password...");
        const response = await fetch(`/api/validateUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: user.email,
                password: form.password3,
            }),
        });
        await response.json();
        if (response.status >= 400) {
            if (response.status === 403) {
                setErrorMessage("Old Password is incorrect.");
            } else if (response.status === 401) {
                setErrorMessage("Unauthorised");
            } else {
                setErrorMessage("Internal Server Error, please try again later");
            }
            setSuccessMessage("");
            setDisable(false);
            setBtnText("Change Password");
            return;
        }
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
        if (res.status >= 400) {
            if (res.status === 401) {
                setErrorMessage("Unauthorized");
            } else {
                setErrorMessage("Password has previously been used");
            }
            setSuccessMessage("");
            setDisable(false);
            setBtnText("Change Password");
            return;
        }
        setErrorMessage("");
        setForm({ ...form, password1: "", password2: "", password3: "" });
        setSuccessMessage("Password has been updated");
        setDisable(true);
        setBtnText("Change Password");
    };

    //Below useEffect will be triggered everytime  form and error change.
    useEffect(() => {
        if (
            form.password3 !== "" &&
            form.password1 !== "" &&
            form.password2 !== "" &&
            form.password1 === form.password2 &&
            error.errorMessage1 === "" &&
            error.errorMessage2 === ""
        ) {
            setDisable(false);
        } else setDisable(true);
    }, [form, error]);

    return (
        <div className={styles["change-password"]}>
            <div className={`${fullWidth ? styles["change-password-container"] : ""}`}>
                <PasswordField
                    placeholder="Enter old password"
                    value={form.password3}
                    id="password3"
                    name="password3"
                    handleChange={handleChange}
                    label="Old Password"
                    required={true}
                />
                <PasswordField
                    placeholder="Enter new password"
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
                <ErrorBox successMessage={successMessage} errorMessage={errorMessage} />
                <button
                    disabled={disable}
                    className={styles["change-password-btn-change"]}
                    onClick={() => updatePassword()}
                >
                    {btnText}
                </button>
            </div>
        </div>
    );
};
export default ChangePassword;
