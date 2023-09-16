import React from "react";
import styles from "./Style/libraryDetail.module.scss";
import { LibraryCardsProps } from "./Type";
import { useRouter } from "next/router";
import moment from "moment";
import Image from "next/image";

//Library Card2 component will render all the related recording
const LibraryCards2 = ({ recordings, prismicMapList }: LibraryCardsProps) => {
    const router = useRouter();
    return (
        <div className={styles["library-detail-related-videos2"]}>
            {/* Below map is iterating through list of recordings and rendering it on the Library Detail Page */}
            {recordings.map((recording, index) => {
                const node = prismicMapList.get(Number(recording.meetingId));
                return (
                    <div
                        className={styles["library-detail-card"]}
                        key={index}
                        onClick={() => {
                            return router.push({
                                pathname: `/UI/Library/${recording && recording.meetingId}`,
                                query: {
                                    startTime: recording && recording.startTime,
                                    eventTopic: recording && recording.eventTopic,
                                },
                            });
                        }}
                    >
                        <div className={styles["library-detail-image"]}>
                            {node?.image && node?.image.url && (
                                <Image
                                    src={node?.image.url}
                                    alt={node?.image.url}
                                    layout="fill"
                                    objectFit="cover"
                                    loading="lazy"
                                />
                            )}
                        </div>
                        <div className={styles["library-detail-content"]}>
                            <h5 className={styles["library-detail-title"]}>{recording.eventTopic}</h5>
                            <div className={styles["library-detail-view"]}>{node?.category}</div>
                            <div className={styles["library-detail-view2"]}>
                                {/* {moment(recording && recording.startTime)
                                    .startOf("minutes")
                                    .fromNow()} */}
                                {moment(recording.startTime).format("dddd, MMMM Do, YYYY")}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default LibraryCards2;
