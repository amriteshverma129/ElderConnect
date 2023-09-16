import React, { useState, ChangeEvent } from "react";
import { Modal } from "@mui/material";
import styles from "./style/sharedPostModal.module.scss";
import { SharePostModalProps } from "./Type";
import CrossIcon from "../../icons/CrossIcon";
import Search from "../Search/Search";
import CommunityCards from "../Community/CommunityCards";

export default function SharePostModal(props: SharePostModalProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = useState<string>("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    // search community
    const handleSearchCommunity = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                <div className={styles["share-post-modal-user"]}>
                    <div className={styles["share-post-modal-heading-crossicon"]}>
                        <h1 className={styles["share-post-modal-heading"]}>Share post to</h1>
                        <div className={styles["share-post-modal-crossicon"]} onClick={handleClose}>
                            <CrossIcon />
                        </div>
                    </div>
                    <div className={styles["share-post-modal-search-Box"]}>
                        <Search handleSearch={handleSearchCommunity} value={search} placeholders={"Search Community"} />
                    </div>
                    <h2 className={styles["share-post-modal-member-selected"]}>3 communities selected</h2>
                    <CommunityCards communityDesginType={"communitycardpost"}></CommunityCards>
                    <button className={styles["share-post-modal-sendinvite-button"]}>Share post</button>
                </div>
            </Modal>
        </div>
    );
}
