import Countdown from "react-countdown";
import styles from "./countDownTimer.module.scss";
import moment from "moment";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
    startTime: string;
    duration: number;
    start: boolean;
    show: boolean;
    setStart: Dispatch<SetStateAction<boolean>>;
}
function CountDownTimer({ startTime, start, setStart, duration, show }: Props) {
    return (
        <div>
            <Countdown
                date={startTime}
                renderer={({ days, hours, minutes, seconds }) => (
                    <div>
                        {moment(moment(startTime).format("YYYY-MM-DDTHH:mm:ss")).isAfter(
                            moment().format("YYYY-MM-DDTHH:mm:ss"),
                        ) ? (
                            <div className={styles["countDownTimer"]}>
                                <span>{days} d </span>&nbsp;:&nbsp;
                                <span>{hours} h </span>&nbsp;:&nbsp;
                                <span>{minutes} m </span>&nbsp;:&nbsp;
                                <span>{seconds} s</span>
                            </div>
                        ) : moment(
                              moment(startTime)
                                  .add(duration / 60, "hour")
                                  .format("YYYY-MM-DDTHH:mm:ss"),
                          ).isSameOrAfter(moment().format("YYYY-MM-DDTHH:mm:ss")) ? (
                            show ? (
                                <span
                                    style={{ display: "flex", alignItems: "center" }}
                                    className={styles["countDownTimer"]}
                                >
                                    <span
                                        style={{
                                            height: "6px",
                                            width: "6px",
                                            borderRadius: "50%",
                                            display: "block",
                                            backgroundColor: "#d92d3e",
                                            marginRight: "5px",
                                        }}
                                    ></span>
                                    Ongoing
                                </span>
                            ) : (
                                <span></span>
                            )
                        ) : (
                            <span className={styles["countDownTimer"]}>This Event is finished</span>
                        )}
                    </div>
                )}
                onComplete={() => setStart(!start)}
                onTick={() => {
                    moment(
                        moment(startTime)
                            .subtract(15 / 60, "hour")
                            .format("YYYY-MM-DDTHH:mm:ss"),
                    ).isSame(moment().format("YYYY-MM-DDTHH:mm:ss")) && setStart(!start);
                }}
            />
        </div>
    );
}

export default CountDownTimer;
