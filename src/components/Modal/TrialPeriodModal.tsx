import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import styles from "./style/trialPeriodModal.module.scss";
import { TrialPeriodModalProps } from "./Type";
import Link from "next/link";
import { useUser } from "../Authenticate/UserContext";

export default function TrialPeriodModal(props: TrialPeriodModalProps) {
    const { trialExpirePopUp, userDetails } = useUser();
    const [open, setOpen] = useState(trialExpirePopUp);
    const handleOpen = () => setOpen(true);
    useEffect(() => {
        setOpen(trialExpirePopUp);
    }, [trialExpirePopUp]);

    return (
        <div>
            <div onClick={handleOpen}>{props.children}</div>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div className={styles["trialPeriod"]}>
                    <div className={styles["trialPeriod-pop-up"]}>
                        {userDetails.roles?.includes("The Loop Member Expired") && (
                            <div className={styles["trialPeriod-heading"]}>Your Membership Plan has Expired.</div>
                        )}
                        {userDetails.roles?.includes("The Loop Trial Expired") && (
                            <div className={styles["trialPeriod-heading"]}>Your Trial has Expired.</div>
                        )}

                        <div className={styles["trailPeriod-btn-holders"]}>
                            <Link href={"/UI/Account/Purchase Membership"} passHref>
                                <button>Purchase Membership</button>
                            </Link>
                        </div>
                        <div className={styles["trialPeriod-note"]}>Or you can speak to Team LOOP@</div>
                        <div className={styles["trialPeriod-note2"]}>
                            <span>Call us: 1.877.909.5667 </span>
                            <span className={styles["trailPeriod-line"]}></span>
                            <span>Email us: core@theloopvillage.com</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
