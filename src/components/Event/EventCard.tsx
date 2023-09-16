import React, { useState, useEffect } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import styles from "./Style/eventCard.module.scss";
import { EventCardProps } from "./Type";
import CountDownTimer from "../CountDownTimer/CountDownTimer";
import JoinEventButton from "./JoinEventButton";
import RatingReview from "./RatingReview";
import Image from "next/image";
import { getFormattedTime } from "../../Functions/functions";

const EventCard = ({ item, prismicMapList }: EventCardProps) => {
    const router = useRouter();
    const [start, setStart] = useState(false);
    const [readMore, setReadMore] = useState(false);
    const [description, setDescription] = useState("");
    const node = prismicMapList.get(Number(item.meetingId));
    console.log("Amritesh Verma")

    const handleEventCardClick = () => {
        router.push({
            pathname: `/UI/Events/${item.meetingId}`,
            query: { startTime: item.startTime, eventTopic: item.eventTopic },
        });
    };

    useEffect(() => {
        const getDescription = () => {
            if (node?.descriptions?.length) {
                const newDescription = node.descriptions.find((obj) => {
                    const meetingTime = moment(getFormattedTime(item.startTime)).format("YYYY-MM-DD");
                    const sundayTime = moment(getFormattedTime(obj.date)).format("YYYY-MM-DD");
                    return (
                        moment(meetingTime).diff(sundayTime, "days") >= 0 &&
                        moment(meetingTime).diff(sundayTime, "days") <= 6
                    );
                });
                if (newDescription?.paragraph) {
                    setDescription(newDescription.paragraph);
                }
            }
        };
        setStart(false); // Reset start state on each prop change
        setDescription(""); // Reset description on each prop change
        getDescription();
    }, [item]);

    const renderDescription = () => {
        if (readMore) {
            return (
                <>
                    {node?.description}&nbsp;
                    {node?.link && (
                        <a href={node?.link} className={styles["event-card-link"]} rel="noreferrer" target="_blank">
                            Click here
                        </a>
                    )}
                    {description && (
                        <>
                            <br />
                            <br />
                            {description}
                        </>
                    )}
                </>
            );
        } else {
            return <>{node?.description?.split(" ").slice(0, 21).join(" ") + "..."}</>;
        }
    };

    const toggleReadMore = () => {
        setReadMore(!readMore);
    };

    const isOngoingEvent = () => {
        const endTime = moment(getFormattedTime(item.startTime))
            .add(item.duration / 60, "hour")
            .format("YYYY-MM-DDTHH:mm:ss");
        const currentTime = moment().format("YYYY-MM-DDTHH:mm:ss");
        return (
            moment(endTime).isSameOrAfter(currentTime) &&
            moment(getFormattedTime(item.startTime)).isSameOrBefore(currentTime)
        );
    };

    return (
        <div className={styles["event-card"]}>
            <div className={styles["event-card-image"]} onClick={handleEventCardClick}>
                <div>
                    <div className={styles["event-card-tag"]}>{node?.category}</div>
                    {node?.image && node?.image?.url && (
                        <Image
                            src={node?.image?.url}
                            alt={node?.image?.url}
                            layout="fill"
                            objectFit="cover"
                            loading="lazy"
                        />
                    )}
                </div>
            </div>
            <div className={styles["event-card-content"]}>
                <div className={styles["event-card-title-btn-holder"]}>
                    <div>
                        <h4 className={styles["event-card-title"]} onClick={handleEventCardClick}>
                            {item.eventTopic}
                        </h4>
                        {isOngoingEvent() && (
                            <div className={styles["event-card-ongoing1"]}>
                                <span></span>Ongoing
                            </div>
                        )}
                        <div className={styles["event-card-time"]}>
                            <span>{moment(item.startTime).format("dddd, MMMM Do")}</span>
                            <span className={styles["event-card-line"]}></span>
                            <span>
                                {moment(item.startTime).format("LT")} -{" "}
                                {moment(item.startTime)
                                    .add(item.duration / 60, "hour")
                                    .format("LT")}
                            </span>
                        </div>
                        <div className={styles["event-card-rating"]}>
                            {item.Reviews_aggregate?.aggregate?.avg?.rating === null ? (
                                <RatingReview value={0} ratingValue={"0"} noOfReview={0} color={"#F1AE00"} />
                            ) : (
                                <RatingReview
                                    value={item?.Reviews_aggregate?.aggregate?.avg?.rating}
                                    ratingValue={item?.Reviews_aggregate?.aggregate?.avg?.rating?.toFixed(1)}
                                    noOfReview={item.Reviews_aggregate?.aggregate?.count}
                                    color={"#F1AE00"}
                                />
                            )}
                        </div>
                    </div>
                    <div className={styles["event-card-timer-btn-holder"]}>
                        {node?.passcode && (
                            <JoinEventButton
                                meetingId={item.meetingId}
                                startTime={item.startTime}
                                passcode={node?.passcode}
                                duration={item.duration}
                                eventTopic={item.eventTopic}
                                join_url={item.join_url}
                            />
                        )}
                        {moment(getFormattedTime(item.startTime)).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss")) && (
                            <div className={styles["event-card-countDown-label"]}>Countdown to Event</div>
                        )}
                        <CountDownTimer
                            setStart={setStart}
                            start={start}
                            duration={item.duration}
                            startTime={item.startTime}
                            show={false}
                        />
                    </div>
                </div>
                <p className={styles["event-card-para"]}>
                    {renderDescription()}
                    <span onClick={toggleReadMore} className={styles["event-card-readMore"]}>
                        <span>{readMore ? <p>Show Less</p> : "Read More"}</span>
                    </span>
                </p>
                {isOngoingEvent() && (
                    <div className={styles["event-card-ongoing2"]}>
                        <span></span>Ongoing
                    </div>
                )}
                <div className={styles["event-card-timer-btn-holder"]}>
                    <JoinEventButton
                        meetingId={item.meetingId}
                        startTime={item.startTime}
                        passcode={item.passcode}
                        duration={item.duration}
                        eventTopic={item.eventTopic}
                        join_url={item.join_url}
                    />
                    {moment(getFormattedTime(item.startTime)).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss")) && (
                        <div className={styles["event-card-countDown-label"]}>Countdown to Event</div>
                    )}
                    <CountDownTimer
                        setStart={setStart}
                        start={start}
                        duration={item.duration}
                        startTime={item.startTime}
                        show={false}
                    />
                </div>
            </div>
        </div>
    );
};
export default EventCard;
