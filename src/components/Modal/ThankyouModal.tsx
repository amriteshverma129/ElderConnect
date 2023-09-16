import React from "react";
import { Modal } from "@mui/material";
import styles from "./style/thankyouModal.module.scss";
import Image from "next/image";
import { ThankyouModalProps } from "./Type";

export default function ThankyouModal(props: ThankyouModalProps) {
    const [open, setOpen] = React.useState(props.open && props.open !== undefined ? props.open : false);
    const handleOpen = () => setOpen(true);

    return (
        <div>
            <div onClick={handleOpen}>{props.children}</div>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles["thankyou"]}>
                    <div className={styles["thankyou-pop-up"]}>
                        <Image
                            src={
                                "https://images.prismic.io/loop-web-members/609ffe6d-7235-40bb-9fd1-b12b399c3a07_thankyou-1.webp?auto=compress,format"
                            }
                            alt={"Thank_you"}
                            width={352}
                            height={229}
                            loading="lazy"
                        />
                        <div className={styles["thankyou-heading"]}>This event is over.</div>
                        <div className={styles["thankyou-para"]}>
                            Please come back later to discover new adventures and sign up for exciting events.
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
