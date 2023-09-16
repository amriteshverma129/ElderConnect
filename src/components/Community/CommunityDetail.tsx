import React, { useState } from "react";
import styles from "./Style/communityDetail.module.scss";
import { Avatar, AvatarGroup } from "@mui/material";
import dynamic from "next/dynamic";
const Posts = dynamic(() => import("./Posts"));
const Members = dynamic(() => import("./Members"));
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import SendInviteModal from "../Modal/SendInviteModal";
import { CommunityDetailProps } from "./Type";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            "& .MuiAvatar-root": { backgroundColor: "#142c60", fontSize: "1rem" },
        },
    }),
);

const CommunityDetail = ({ communityId }: CommunityDetailProps) => {
    const [feed, setFeed] = useState<string>("feed");
    const classes = useStyles();

    return (
        <div className={styles["community-detail"]}>
            <div className={styles["community-detail-cover-image"]}>
                <Image
                    src="https://images.prismic.io/loop-web-members/22fa0959-94fb-4af8-9945-f65733e372fd_community2.webp?auto=compress,format"
                    alt="https://images.prismic.io/loop-web-members/22fa0959-94fb-4af8-9945-f65733e372fd_community2.webp?auto=compress,format"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className={styles["community-detail-profile-image"]}>
                <Image
                    src="https://images.prismic.io/loop-web-members/ae255a6d-8202-4e17-8131-1418e6d7b871_community6.webp?auto=compress,format"
                    alt="https://images.prismic.io/loop-web-members/ae255a6d-8202-4e17-8131-1418e6d7b871_community6.webp?auto=compress,format"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className={styles["community-detail-card"]}>
                <div className={styles["community-detail-card-title-button-holder"]}>
                    <div className={styles["community-detail-card-title"]}>
                        <h5>Community Title</h5>
                        <span>Established on Sep 9, 2022</span>
                        <br />
                    </div>
                    {feed === "feed" && (
                        <div className={styles["community-detail-card-button-joincommunity"]}>
                            <button className={styles["community-detail-card-button"]}>Join Community</button>
                        </div>
                    )}
                    {feed === "member" && (
                        <div className={styles["community-detail-card-sendbutton-leave"]}>
                            <SendInviteModal communityId={communityId}>
                                <button className={styles["community-detail-card-button2"]}>Send invite</button>
                            </SendInviteModal>
                            <button className={styles["community-detail-card-button3"]}>Leave</button>
                        </div>
                    )}
                </div>
                <div className={styles["community-detail-card-avatarGroup-button-holder"]}>
                    <AvatarGroup
                        max={4}
                        sx={{ marginTop: "10px", marginBottom: "10px" }}
                        className={classes.root}
                        spacing="small"
                    >
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>
                    <span>Travel,spain,st.Banibus...+3</span>
                </div>
            </div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis consequatur culpa maxime molestiae iure
                explicabo velit dolore asperiores animi tempora, at nesciunt numquam expedita quaerat itaque quo. Eius,
                corporis hic. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur nam ipsum sit
                officiis accusamus accusantium est autem! Illum dolorum nihil corporis quo fuga, aut nostrum quidem esse
                unde sint soluta? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum quam optio iure,
                perspiciatis totam nulla omnis velit labore consequuntur? Laudantium iure quia, tempore sint enim
                ducimus ipsa voluptatibus cumque fugit.
            </p>
            <div className={styles["community-detail-tabs"]}>
                <div>
                    <span
                        className={
                            feed === "feed" ? styles["community-detail-tab-active"] : styles["community-detail-tab"]
                        }
                        onClick={() => setFeed("feed")}
                    >
                        Feeds
                    </span>
                    <span
                        className={
                            feed === "member" ? styles["community-detail-tab-active"] : styles["community-detail-tab"]
                        }
                        onClick={() => setFeed("member")}
                    >
                        Members
                    </span>
                </div>
            </div>
            {feed === "feed" && <Posts />}
            {feed === "member" && <Members memberDesginType={"memberCard"} />}
        </div>
    );
};
export default CommunityDetail;
