import React from "react";
import styles from "./Style/communityCards.module.scss";
import { Avatar, AvatarGroup } from "@mui/material";
import { useRouter } from "next/router";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import HeartIcon from "../../icons/HeartIcon";
import { CommunityCardProps } from "./Type";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            "& .MuiAvatar-root": { backgroundColor: "#142c60", fontSize: "1rem" },
        },
    }),
);

const CommunityCard = ({ communityDesginType }: CommunityCardProps) => {
    const router = useRouter();
    const classes = useStyles();

    return (
        <div className={styles["community-card-holder"]}>
            {communityDesginType === "communitycard" && (
                <div className={styles["community-card-1"]}>
                    <div className={styles["community-card-content-avatar-holder"]}>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://images.prismic.io/loop-web-members/93164b07-cd6e-4c68-a2ea-f393eb25dd45_image6.jpg?auto=compress,format"
                            sx={{ height: "100px", width: "100px" }}
                        >
                            C
                        </Avatar>
                        <div className={styles["community-card-content-like-holder"]}>
                            <div className={styles["community-card-content"]}>
                                <h5 className={styles["community-card-title"]}>Community Title</h5>
                                <span className={styles["community-card-date"]}>Established on Sep 9, 2022</span>
                                <br />
                                <span className={styles["community-card-category"]}>Travel</span>
                            </div>
                            <div className={styles["community-card-like-1"]}>
                                <HeartIcon fillcolor={"#D92D3E"} inpathfill={"#D92D3E"}></HeartIcon>
                                <span>153</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles["community-card-avatarGroup-button-holder"]}>
                        <div className={styles["community-card-avatarGroup-like-holder"]}>
                            <AvatarGroup
                                max={4}
                                sx={{ marginTop: "10px", marginBottom: "10px", display: "inline-flex" }}
                                spacing="small"
                                className={classes.root}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://images.prismic.io/loop-web-members/b32c3b42-0b93-4596-9c73-07f341ebc074_Margot.webp?auto=compress,format"
                                />
                                <Avatar
                                    alt="Travis Howard"
                                    src="https://images.prismic.io/loop-web-members/a7b58fa4-2a18-4ac7-bc00-86f22061640b_Maria.webp?auto=compress,format"
                                />
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                            </AvatarGroup>
                            <div className={styles["community-card-like-2"]}>
                                <HeartIcon fillcolor={"#D92D3E"} inpathfill={"#D92D3E"}></HeartIcon>
                                <span>153</span>
                            </div>
                        </div>
                        <button
                            className={styles["community-card-button"]}
                            onClick={() => router.push("/UI/Community/1234")}
                        >
                            Join Now
                        </button>
                    </div>
                </div>
            )}
            {communityDesginType === "communitycardpost" && (
                <div className={styles["community-card-2"]}>
                    <div className={styles["community-card-post-detail"]}>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://images.prismic.io/loop-web-members/93164b07-cd6e-4c68-a2ea-f393eb25dd45_image6.jpg?auto=compress,format"
                            sx={{ height: "100px", width: "100px" }}
                        >
                            C
                        </Avatar>
                        <div className={styles["community-card-title-category"]}>
                            <h5 className={styles["community-card-title"]}>Community Title</h5>
                            <span className={styles["community-card-category"]}>Travel</span>
                        </div>
                    </div>
                    <div className={styles["community-card-details-section-title-user-checkbox"]}>
                        <input type="checkbox" name=" " value=" " />
                    </div>
                </div>
            )}
        </div>
    );
};
export default CommunityCard;
