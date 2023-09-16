import React, { useState } from "react";
import styles from "./Style/purchase.module.scss";
import { PurchaseProps } from "./Type";
import UpdateEmailModal from "../Modal/UpdateEmailModal";
import { useUser } from "../Authenticate/UserContext";

const Purchase = ({ slices }: PurchaseProps) => {
    const [popUp, setPopUp] = useState(false);
    const { userDetails } = useUser();

    return (
        <div className={styles["purchase"]}>
            {popUp && <UpdateEmailModal open={popUp} setPopUp={setPopUp} />}
            <div className={styles["purchase-card-holder"]}>
                {slices?.map((plan, index) => {
                    return (
                        <div className={styles["purchase-card"]} key={index}>
                            {plan.variation?.primary?.tag && (
                                <div className={styles["purchase-card-tag"]}>{plan.variation?.primary?.tag}</div>
                            )}
                            <div className={styles["purchase-card-title"]}>{plan.variation?.primary?.title}</div>
                            <div className={styles["purchase-card-para"]}>{plan.variation?.primary?.description}</div>
                            <div className={styles["purchase-card-price"]}>
                                $ {plan.variation?.primary?.price}
                                <span className={styles["purchase-card-time"]}>/ {plan.variation?.primary?.term}</span>
                            </div>
                            {plan.variation?.primary?.profit ? (
                                <span className={styles["purchase-card-message"]}>
                                    You Save ${plan.variation?.primary?.profit}/{plan.variation?.primary?.term}
                                </span>
                            ) : (
                                <br />
                            )}
                            <a className={styles["purchase-card-btn"]}>
                                <button
                                    onClick={() => {
                                        if (userDetails?.email && userDetails?.email !== "") {
                                            window.open(plan.variation?.primary?.link, "_blank");
                                        } else {
                                            setPopUp(true);
                                        }
                                    }}
                                >
                                    Buy Now
                                </button>
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Purchase;
