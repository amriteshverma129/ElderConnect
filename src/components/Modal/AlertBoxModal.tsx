import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "@mui/material";
import styles from "./style/contactUsModal.module.scss";
import {} from "./Type";
// import CrossIcon from "../../icons/CrossIcon";

export interface Props {
    children?: React.ReactNode;
    open2?: boolean;
    message: string;
    setPopUp: Dispatch<SetStateAction<boolean>>;
}

export default function AlertBoxModal({ children, open2, message, setPopUp }: Props) {
    const [open, setOpen] = React.useState(open2 !== undefined ? open2 : false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setPopUp(false);
    };

    return (
        <div>
            <div onClick={handleOpen}>{children}</div>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div className={styles["contactUs"]}>
                    <div className={styles["contactUs-pop-up"]}>
                        <div className={styles["contactUs-heading-cross-holder"]}>
                            <div className={styles["contactUs-heading2"]}>{message}</div>
                            {/* <div onClick={handleClose}>
                                <CrossIcon />
                            </div> */}
                        </div>
                        <div className={styles["infusion-form"]}>
                            <div className={styles["infusion-submit"]}>
                                <button onClick={() => handleClose()}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
