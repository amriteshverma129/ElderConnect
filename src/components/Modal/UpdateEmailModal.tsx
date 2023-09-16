import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal } from "@mui/material";
import styles from "./style/updateEmailModal.module.scss";
import { UpdateEmailModalProps } from "./Type";
import moment from "moment";
import client from "../../apolloClient";
import { updateUserDetailQuery } from "../Account/Queries";
import CrossIcon from "../../icons/CrossIcon";
import { validateChange } from "../../Functions/functions";
import ErrorBox from "../ErrorBox/ErrorBox";
import InputField from "../InputField/InputField";
import { useUser } from "../Authenticate/UserContext";

export default function UpdateEmailModal(props: UpdateEmailModalProps) {
    const { userDetails } = useUser();
    const [open, setOpen] = React.useState(props.open && props.open !== undefined ? props.open : false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        props.setPopUp(false);
    };
    const [form, setForm] = useState<{
        firstName?: string;
        lastName?: string;
        birthDay?: string;
        aboutMe?: string;
        email?: string;
        phone?: string;
    }>({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        birthDay:
            userDetails.birthDay && userDetails.birthDay !== ""
                ? moment(userDetails.birthDay).format("yyyy-MM-DD")
                : "",
        aboutMe: userDetails.aboutMe,
        email: userDetails.email,
        phone: userDetails.phone,
    });
    const [error, setError] = useState<{
        emailErrorMessage?: string;
    }>({
        emailErrorMessage: "",
    });
    const [disabled, setDisabled] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Below Function will be called when email field change and setForm email value .
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
        validateChange(name, value, setError, error, "profile");
    };

    // api call to update user email on Keap.
    const updateUserOnKeap = async () => {
        const contactId = userDetails.contactId;
        const response = await fetch(`/api/updateProfile`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contactId: contactId,
                aboutMe: form.aboutMe,
                birthDay: form.birthDay,
                phone: form.phone,
                email: form.email?.trim(),
            }),
        });
        if (response.status >= 400) {
            setErrorMessage("Something is wrong...please try again later.");
            setSuccessMessage("");
            return;
        }
        const newUserDetail = {
            ...userDetails,
            email: form.email?.trim(),
        };
        localStorage.setItem("userDetail", JSON.stringify(newUserDetail));
        setSuccessMessage("Your Email has been updated Successfully");
        setErrorMessage("");
        setTimeout(() => {
            handleClose();
        }, 2000);
    };

    // api call to update user details email on Hasura cloud.
    const updateUserOnHasura = () => {
        client
            .mutate({
                variables: {
                    contactId: Number(userDetails.contactId),
                    birthDay: form.birthDay,
                    aboutMe: form.aboutMe,
                    email: form.email?.trim(),
                    phone: form.phone,
                },
                mutation: updateUserDetailQuery,
            })
            .then(() => {
                updateUserOnKeap();
            })
            .catch(() => {
                setErrorMessage("Email Address already attached with some other account");
                setSuccessMessage("");
            });
    };

    // Below Function will be called when submit button click and updateUserOnHasura function invoked.
    const handleSubmit = async () => {
        setErrorMessage("");
        setSuccessMessage("Uploading...");
        updateUserOnHasura();
    };

    //Below useEffect will be triggred  everytime when userDetails cahnge and setForm according to changes.
    useEffect(() => {
        setForm({
            ...form,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            birthDay:
                userDetails.birthDay && userDetails.birthDay !== ""
                    ? moment(userDetails.birthDay).format("yyyy-MM-DD")
                    : "",
            aboutMe: userDetails.aboutMe,
            email: userDetails.email,
            phone: userDetails.phone,
        });
    }, [userDetails]);

    //Below useEffect will be triggered everytime when form change and based on form state it will update disable state.
    useEffect(() => {
        if (
            form.firstName !== "" &&
            form.lastName !== "" &&
            form.email?.trim() !== "" &&
            error.emailErrorMessage === ""
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [form]);

    return (
        <div>
            <div onClick={handleOpen}>{props.children}</div>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div className={styles["updateEmail"]}>
                    <div className={styles["updateEmail-pop-up"]}>
                        <div onClick={handleClose} className={styles["updateEmail-heading-cross-holder"]}>
                            <div className={styles["updateEmail-heading"]}>Please share your email details.</div>
                            <div onClick={handleClose}>
                                <CrossIcon />
                            </div>
                        </div>
                        <div className={styles["infusion-form"]}>
                            <InputField
                                id="email"
                                name="email"
                                placeholder="Enter email address"
                                type="text"
                                value={form.email}
                                handleChange={handleChange}
                                // label="Update your Email Address"
                                errorMessage={error.emailErrorMessage}
                                required={true}
                            />
                            <ErrorBox successMessage={successMessage} errorMessage={errorMessage} alignment="center" />
                            <div className={styles["infusion-submit"]}>
                                <button disabled={disabled} onClick={() => handleSubmit()}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
