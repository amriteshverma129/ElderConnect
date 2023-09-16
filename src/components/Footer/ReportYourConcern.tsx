import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./Style/reportYourConcern.module.scss";
import { useRouter } from "next/router";
import ErrorBox from "../ErrorBox/ErrorBox";
import TextAreaField from "../TextAreaField/TextAreaField";
import { useUser } from "../Authenticate/UserContext";

const ReportYourConcern = () => {
    const { userDetails } = useUser();
    const [feedback, setFeedback] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [btnText, setBtnText] = useState("Submit");
    const router = useRouter();

    // Below function will target TextAreaField and setFeedback state Value.
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setFeedback(value);
    };

    //Below function updating a custom field "feedback" in keap.
    const handleSubmit = async () => {
        setDisabled(true);
        setBtnText("Submitting...");
        setErrorMessage("");
        setSuccessMessage("");
        const contactId = userDetails.contactId;
        const response = await fetch(`/api/reportYourProblem`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                feedback: feedback?.trim(),
                contactId: contactId,
            }),
        });
        if (response.status >= 400) {
            setErrorMessage("Something is wrong...please try again later.");
            setSuccessMessage("");
            setDisabled(false);
            setBtnText("Submit");
            return;
        }
        setBtnText("Submit");
        setSuccessMessage("Successful");
        setFeedback("");
        router.push({
            pathname: `/UI/Thankyou`,
            query: {
                showText: false,
                title: "For Submitting your Feedback",
            },
        });
    };

    //Below useEffect will be triggered everytime when feedback change and based on feedbcak state it will update disable state.
    useEffect(() => {
        if (feedback?.trim() !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [feedback]);

    return (
        <div className="layout-container-fluid">
            <div className={styles["reportYourConcern"]}>
                <div className={styles["reportYourConcern-heading"]}>Report Your Concern</div>
                <div className={styles["reportYourConcern-para"]}>
                    Please send us your feedback or problem you are having here
                </div>
                <div className={`${styles["infusion-form"]}`}>
                    <TextAreaField
                        cols={24}
                        id="feedback"
                        name="feedback"
                        placeholder="Write your feedback/concern here"
                        rows={5}
                        handleChange={handleChange}
                        value={feedback}
                        label="Describe feedback/Concern"
                        required={true}
                    />
                    <ErrorBox successMessage={successMessage} errorMessage={errorMessage} alignment="center" />
                    <div className={`${styles["infusion-submit"]}`}>
                        <button disabled={disabled} onClick={() => handleSubmit()}>
                            {btnText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ReportYourConcern;
