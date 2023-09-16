import React, { useState, ChangeEvent } from "react";
import { Modal } from "@mui/material";
import styles from "./style/sendInvitemodal.module.scss";
import { SendInviteModalProps } from "./Type";
import CrossIcon from "../../icons/CrossIcon";
import Search from "../../components/Search/Search";
import Members from "../Community/Members";

export default function SendInviteModal(props: SendInviteModalProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = useState<string>("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    // search member by name
    const handleSearchMember = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setSearch(value);
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
                <div className={styles["send-invite-modal-user"]}>
                    <div className={styles["send-invite-modal-heading-crossicon"]}>
                        <h1 className={styles["send-invite-modal-heading"]}>Send invite to</h1>
                        <div className={styles["send-invite-modal-crossicon"]} onClick={handleClose}>
                            <CrossIcon />
                        </div>
                    </div>
                    <div className={styles["send-invite-modal-search-Box"]}>
                        <Search handleSearch={handleSearchMember} value={search} placeholders={"Search member "} />
                    </div>
                    <h1 className={styles["send-invite-modal-member-selected"]}>3 Member selected</h1>
                    <Members memberDesginType={"memberCardSendInvite"}></Members>
                    <button className={styles["send-invite-modal-sendinvite-button"]}>Send invite</button>
                </div>
            </Modal>
        </div>
    );
}
