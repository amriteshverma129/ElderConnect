import React, { useEffect, useState } from "react";
import styles from "./Style/libraryDetail.module.scss";
import { nodeType } from "../Event/Type";
import client from "../../apolloClient";
import { insertRecordingLike, deleteRecordingLike } from "./Queries";
import dynamic from "next/dynamic";
const LibraryList2 = dynamic(() => import("./LibraryList2"), {
    loading: () => <LibraryList2Skeleton />,
});
import moment from "moment";
import { recordingType, LibraryDetailProps } from "./Type";
import FeedbackModal from "../Modal/FeedbackModal";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetchMeetingDetail, fetchRecordingDetail, fetchReviewOfUserOnEvent } from "../../Functions/Library/function";
import LikeIcon from "../../icons/LikeIcon";
import { LibraryList2Skeleton } from "./LibraryList2Skeleton";
import { useUser } from "../Authenticate/UserContext";

//Library Detail Component show the whole description about the recordings and also show a frame to play video
const LibraryDetail = ({ recordingId, startTime }: LibraryDetailProps) => {
    const { user } = useUser();
    const [recording, setRecording] = useState<recordingType>({});
    const [meetingDetail, setMeetingDetail] = useState<{ meetingId?: number; startTime?: string; eventTopic?: string }>(
        {},
    );
    const [node, setNode] = useState<nodeType>({});
    const [like, setLike] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);
    const [showReview, setShowReview] = useState<boolean>(true);
    const router = useRouter();

    //useEffect will be triggered everytime new data come.
    useEffect(() => {
        fetchReviewOfUserOnEvent(setShowReview, startTime, recordingId, user);
        fetchRecordingDetail(setRecording, startTime, recordingId, user);
        fetchMeetingDetail(setMeetingDetail, startTime, recordingId);
        const prismicContentStr = localStorage.getItem("prismicContent");
        const prismicContent = prismicContentStr && JSON.parse(prismicContentStr);
        const map2: Map<number, nodeType> = new Map(prismicContent);
        const node = map2.get(Number(recordingId));
        node && setNode(node);
    }, [recordingId, startTime, user]);

    //useEffect will be triggered everytime recordnig state change
    useEffect(() => {
        if (recording && recording.Likes && recording.Likes.length && recording.Likes[0].username) {
            setLike(true);
        } else {
            setLike(false);
        }
        recording &&
            recording.Likes_aggregate &&
            recording.Likes_aggregate.aggregate &&
            recording.Likes_aggregate.aggregate.count &&
            setLikeCount(recording.Likes_aggregate.aggregate.count);
    }, [recording]);

    //Below Function will be called once the user hit like or dislike icon.
    const handleLikes = async () => {
        if (like === true) {
            setLikeCount(likeCount - 1);
            setLike(false);
            const deleteRecordingLikeRes = await client.mutate({
                mutation: deleteRecordingLike,
                variables: {
                    recordingId: recordingId,
                    startTime: startTime,
                    username: user.email ? user.email : user.phone_number,
                },
            });
            const deleteRecordingLikeData = await deleteRecordingLikeRes.data;
            const delete_Likes_by_pk = await deleteRecordingLikeData.delete_Likes_by_pk;
            console.log(delete_Likes_by_pk.username);
        } else {
            setLikeCount(likeCount + 1);
            setLike(true);
            const insertRecordingLikeRes = await client.mutate({
                mutation: insertRecordingLike,
                variables: {
                    recordingId: recordingId,
                    startTime: startTime,
                    username: user.email ? user.email : user.phone_number,
                },
            });
            const insertRecordingLikeData = await insertRecordingLikeRes.data;
            const insert_Likes_one = await insertRecordingLikeData.insert_Likes_one;
            console.log(insert_Likes_one.username);
        }
    };
    return (
        <div className="layout-container-fluid">
            <div className={styles["library-detail-holder"]}>
                <div className={styles["library-detail"]}>
                    <div className={styles["library-detail-content"]}>
                        <div className={styles["library-detail-para2"]}>
                            <span
                                onClick={() => {
                                    router.push({
                                        pathname: `/UI/Library`,
                                    });
                                }}
                            >
                                <span className={styles["heading-left-arrow"]}></span>
                                <span style={{ cursor: "pointer" }}>Library</span>
                            </span>
                            / {recording.eventTopic}
                        </div>
                    </div>
                    {/* Below based on videoUId iframe video frame will be render or single image will be shown */}
                    {recording ? (
                        <div className={styles["library-detail-video-wrapper"]}>
                            <iframe
                                src={`https://customer-8cfr3179x76jw30h.cloudflarestream.com/${recording.videoUid}/iframe`}
                                title={node?.image?.url}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className={styles["library-detail-video"]}
                            ></iframe>
                        </div>
                    ) : (
                        <div className={styles["library-detail-image2"]}>
                            {node?.image?.url && (
                                <Image
                                    src={node.image.url}
                                    alt={node.image.url}
                                    layout="fill"
                                    objectFit="cover"
                                    loading="lazy"
                                />
                            )}
                        </div>
                    )}

                    <div className={styles["library-detail-content"]}>
                        <div className={styles["library-detail-title-like"]}>
                            <div className={styles["library-detail-title"]}>{recording.eventTopic}</div>
                            <div className={styles["library-detail-like"]} onClick={() => handleLikes()}>
                                <span>
                                    <LikeIcon />
                                </span>
                                <span>{likeCount}</span>
                            </div>
                        </div>
                        <div className={styles["library-detail-date"]}>
                            <span>{moment(recording.startTime).format("dddd, MMMM Do, YYYY")} </span>
                            <span className={styles["library-detail-line"]}></span>
                            <span>
                                {moment(recording.startTime).format("LT")} -{" "}
                                {recording.duration &&
                                    moment(recording.startTime)
                                        .add(recording.duration / 60, "hour")
                                        .format("LT")}
                            </span>
                        </div>
                        <p className={styles["library-detail-para"]}>
                            {node.description}{" "}
                            {node.link && (
                                <a
                                    href={node.link}
                                    className={styles["library-detail-link"]}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    Click here
                                </a>
                            )}
                        </p>
                        {showReview &&
                        startTime &&
                        moment(moment(startTime).format("YYYY-MM-DDTHH:mm:ss")).isAfter(
                            moment(new Date("2023-04-30")).format("YYYY-MM-DDTHH:mm:ss"),
                        ) ? (
                            <div className={styles["library-detail-para2"]}>
                                You haven&apos;t added your{" "}
                                <span style={{ color: "red", display: "inline-block", cursor: "pointer" }}>
                                    <FeedbackModal
                                        meetingId={String(meetingDetail.meetingId)}
                                        startTime={meetingDetail.startTime}
                                        eventTopic={meetingDetail.eventTopic}
                                    >
                                        rating.
                                    </FeedbackModal>
                                </span>{" "}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
                {/* Below Div will show all the possible related videos */}
                <div className={styles["library-detail-related-videos"]}>
                    <div className={styles["library-detail-heading"]}>Related videos</div>
                    <LibraryList2 category={node.category} />
                </div>
            </div>
        </div>
    );
};
export default LibraryDetail;
