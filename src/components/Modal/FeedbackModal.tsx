import React, { useState, ChangeEvent } from "react";
import { Modal } from "@mui/material";
import styles from "./style/feedbackModal.module.scss";
import Rating from "@mui/material/Rating";
import CrossIcon from "../../icons/CrossIcon";
import { insertReviewToReviewsTableQueries } from "./Queries";
import client from "../../apolloClient";
import StartIcon from "../../icons/StarIcon";
import { useRouter } from "next/router";
import { FeedbackModalProps } from "./Type";
import TextAreaField from "../TextAreaField/TextAreaField";
import ErrorBox from "../ErrorBox/ErrorBox";
import { useUser } from "../Authenticate/UserContext";

export default function FeedbackModal(props: FeedbackModalProps) {
    const [open, setOpen] = React.useState(props.open && props.open !== undefined ? props.open : false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if (router.pathname === "/UI/Events") {
            router.push("/UI/Events/");
        }
        setOpen(false);
    };
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const [btnText, setBtnText] = useState<string>("Submit");
    const [disabled, setDisabled] = useState<boolean>(false);
    const { user, userDetails } = useUser();

    //Below function is to handle the review entered in input box.
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setReview(value);
    };

    //Below function is to handle submission of feedback and respond back with success or failure
    const handleSubmit = () => {
        setErrorMessage("");
        setSuccessMessage("");
        if (rating === 0) {
            setErrorMessage("Please provide star rating to proceed.");
            return;
        }
        setBtnText("Submitting...");
        setDisabled(true);
        const startTime = typeof props.startTime === "string" && props.startTime.replace(" ", "+");
        setSuccessMessage("");
        client
            .mutate({
                variables: {
                    meetingId: props.meetingId,
                    startTime: startTime,
                    rating: rating,
                    review: review,
                    user: userDetails.firstName + " " + userDetails.lastName,
                    username: user.email ? userDetails.email : userDetails.phone,
                },
                mutation: insertReviewToReviewsTableQueries,
            })
            .then((res) => {
                console.log(res);
                setSuccessMessage("Successfully submitted your feedback.");
                setErrorMessage("");
                setTimeout(() => {
                    if (router.pathname === "/UI/Events") {
                        router.push("/UI/Events/");
                    } else {
                        window.location.reload();
                    }
                }, 1000);
                setReview("");
                setRating(0);
                setDisabled(true);
                setBtnText("Submitted");
            })
            .catch((error) => {
                console.log(error);
                setSuccessMessage("");
                setReview("");
                setRating(0);
                setErrorMessage("Already submitted the feedback.");
                setBtnText("Submit");
                setDisabled(false);
            });
    };

    return (
        <div>
            <div onClick={handleOpen}>{props.children}</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles["feedback-modal"]}>
                    <div className={styles["feedback-modal-holder"]}>
                        <div className={styles["feedback-modal-heading-cross-holder"]}>
                            <div className={styles["feedback-modal-heading"]}>Rate your experience</div>
                            <div onClick={handleClose}>
                                <CrossIcon />
                            </div>
                        </div>
                        <div className={styles["feedback-title"]}>How much you enjoyed this event?</div>
                        <div className={styles["feedback-modal-rating"]}>
                            <Rating
                                name="half-rating-read"
                                defaultValue={0}
                                precision={1}
                                value={rating}
                                onChange={(_event, newValue) =>
                                    newValue === null ? setRating(0) : setRating(newValue)
                                }
                                icon={<StartIcon fill={"red"} />}
                                emptyIcon={<StartIcon fill={"none"} />}
                                sx={{
                                    fontSize: "40px",
                                }}
                            />
                        </div>
                        <div className={styles["feedback-textarea-container"]}>
                            <TextAreaField
                                cols={24}
                                name=""
                                id=""
                                placeholder="Enter feedback"
                                handleChange={handleChange}
                                value={review}
                                rows={5}
                                label="Please share your feedback (this will not be publicly posted)"
                            />
                        </div>
                        <div style={{ padding: "0px 10px" }}>
                            <ErrorBox successMessage={successMessage} errorMessage={errorMessage} />
                        </div>
                        <div className={styles["feedback-actions"]}>
                            <button
                                className={styles["feedback-modal-submit-btn"]}
                                disabled={disabled}
                                onClick={() => {
                                    handleSubmit();
                                }}
                            >
                                {btnText}
                            </button>
                            <button
                                className={styles["feedback-modal-cancel-btn"]}
                                onClick={() => {
                                    handleClose();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
