import React from "react";
import { Avatar } from "@mui/material";
import styles from "./Style/notifications.module.scss";
import { useState, useEffect } from "react";
import moment from "moment";
import Countdown from "react-countdown";
import { NotificationProps, notificationType } from "./Type";
import {
    fetchFilterNotificationList,
    fetchNotificationList,
    updateNotificationStatus,
} from "../../Functions/Account/function";
import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/router";
import { useUser } from "../Authenticate/UserContext";

const Notifications = ({ data }: NotificationProps) => {
    const { user, userDetails, countTodaysNotification } = useUser();
    const [map, setMap] = useState(new Map());
    const [loader, setLoader] = useState<boolean>(true);
    const [filterList, setFilterList] = useState<Array<notificationType> | []>([]);
    const [notifications, setNotifications] = useState<Array<notificationType> | []>([]);
    const [buttoncolor, setButtonColor] = useState<string>("unread");
    const [roleStr, setRoleStr] = useState<string>("");
    const [offset, setOffset] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>(0);
    const limit = 6;
    const arr = Array(6).fill(0);
    const router = useRouter();

    useEffect(() => {
        if (userDetails.contactId) {
            let str = ``;
            userDetails.roles?.split(",").forEach((role) => {
                str =
                    str +
                    `{
                    roles: {
                        _contains: ["${role.trim()}"],
                    },
                }`;
            });
            const str2 = `[${str}]`;
            setRoleStr(str2);
        }
    }, [userDetails]);

    useEffect(() => {
        const map2 = new Map();
        data?.edges &&
            data?.edges.length &&
            data?.edges.forEach((item) => {
                if (item !== undefined) {
                    const node = item.node;
                    if (node.meetingId !== undefined && node.image !== undefined) {
                        map2.set(node.meetingId, {
                            image: node.image,
                            passcode: node.passcode,
                            host: node.host,
                            category: node.category,
                            description: node.description,
                            link: node.link,
                            descriptions: node.descriptions,
                        });
                    }
                }
            });
        setMap(map2);
    }, [data]);

    useEffect(() => {
        if (roleStr && (user?.email !== undefined || user.phone_number !== undefined)) {
            setLoader(true);
            setFilterList([]);
            setOffset(0);
            if (buttoncolor === "all") {
                fetchNotificationList(
                    setNotifications,
                    roleStr,
                    setTotalCount,
                    0,
                    limit,
                    setLoader,
                    user.email && user.email !== undefined ? user.email : String(user.phone_number),
                );
            } else
                fetchFilterNotificationList(
                    setNotifications,
                    roleStr,
                    setTotalCount,
                    0,
                    limit,
                    setLoader,
                    user.email && user.email !== undefined ? user.email : String(user.phone_number),
                );
        }
    }, [roleStr, buttoncolor, user]);

    useEffect(() => {
        setFilterList([...filterList, ...notifications]);
    }, [notifications]);

    return userDetails.notificationsOn ? (
        <div className={styles["account-notifications"]}>
            {/* notifications all and unread buttons */}
            <div className={styles["account-notifications-buttons"]}>
                {buttoncolor === "all" && (
                    <>
                        <button
                            className={styles["notifications-all-active-button"]}
                            onClick={() => setButtonColor("all")}
                        >
                            All
                        </button>
                        <button
                            className={styles["notifications-Unread-button"]}
                            onClick={() => setButtonColor("unread")}
                        >
                            Unread ({countTodaysNotification})
                        </button>
                    </>
                )}
                {buttoncolor === "unread" && (
                    <>
                        <button className={styles["notifications-all-button"]} onClick={() => setButtonColor("all")}>
                            All
                        </button>
                        <button
                            className={styles["notifications-Unread-active-button"]}
                            onClick={() => setButtonColor("unread")}
                        >
                            Unread ({countTodaysNotification})
                        </button>
                    </>
                )}
            </div>
            {filterList.length !== 0 && (
                <div>
                    {filterList.map((notification) => {
                        const node = map.get(Number(notification.meetingId));
                        if (notification.type === "reminder") {
                            return (
                                <div
                                    key={notification.id}
                                    className={styles["account-notifications-events-all-details"]}
                                >
                                    <div className={styles["account-notifications-events-message-and-avatar-holder"]}>
                                        <div className={styles["account-notification-avatar-holder"]}>
                                            <Avatar
                                                alt={node.image.url}
                                                src={node.image.url}
                                                sx={{
                                                    height: { xs: "80px", md: "100px" },
                                                    width: { xs: "80px", md: "100px" },
                                                }}
                                            ></Avatar>
                                            {notification.status && <span></span>}
                                        </div>
                                        <div className={styles["account-notifications-message"]}>
                                            <div>
                                                <span
                                                    className={styles["account-notification-event-topic"]}
                                                    onClick={() => {
                                                        notification.status && updateNotificationStatus(notification);
                                                        router.push({
                                                            pathname: `/UI/Events/${notification.meetingId}`,
                                                            query: {
                                                                startTime: notification.startTime,
                                                                eventTpoic: notification.title,
                                                            },
                                                        });
                                                    }}
                                                >
                                                    {notification.title}
                                                </span>
                                                {moment(
                                                    moment(notification.startTime).format("YYYY-MM-DDTHH:mm:ss"),
                                                ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss")) && (
                                                    <span className={styles["account-notification-time2"]}>
                                                        Starts in &nbsp;
                                                    </span>
                                                )}
                                                <span className={styles["account-notification-time"]}>
                                                    <Countdown
                                                        date={notification.startTime}
                                                        renderer={({ days, hours, minutes, seconds }) => (
                                                            <div>
                                                                {moment(
                                                                    moment(notification.startTime).format(
                                                                        "YYYY-MM-DDTHH:mm:ss",
                                                                    ),
                                                                ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss")) ? (
                                                                    <div>
                                                                        <span>{days} d </span>:<span>{hours} h </span>:
                                                                        <span>{minutes} m </span>:
                                                                        <span>{seconds} s</span>
                                                                    </div>
                                                                ) : moment(
                                                                      moment(notification.startTime)
                                                                          .add(notification.duration / 60, "hour")
                                                                          .format("YYYY-MM-DDTHH:mm:ss"),
                                                                  ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss")) ? (
                                                                    <span>Event is live</span>
                                                                ) : (
                                                                    <span>This event is finished</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    />
                                                </span>
                                            </div>
                                            <span>{moment(notification.created_at).fromNow()}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className={styles["account-notifications-event-button"]}
                                            onClick={() => {
                                                window.open(notification.join_url);
                                            }}
                                            disabled={
                                                moment(
                                                    moment(notification.startTime)
                                                        .subtract(15 / 60, "hour")
                                                        .format("YYYY-MM-DDTHH:mm:ss"),
                                                ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss")) ||
                                                !moment(
                                                    moment(notification.startTime)
                                                        .add(notification.duration / 60, "hour")
                                                        .format("YYYY-MM-DDTHH:mm:ss"),
                                                ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss"))
                                            }
                                        >
                                            {moment(
                                                moment(notification.startTime)
                                                    .subtract(15 / 60, "hour")
                                                    .format("YYYY-MM-DDTHH:mm:ss"),
                                            ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss"))
                                                ? "Coming Soon"
                                                : moment(
                                                      moment(notification.startTime)
                                                          .add(notification.duration / 60, "hour")
                                                          .format("YYYY-MM-DDTHH:mm:ss"),
                                                  ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss"))
                                                ? "Join Event"
                                                : "Event Ended"}
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            )}
            {!loader && filterList.length === 0 && (
                <div className={styles["account-notifications2"]}>
                    <div>No Notifications</div>
                </div>
            )}
            {loader &&
                arr.map((_, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "30px",
                                paddingBottom: "25px",
                                marginBottom: "20px",
                                borderBottom: "5px solid whitesmoke",
                            }}
                        >
                            <div>
                                <Skeleton
                                    variant="rounded"
                                    sx={{ height: "100px", width: "100px", borderRadius: "100%" }}
                                />
                            </div>
                            <div style={{ width: "100%" }}>
                                <Skeleton variant="text" sx={{ width: "100%", fontSize: "65px" }} />
                            </div>
                        </div>
                    );
                })}
            {totalCount > offset + limit && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        className={styles["account-notifications-view-more-button"]}
                        onClick={() => {
                            setOffset(offset + limit);
                            if (buttoncolor === "all") {
                                fetchNotificationList(
                                    setNotifications,
                                    roleStr,
                                    setTotalCount,
                                    offset + limit,
                                    limit,
                                    setLoader,
                                    user.email && user.email !== undefined ? user.email : String(user.phone_number),
                                );
                            } else
                                fetchFilterNotificationList(
                                    setNotifications,
                                    roleStr,
                                    setTotalCount,
                                    offset + limit,
                                    limit,
                                    setLoader,
                                    user.email && user.email !== undefined ? user.email : String(user.phone_number),
                                );
                        }}
                    >
                        View more
                    </button>
                </div>
            )}
        </div>
    ) : (
        <div className={styles["account-notifications2"]}>
            <div>
                Your notifications are disabled. To enable notifications, kindly activate them using the button below.
            </div>
            <button
                onClick={() =>
                    router.push({
                        pathname: "/UI/Account/Settings",
                    })
                }
            >
                Settings
            </button>
        </div>
    );
};
export default Notifications;
