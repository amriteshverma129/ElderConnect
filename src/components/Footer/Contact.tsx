import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./Style/contact.module.scss";
import ErrorBox from "../ErrorBox/ErrorBox";
import TextAreaField from "../TextAreaField/TextAreaField";
import { useUser } from "../Authenticate/UserContext";

const Contact = () => {
    const { userDetails } = useUser();
    const [form, setForm] = useState<{
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
    }>({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phone: userDetails.phone,
    });

    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [btnText, setBtnText] = useState("Submit");
    //  const router = useRouter();

    // Below function will target TextAreaField and setMessage state Value.
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setMessage(value);
    };

    //Below function updating a custom field "message" in keap.
    const handleSubmit = async () => {
        setDisabled(true);
        setBtnText("Submitting...");
        setErrorMessage("");
        setSuccessMessage("");
        const contactId = userDetails.contactId;
        const response = await fetch(`/api/message`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message?.trim(),
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
        setSuccessMessage("Thankyou for messaging us.");
        setMessage("");
    };

    //Below useEffect will be triggered everytime when message change and based on feedbcak state it will update disable state.
    useEffect(() => {
        if (message?.trim() !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [message]);

    useEffect(() => {
        setForm({
            ...form,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            phone: userDetails.phone,
        });
    }, [userDetails]);

    return (
        <div className="layout-container">
            <div className={styles["contact-heading"]}>Contact Us</div>
            <div className={styles["contact"]}>
                <div className={styles["contact-para"]}>
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
                    {/* <div className={styles["infusion-label"]}>Fields in red are mandatory</div>
                    <div style={{ backgroundColor: "#ffffff", opacity: "0.5" }}>
                        <InputField
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={toCapitalizeLetter(form.firstName)}
                            placeholder=""
                            handleChange={handleChange}
                            label="First Name"
                            disabled={true}
                            errorMessage=""
                            required={true}
                        />
                    </div>
                    <div style={{ backgroundColor: "#ffffff", opacity: "0.5" }}>
                        {" "}
                        <InputField
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={toCapitalizeLetter(form.lastName)}
                            placeholder=""
                            handleChange={handleChange}
                            label="Last Name"
                            disabled={true}
                            errorMessage=""
                            required={true}
                        />
                    </div>
                    {user.email && (
                        <div style={{ backgroundColor: "#ffffff", opacity: "0.5" }}>
                            <InputField
                                id="email"
                                name="email"
                                placeholder="Enter email address"
                                type="text"
                                value={form.email}
                                handleChange={handleChange}
                                label="Email Address"
                                disabled={user.email ? true : false}
                                errorMessage=""
                                required={true}
                            />
                        </div>
                    )}
                    {user.phone_number && (
                        <div style={{ backgroundColor: "#ffffff", opacity: "0.5" }}>
                            <InputField
                                id="phone2"
                                name="phone2"
                                placeholder="e.g. +13238256557"
                                type="text"
                                value={form.phone}
                                disabled={user.phone_number ? true : false}
                                handleChange={handleChange}
                                label="Phone"
                                errorMessage=""
                                required={true}
                            />
                        </div>
                    )} */}
                    <TextAreaField
                        cols={24}
                        id="message"
                        name="message"
                        placeholder="Write your message here..."
                        rows={10}
                        handleChange={handleChange}
                        value={message}
                        label="Message"
                        required={true}
                    />
                    <ErrorBox successMessage={successMessage} errorMessage={errorMessage} />
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
export default Contact;
