import React, { useState } from "react";
import styles from "./Style/notifications.module.scss";
import CrossIcon2 from "../../icons/CrossIcon2";
import { updateNotificationStatus } from "../../Functions/Account/function";
import Countdown from "react-countdown";
import moment from "moment";
import { useUser } from "../Authenticate/UserContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const NotificationBar = () => {
    const [closedNotifications, setClosedNotifications] = useState<number[]>([]);
    const { userDetails, notifications } = useUser();

    return (
        <div className={styles["notificationBar-container"]}>
            {notifications.length !== 0 && userDetails.notificationsOn && (
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    interval={5000}
                    infiniteLoop={true}
                    transitionTime={1500}
                    showIndicators={notifications.length - closedNotifications.length === 1 ? false : true}
                    showArrows={false}
                    className={"custom-carousel"}
                >
                    {notifications
                        .filter((item) => !closedNotifications.includes(item.id))
                        .map((item) => (
                            <div className={styles["notificationBar"]} key={item.id}>
                                <div className={styles["notificationBar-title"]}>{item.title}</div>
                                <div className={styles["notificationBar-timer-btn-cross-container"]}>
                                    <div>
                                        {moment(moment(item.startTime).format("YYYY-MM-DDTHH:mm:ss")).isAfter(
                                            moment().format("YYYY-MM-DDTHH:mm:ss"),
                                        ) && <span>Starts in &nbsp;</span>}
                                        <span style={{ display: "inline-block" }}>
                                            {" "}
                                            <Countdown
                                                date={item.startTime}
                                                renderer={({ days, hours, minutes, seconds }) => (
                                                    <div>
                                                        {moment(
                                                            moment(item.startTime).format("YYYY-MM-DDTHH:mm:ss"),
                                                        ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss")) ? (
                                                            <div>
                                                                <span>{days} d </span>:&nbsp;<span>{hours} h </span>
                                                                :&nbsp;
                                                                <span>{minutes} m </span>:&nbsp;<span>{seconds} s</span>
                                                            </div>
                                                        ) : moment(
                                                              moment(item.startTime)
                                                                  .add(item.duration / 60, "hour")
                                                                  .format("YYYY-MM-DDTHH:mm:ss"),
                                                          ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss")) ? (
                                                            <span>Event is live</span>
                                                        ) : (
                                                            <span>This Event is finished</span>
                                                        )}
                                                    </div>
                                                )}
                                            />
                                        </span>
                                    </div>
                                    <div>
                                        <button onClick={() => window.open(item.join_url)}>Join Now</button>
                                    </div>
                                    <div
                                        className={styles["notificationBar-cross"]}
                                        onClick={() => {
                                            updateNotificationStatus(item);
                                            setClosedNotifications([...closedNotifications, item.id]);
                                        }}
                                    >
                                        <CrossIcon2></CrossIcon2>
                                    </div>
                                </div>
                            </div>
                        ))}
                </Carousel>
            )}
        </div>
    );
};
export default NotificationBar;
