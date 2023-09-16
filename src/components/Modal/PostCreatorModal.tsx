import React, { useState, ChangeEvent } from "react";
import { Modal, Avatar } from "@mui/material";
import styles from "./style/postCreatorModal.module.scss";
import CrossIcon from "../../icons/CrossIcon";
import CameraIcon from "../../icons/CameraIcon";
import RecorderIcon from "../../icons/RecorderIcon";
import EmojiIcon from "../../icons/EmojiIcon";
import Picker from "emoji-picker-react";
import { CREATE_PRODUCT_MUTATION } from "./Queries";
import client from "../../apolloClient";
import { PostCreatorModalProps } from "./Type";

export default function PostCreatorModal(props: PostCreatorModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    const [inputStr, setInputStr] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [base64Image, setBase64Image] = useState<string | false | ArrayBuffer | null>("");

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target && e.target.files && e.target.files.length && e.target.files[0];
        const fileType = file && file.type;
        if (fileType && fileType.startsWith("image/")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e2) => {
                const base64EncodedImage = e2.target !== null && e2.target.result;
                setBase64Image(base64EncodedImage);
            };
        } else {
            return;
        }
    };

    const handleUpload = async () => {
        client
            .mutate({
                variables: {
                    communityId: 1234,
                    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
                    image: base64Image,
                    userName: "Ashish Gupta",
                    email: "ashishgupta@qsstechnosoft.com",
                    videos: null,
                },
                mutation: CREATE_PRODUCT_MUTATION,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onEmojiClick = (event: { emoji: string }) => {
        setInputStr((prevInput) => prevInput + event.emoji);
        setShowPicker(false);
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
                <div className={styles["post-creator-modal-holder"]}>
                    <div className={styles["post-creator-modal-heading-cross-holder"]}>
                        <div>Create Post</div>
                        <div onClick={handleClose}>
                            <CrossIcon />
                        </div>
                    </div>
                    <div className={styles["post-creator-modal-title-avatar-holder"]}>
                        <Avatar alt="Remy Sharp" src="/Community/post.jpeg" sx={{ height: "45px", width: "45px" }}>
                            Ashish Gupta
                        </Avatar>
                        <div className={styles["post-creator-modal-title"]}>Ashish</div>
                    </div>
                    <div className={styles["post-creator-modal-input-holder"]}>
                        <input
                            type="text"
                            className={styles["post-creator-modal-input"]}
                            placeholder="What's in your mind?"
                            value={inputStr}
                            onChange={(e) => setInputStr(e.target.value)}
                        />
                        <span onClick={() => setShowPicker((val) => !val)}>
                            <EmojiIcon />
                        </span>
                        {showPicker && (
                            <div style={{ position: "absolute", zIndex: "500", top: "48px" }}>
                                <Picker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                    </div>
                    <div className={styles["post-creator-modal-upload"]}>
                        <input type="file" onChange={handleChange} />
                    </div>
                    <div className={styles["post-creator-modal-icons"]}>
                        <span>
                            <CameraIcon />
                        </span>
                        <span>
                            <RecorderIcon />
                        </span>
                    </div>
                    <button className={styles["post-creator-modal-button"]} onClick={() => handleUpload()}>
                        Post now
                    </button>
                </div>
            </Modal>
        </div>
    );
}
