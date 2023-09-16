import React, { ChangeEvent } from "react";
import styles from "./inputField.module.scss";

interface InputFieldProps {
    placeholder: string;
    type: string;
    value?: string;
    errorMessage?: string;
    id: string;
    name: string;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    note?: string;
    inputMode?: boolean;
}

const InputField = ({
    placeholder,
    type,
    value,
    id,
    name,
    label,
    required,
    errorMessage,
    disabled,
    handleChange,
    note,
    inputMode,
}: InputFieldProps) => {
    return (
        <div className={styles["inputField"]}>
            {label && (
                <label htmlFor={id}>
                    {label}
                    {required && <span>*</span>}
                </label>
            )}
            {note && <span className={styles["inputField-note"]}>{note}</span>}
            <input
                id={id}
                name={name}
                placeholder={placeholder}
                type={type}
                onChange={(e) => handleChange(e)}
                value={value}
                disabled={disabled ? true : false}
                autoComplete="off"
                inputMode={inputMode ? "numeric" : "text"}
            />
            {errorMessage && <span className={styles["error"]}>{errorMessage}</span>}
        </div>
    );
};
export default InputField;
