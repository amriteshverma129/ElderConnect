import React from "react";
import styles from "./errorBox.module.scss";

interface ErrorBoxProps {
    successMessage?: string;
    errorMessage?: string;
    alignment?: string;
}
// ErrorBox components will show success and error message
const ErrorBox = ({ successMessage, errorMessage, alignment }: ErrorBoxProps) => {
    return (
        <div className={styles["errorBox"]}>
            {successMessage && (
                <span className={styles["success"]} style={{ textAlign: alignment === "center" ? "center" : "left" }}>
                    {successMessage}
                </span>
            )}
            {errorMessage && (
                <span className={styles["error"]} style={{ textAlign: alignment === "center" ? "center" : "left" }}>
                    {errorMessage}
                </span>
            )}
        </div>
    );
};
export default ErrorBox;
