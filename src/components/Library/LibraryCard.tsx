import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Style/libraryCard.module.scss";
import Rating from "../Rating/Rating";
import LikeIcon from "../../icons/LikeIcon";
import ClockIcon from "../../icons/ClockIcon";
import { LibraryCardProps } from "./Type";
import moment from "moment";
import Image from "next/image";
import { fetchAvgRating } from "../../Functions/Library/function";

//Library Card component give a little description about the Recordings
const LibraryCard = ({ recording, menuIcon, prismicMapList }: LibraryCardProps) => {
    const router = useRouter();
    const [avgRating, setAvgRating] = useState<number | null>(null);
    const node = prismicMapList.get(Number(recording.meetingId));

    useEffect(() => {
        fetchAvgRating(recording, setAvgRating);
    }, [recording]);

    const handleClick = () => {
        router.push({
            pathname: `/UI/Library/${recording.meetingId}`,
            query: {
                startTime: recording.startTime,
                eventTopic: recording.eventTopic,
            },
        });
    };

    return (
        <>
            {menuIcon == "GridMenu" ? (
                <div className={styles["library-card"]} onClick={() => handleClick()}>
                    <div className={styles["library-card-image"]}>
                        <div className={styles["library-card-image-overlay"]}></div>
                        <div className={styles["library-card-tag"]}>{node?.category}</div>
                        <div className={styles["library-card-rating"]}>
                            {avgRating == null ? (
                                <Rating color={{ filled: "white" }} fontSize={27} rating={0} />
                            ) : (
                                <div>
                                    {avgRating && (
                                        <Rating color={{ filled: "white" }} fontSize={27} rating={avgRating} />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={styles["library-card-time"]}>
                            <ClockIcon fillcolor={"#fff"} />
                            {recording.duration} min
                        </div>
                        {node?.image && node?.image.url && (
                            <Image
                                src={node.image.url}
                                alt={node.image.url}
                                layout="fill"
                                objectFit="cover"
                                loading="lazy"
                            />
                        )}
                    </div>
                    <div className={styles["library-card-content"]}>
                        <h3 className={styles["library-card-title"]}>{recording.eventTopic}</h3>
                        <div className={styles["library-card-date-like-holder"]}>
                            <span className={styles["library-card-date"]}>
                                {moment(recording.startTime).format("dddd, MMMM Do, YYYY")}
                            </span>
                            <span className={styles["library-card-like"]}>
                                <LikeIcon />
                                &nbsp;{" "}
                                {recording.Likes_aggregate &&
                                    recording.Likes_aggregate.aggregate &&
                                    recording.Likes_aggregate.aggregate.count}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles["library-card-1"]}>
                    <div className={styles["library-card-image"]} onClick={() => handleClick()}>
                        <div className={styles["library-card-image-overlay"]}></div>
                        <div className={styles["library-card-tag"]}>{node?.category}</div>
                        {node?.image && node?.image.url && (
                            <Image src={node.image.url} alt={node.image.url} layout="fill" objectFit="cover" />
                        )}
                        <div className={styles["library-card-time"]}>
                            <ClockIcon fillcolor={"#fff"} />
                            {recording.duration} min
                        </div>
                        <div className={styles["library-card-like"]}>
                            <LikeIcon />
                            &nbsp; <span>{recording.Likes_aggregate?.aggregate?.count}</span>
                        </div>
                    </div>

                    <div className={styles["library-card-content"]}>
                        <h3 className={styles["library-card-title"]} onClick={() => handleClick()}>
                            {recording.eventTopic}
                            &nbsp; <span style={{ color: "#d92d3e", fontSize: "20px" }}>({node?.category})</span>
                        </h3>
                        <div className={styles["library-card-Time-like-holder"]}>
                            <div className={styles["library-card-date"]}>
                                {moment(recording.startTime).format("dddd, MMMM Do, YYYY")}
                            </div>
                            <div className={styles["library-card-rating"]}>
                                {avgRating == null ? (
                                    <Rating color={{ filled: "#F1AE00" }} fontSize={27} rating={0} />
                                ) : (
                                    <div>
                                        {avgRating && (
                                            <Rating color={{ filled: "#F1AE00" }} fontSize={27} rating={avgRating} />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default LibraryCard;
