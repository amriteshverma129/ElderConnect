import React from "react";
import { Modal } from "@mui/material";
import styles from "./style/termConditionModal.module.scss";
import { TermConditionModalProps } from "./Type";
import CrossIcon from "../../icons/CrossIcon";

export default function FitnessWaiverModal(props: TermConditionModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div onClick={handleOpen}>{props.children}</div>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div className={styles["termCondition"]}>
                    <div className={styles["termCondition-pop-up"]}>
                        <div className={styles["termCondition-heading-cross-holder"]}>
                            <div className={styles["termCondition-heading"]}> The LOOP Village Fitness Waiver</div>
                            <div onClick={handleClose}>
                                <CrossIcon />
                            </div>
                        </div>
                        <div style={{ maxHeight: "450px", minHeight: "300px", width: "100%", overflowY: "scroll" }}>
                            <div className={styles["termCondition-rule"]}>
                                <div className={styles["termCondition-para"]}>
                                    By accessing and participating in The LOOP Village online programming, you
                                    acknowledge that you have read, understood, and agree to be bound by this Fitness
                                    Waiver. If you are signing up for The LOOP Village on behalf of a business or other
                                    legal entity, you represent that you have the authority to bind such entity to this
                                    Fitness Waiver, in which case the terms “I”, “me”, and “my” shall refer to such
                                    entity. If you do not have such authority, or if you do not agree with the terms of
                                    this Fitness Waiver, you must not access and use The LOOP Village Programs and
                                    Services. You acknowledge that this Fitness Waiver is a contract between you and
                                    LOOP Village Inc, even though it is electronic and is not physically signed by you,
                                    and it governs your use of The LOOP Village Website and Services.
                                    <br />
                                    <br />
                                    <ol>
                                        <li>
                                            I am voluntarily participating in a class or classes provided by The LOOP
                                            Village. I will be receiving instruction and information concerning fitness
                                            and wellness techniques, which may include weight training and other
                                            physical activities. I represent and warrant that I have no physical or
                                            mental health condition that would prevent my safe participation in these
                                            classes. I agree that if I am pregnant, or have a known cardiac arrhythmia
                                            (including very slow heart rate), a history of heart block, or if I am
                                            taking antipsychotic medications that may result in an adverse reaction in
                                            connection with physical activities, I will consult with and obtain the
                                            permission of a physician prior to engaging in any weight training or other
                                            physical activities in connection with these classes.
                                        </li>
                                        <br />
                                        <li>
                                            I am willingly and voluntarily assuming any risks, injuries, or damages,
                                            known and unknown, which I might incur as a result of participating in these
                                            classes, and agree that The LOOP Village will not have any liability for
                                            such injuries or damages, to the maximum extent allowed by applicable law.
                                        </li>
                                        <br />
                                        <li>
                                            I acknowledge and agree that The LOOP Village is not a medical provider and
                                            does not provide any medical diagnoses or treatments. I agree that if I have
                                            any medical condition, I will seek the help of a medical professional.
                                        </li>
                                        <br />
                                        <li>
                                            To the maximum extent permitted by applicable law, I hereby (a) waive and
                                            release any claims, known or unknown, I may have against The LOOP Village,
                                            including its instructors, officers, directors and employees, and agents,
                                            arising from or in connection with the services provided by The LOOP Village
                                            (“Claims”) and agree to indemnify The LOOP Village, including its
                                            instructors, officers, directors and employees, and agents, from and against
                                            any and all Claims.
                                        </li>
                                        <br />
                                        <li>
                                            I expressly waive all rights afforded by any statute which limits the effect
                                            of a release with respect to unknown claims.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
