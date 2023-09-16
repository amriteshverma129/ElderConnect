import React, { ChangeEvent } from "react";
import styles from "./textAreaField.module.scss";

interface TextAreaFieldProps {
    placeholder: string;
    value?: string;
    errorMessage?: string;
    id: string;
    name: string;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    label?: string;
    required?: boolean;
    rows?: number;
    cols?: number;
}

const TextAreaField = ({
    placeholder,
    value,
    id,
    name,
    label,
    required,
    errorMessage,
    rows,
    cols,
    handleChange,
}: TextAreaFieldProps) => {
    return (
        <div className={styles["textAreaField"]}>
            {label && (
                <label htmlFor={id}>
                    {label}
                    {required && (
                        <>
                            <span>*</span>
                            <span id="tag">(required)</span>
                        </>
                    )}
                </label>
            )}
            <textarea
                cols={cols}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={(e) => handleChange(e)}
                value={value}
                rows={rows}
            ></textarea>
            {errorMessage && <span className={styles["error"]}>{errorMessage}</span>}
        </div>
    );
};
export default TextAreaField;
