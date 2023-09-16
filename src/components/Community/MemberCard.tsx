import styles from "./Style/members.module.scss";
import { Avatar, AvatarGroup } from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { MemberCardProps } from "./Type";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            "& .MuiAvatar-root": { backgroundColor: "#142c60", fontSize: "1rem" },
        },
    }),
);

const MemberCard = ({ memberDesginType }: MemberCardProps) => {
    const classes = useStyles();

    return (
        <div className={styles["member-card"]}>
            {memberDesginType === "memberCard" && (
                <div className={styles["member-card-1"]}>
                    <Avatar
                        className={styles["member-card-avtar-img"]}
                        alt="Remy Sharp"
                        src="https://images.prismic.io/loop-web-members/86d0d197-30bb-4242-b0c5-9ded3fa52162_Frame%2B454.webp?auto=compress,format"
                        sx={{ height: "65px", width: "65px" }}
                    >
                        C
                    </Avatar>
                    <div className={styles["member-card-details-section"]}>
                        <div className={styles["member-card-details-section-title"]}>
                            <div className={styles["member-card-details-section-title-heading"]}>
                                <div className={styles["member-card-details-section-title-sub-heading"]}>
                                    Janiffer Aniston
                                </div>
                                <div className={styles["member-card-details-section-title-follower"]}>
                                    <span>2.7k</span> Followers
                                </div>
                            </div>
                            <div className={styles["member-card-details-section-title-user"]}>Ex Teacher</div>
                            <div className={styles["member-card-details-section-title-keywords"]}>
                                Interest
                                <span>playing guitar, Dance, Drawing...3+</span>
                            </div>
                            <div className={styles["member-card-details-section-title-follower-1"]}>
                                <span>2.7k</span> Followers
                            </div>
                        </div>
                        <div className={styles["member-card-details-section-avatarGroup-button-holder"]}>
                            <div className={styles["member-card-details-section-avatarGroup-button-holder-group"]}>
                                <AvatarGroup
                                    max={4}
                                    spacing="small"
                                    className={classes.root}
                                    sx={{ marginTop: "10px", marginBottom: "10px" }}
                                >
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://images.prismic.io/loop-web-members/a7b58fa4-2a18-4ac7-bc00-86f22061640b_Maria.webp?auto=compress,format"
                                    />
                                    <Avatar
                                        alt="Travis Howard"
                                        src="https://images.prismic.io/loop-web-members/b32c3b42-0b93-4596-9c73-07f341ebc074_Margot.webp?auto=compress,format"
                                    />
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                </AvatarGroup>
                                <span>connections</span>
                            </div>
                            <div className={styles["member-card-button-main"]}>
                                <button className={styles["member-card-follow-button"]}>Follow</button>
                                <button className={styles["member-card-connect-button"]}>Connect</button>
                            </div>
                        </div>
                        <div className={styles["member-card-button-main-1"]}>
                            <button className={styles["member-card-follow-button-1"]}>Follow</button>
                            <button className={styles["member-card-connect-button-1"]}>Connect</button>
                        </div>
                    </div>
                </div>
            )}
            {memberDesginType === "memberCardSendInvite" && (
                <div className={styles["member-card-2"]}>
                    <Avatar
                        className={styles["member-card-avtar-img"]}
                        alt="Remy Sharp"
                        src="https://images.prismic.io/loop-web-members/86d0d197-30bb-4242-b0c5-9ded3fa52162_Frame%2B454.webp?auto=compress,format"
                        sx={{ height: "65px", width: "65px" }}
                    >
                        C
                    </Avatar>
                    <div className={styles["member-card-details-section"]}>
                        <div className={styles["member-card-details-section-title"]}>
                            <div className={styles["member-card-details-section-title-heading"]}>
                                <div className={styles["member-card-details-section-title-sub-heading"]}>
                                    Janiffer Aniston
                                </div>
                            </div>
                            <div className={styles["member-card-details-section-title-user"]}>Ex Teacher</div>
                            <div className={styles["member-card-details-section-title-keywords"]}>
                                Interest
                                <span>playing guitar, Dance, Drawing...3+</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles["member-card-details-section-title-user-checkbox"]}>
                        <input type="checkbox" name=" " value=" " />
                    </div>
                </div>
            )}
        </div>
    );
};
export default MemberCard;
