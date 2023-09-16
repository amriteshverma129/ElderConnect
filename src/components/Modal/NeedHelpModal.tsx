import React, { useState } from "react";
import { Modal } from "@mui/material";
import styles from "./style/needHelpModal.module.scss";
import CrossIcon from "../../icons/CrossIcon";
import Link from "next/link";
import { NeedHelpModalProps } from "./Type";

export default function NeedHelpModal(props: NeedHelpModalProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
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
                <div className={styles["needHelp-modal-holder"]}>
                    <div className={styles["needHelp-modal-heading-cross-holder"]}>
                        <div className={styles["needHelp-modal-heading"]}>Having any trouble ?</div>
                        <div onClick={handleClose}>
                            <CrossIcon />
                        </div>
                    </div>
                    <div className={styles["needHelp-modal-para"]}>
                        <span>
                            <a href="tel:+18779095667" target="_blank" rel="noreferrer">
                                Call us: 1.877.909.5667{" "}
                            </a>
                        </span>
                        <br />
                        <span>
                            <a href="mailto:core@theloopvillage.com" target="_blank" rel="noreferrer">
                                Email us: core@theloopvillage.com
                            </a>
                        </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Link href={"/UI/Footer/Report Your Concern"} passHref>
                            <button className={styles["needHelp-modal-btn"]}>Report Your Concern</button>
                        </Link>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
