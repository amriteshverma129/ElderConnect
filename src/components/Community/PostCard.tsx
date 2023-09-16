import React, { useState } from "react";
import Picker from "emoji-picker-react";
import styles from "./Style/posts.module.scss";
import { Avatar } from "@mui/material";
import CommentIcon from "../../icons/CommentIcon";
import ReplyIcon from "../../icons/ReplyIcon";
import HeartIcon from "../../icons/HeartIcon";
import MenuIcon from "../../icons/MenuIcon";
import EmojiIcon from "../../icons/EmojiIcon";
import moment from "moment";
import SharePostModal from "../Modal/SharePostModal";
import { PostCardProps } from "./Type";

const PostCard = ({ postId, communityId, image, description, userName, email, videos, created_at }: PostCardProps) => {
    const [inputStr, setInputStr] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    console.log(image, postId, email, videos);
    const onEmojiClick = (event: { emoji: string }) => {
        setInputStr((prevInput) => prevInput + event.emoji);
        setShowPicker(false);
    };

    return (
        <div className={styles["post-card"]}>
            <div className={styles["post-card-title-avatar-holder"]}>
                <Avatar alt="Remy Sharp" src="/Community/post.jpeg" sx={{ height: "45px", width: "45px" }}>
                    {userName && userName !== undefined && userName.charAt(0).toUpperCase()}
                </Avatar>
                <div className={styles["post-card-title"]}>
                    <h6>{userName}</h6>
                    <span>{moment(created_at).format("MMM DD, YYYY")}</span>
                </div>
                <div className={styles["post-card-icon"]}>
                    <MenuIcon />
                </div>
            </div>
            {description && description !== undefined && (
                <p className={styles["post-card-para"]}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
            )}
            {/* {image && image !== undefined && <img height="100%" width="100%" src={image} alt={image} loading="lazy" />} */}
            <div className={styles["post-card-likes-icons"]}>
                <div className={styles["post-card-likes"]}>
                    <span>24 Likes</span>. <span>214 comments</span>. <span> 72 Shares</span>
                </div>
                <div className={styles["post-card-icons"]}>
                    <span>
                        <CommentIcon />
                    </span>
                    <span>
                        <HeartIcon />
                    </span>
                    <SharePostModal communityId={communityId}>
                        <span>
                            <ReplyIcon />
                        </span>
                    </SharePostModal>
                </div>
            </div>
            <div className={styles["post-card-input-avatar-holder"]}>
                <Avatar alt="Remy Sharp" src="/Community/post.jpeg" sx={{ height: "45px", width: "45px" }}>
                    {/* {user && user.name && user.name !== undefined && user.name.charAt(0).toUpperCase()} */}A
                </Avatar>
                <input
                    type="text"
                    placeholder="Write a comment"
                    value={inputStr}
                    onChange={(e) => setInputStr(e.target.value)}
                />
                <span onClick={() => setShowPicker((val) => !val)}>
                    <EmojiIcon />
                </span>
                <span>Post</span>
            </div>
            {showPicker && (
                <div style={{ position: "absolute", zIndex: "500" }}>
                    <Picker onEmojiClick={onEmojiClick} />
                </div>
            )}
        </div>
    );
};
export default PostCard;
