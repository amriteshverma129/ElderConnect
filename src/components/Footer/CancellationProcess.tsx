import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./Style/cancellationProcess.module.scss";
import { useRouter } from "next/router";
import ErrorBox from "../ErrorBox/ErrorBox";
import TextAreaField from "../TextAreaField/TextAreaField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InputField from "../InputField/InputField";
import { useUser } from "../Authenticate/UserContext";

const CancellationProcess = () => {
    const { userDetails } = useUser();
    const [reason, setReason] = useState("");
    const [reason2, setReason2] = useState("");
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [btnText, setBtnText] = useState("Submit");
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "reason") {
            setReason(value);
        } else if (name === "reason2") {
            setReason2(value);
        } else if (name === "message") {
            setMessage(value);
        }
    };

    //Below function updating a custom field "cancelationPlan" in keap.
    const handleSubmit = async () => {
        setDisabled(true);
        setBtnText("Submitting...");
        setErrorMessage("");
        setSuccessMessage("");
        const contactId = userDetails.contactId;
        const response = await fetch(`/api/cancellationProcess`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reason:
                    reason.trim() === "" || reason === "other"
                        ? "Reason:" + reason2 + "and Additional Message:" + message
                        : "Reason:" + reason + "and Additional Message:" + message,
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
        setSuccessMessage("You have successfully submitted your request");
        setReason("");
        setReason2("");
        setMessage("");
        router.push({
            pathname: `/UI/Thankyou`,
            query: {
                showText: false,
                title: "For Submitting your Request",
            },
        });
    };

    //Below useEffect will be triggered everytime when cancellationPlan change and based on cancellationPlan state it will update disable state.
    useEffect(() => {
        if ((reason?.trim() !== "" && reason !== "other") || reason2?.trim() !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [reason, reason2]);

    return (
        <div className="layout-container">
            <div className={styles["cancellationProcess-heading"]}>Cancellation Process</div>
            <div className={styles["cancellationProcess"]}>
                <div className={styles["cancellationProcess-para"]}>
                    <span>
                        <a href="mailto:info@theloopvillage.com" target="_blank" rel="noreferrer">
                            info@theloopvillage.com
                        </a>
                    </span>
                    <span>
                        <a href="tel:+18779095667" target="_blank" rel="noreferrer">
                            1.877.909.LOOP (5667){" "}
                        </a>
                    </span>
                </div>
                <div className={styles["infusion-form"]}>
                    <p>
                        If you are no longer wanting to access this member portal please complete your details below and
                        one of our friendly team will be in touch to process your cancellation request.
                    </p>
                    <label htmlFor="category-select">
                        Reason<span>*</span>
                    </label>
                    <Select
                        label="Category"
                        value={reason}
                        displayEmpty
                        onChange={(e) => setReason(e.target.value)}
                        sx={{
                            width: "100%",
                            height: "50px",
                            border: "1px solid #142c60",
                            marginBottom: "20px",
                            borderRadius: "30px",
                            fontSize: "18px",
                            fontWeight: "400",
                            lineHeight: "28px",
                            color: "#444444",
                            padding: "10px 16px",
                        }}
                        IconComponent={() => <KeyboardArrowDownIcon />}
                        className="global-select"
                    >
                        <MenuItem value="">Select a reason</MenuItem>
                        <MenuItem value="Limited Content">Limited Content</MenuItem>
                        <MenuItem value="Cost Concerns">Cost Concerns</MenuItem>
                        <MenuItem value="Content Redundancy">Content Redundancy</MenuItem>
                        <MenuItem value="Technical Issues">Technical Issues</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {reason === "other" && (
                        <div style={{ marginBottom: "20px" }}>
                            <InputField
                                placeholder="Please specify"
                                value={reason2}
                                id="reason2"
                                name="reason2"
                                handleChange={handleChange}
                                type="text"
                                required={true}
                            />
                        </div>
                    )}
                    <TextAreaField
                        cols={24}
                        id="message"
                        name="message"
                        placeholder="Anything you would like to share (optional)"
                        rows={10}
                        handleChange={handleChange}
                        value={message}
                    />
                    <ErrorBox successMessage={successMessage} errorMessage={errorMessage} />
                    <div className={`${styles["infusion-submit"]}`}>
                        <button disabled={disabled} onClick={() => handleSubmit()}>
                            {btnText}
                        </button>
                    </div>
                    <p>
                        All Cancellations require 30 Days notice, your notice period starts after submitting this form.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default CancellationProcess;
