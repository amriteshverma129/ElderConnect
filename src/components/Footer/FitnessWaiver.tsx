import React from "react";
import styles from "./Style/fitnessWaiver.module.scss";

const FitnessWaiver = () => {
    return (
        <div className="layout-container-fluid">
            <div className={styles["fitnessWaiver"]}>
                <div className={styles["fitnessWaiver-heading"]}> The LOOP Village Fitness Waiver</div>
                <div className={styles["fitnessWaiver-para"]}>
                    By accessing and participating in The LOOP Village online programming, you acknowledge that you have
                    read, understood, and agree to be bound by this Fitness Waiver. If you are signing up for The LOOP
                    Village on behalf of a business or other legal entity, you represent that you have the authority to
                    bind such entity to this Fitness Waiver, in which case the terms “I”, “me”, and “my” shall refer to
                    such entity. If you do not have such authority, or if you do not agree with the terms of this
                    Fitness Waiver, you must not access and use The LOOP Village Programs and Services. You acknowledge
                    that this Fitness Waiver is a contract between you and LOOP Village Inc, even though it is
                    electronic and is not physically signed by you, and it governs your use of The LOOP Village Website
                    and Services.
                    <br />
                    <br />
                    <ol>
                        <li>
                            &nbsp;
                            <span>
                                I am voluntarily participating in a class or classes provided by The LOOP Village. I
                                will be receiving instruction and information concerning fitness and wellness
                                techniques, which may include weight training and other physical activities. I represent
                                and warrant that I have no physical or mental health condition that would prevent my
                                safe participation in these classes. I agree that if I am pregnant, or have a known
                                cardiac arrhythmia (including very slow heart rate), a history of heart block, or if I
                                am taking antipsychotic medications that may result in an adverse reaction in connection
                                with physical activities, I will consult with and obtain the permission of a physician
                                prior to engaging in any weight training or other physical activities in connection with
                                these classes.
                            </span>
                        </li>
                        <br />
                        <li>
                            &nbsp;
                            <span>
                                I am willingly and voluntarily assuming any risks, injuries, or damages, known and
                                unknown, which I might incur as a result of participating in these classes, and agree
                                that The LOOP Village will not have any liability for such injuries or damages, to the
                                maximum extent allowed by applicable law.
                            </span>
                        </li>
                        <br />
                        <li>
                            &nbsp;
                            <span>
                                I acknowledge and agree that The LOOP Village is not a medical provider and does not
                                provide any medical diagnoses or treatments. I agree that if I have any medical
                                condition, I will seek the help of a medical professional.
                            </span>
                        </li>
                        <br />
                        <li>
                            &nbsp;
                            <span>
                                To the maximum extent permitted by applicable law, I hereby (a) waive and release any
                                claims, known or unknown, I may have against The LOOP Village, including its
                                instructors, officers, directors and employees, and agents, arising from or in
                                connection with the services provided by The LOOP Village (“Claims”) and agree to
                                indemnify The LOOP Village, including its instructors, officers, directors and
                                employees, and agents, from and against any and all Claims.
                            </span>
                        </li>
                        <br />
                        <li>
                            &nbsp;
                            <span>
                                I expressly waive all rights afforded by any statute which limits the effect of a
                                release with respect to unknown claims.
                            </span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
};
export default FitnessWaiver;
