import React, { ChangeEvent, useState } from "react";
import styles from "./passwordField.module.scss";
import EyeIcon from "../../icons/EyeIcon";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface PasswordFieldProps {
    placeholder: string;
    value?: string;
    errorMessage?: string;
    id: string;
    name: string;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    label?: string;
    required?: boolean;
    disabled?: boolean;
}

const PasswordField = ({
    placeholder,
    value,
    id,
    name,
    label,
    required,
    errorMessage,
    disabled,
    handleChange,
}: PasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={styles["inputField"]}>
            {label && (
                <label htmlFor={id}>
                    {label}
                    {required && <span>*</span>}
                </label>
            )}
            <div className={styles["inputField-group"]}>
                <input
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => handleChange(e)}
                    value={value}
                    disabled={disabled ? true : false}
                    autoComplete="off"
                />
                <span className={styles["inputField-eyeIcon"]} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeIcon /> : <VisibilityOffIcon />}
                </span>
            </div>
            {errorMessage && <span className={styles["error"]}>{errorMessage}</span>}
        </div>
    );
};
export default PasswordField;
