import React from "react";
import moment from "moment";
import { useRouter } from "next/router";
import styles from "./Style/eventCard2.module.scss";
import Rating from "../Rating/Rating";
import { meetingType, EventCard2Props } from "./Type";
import Image from "next/image";
import Slider from "react-slick";

//Event Card component give a little description about the event
const EventCard2 = ({ items, prismicMapList }: EventCard2Props) => {
    const router = useRouter();

    // Below function click to perfrom routing to eventDetail page.
    const handleEventCardClick = (item: meetingType) => {
        return router.push({
            pathname: `/UI/Events/${item.meetingId}`,
            query: { startTime: item.startTime, eventTopic: item.eventTopic },
        });
    };

    //settings is used for eventdetail page under slider functionality.
    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className={styles["event-card-holder"]}>
            {/* map is iterating through list of events */}
            <Slider {...settings}>
                {items &&
                    items.map((item: meetingType, index: number) => {
                        const node = prismicMapList.get(Number(item.meetingId));
                        return (
                            <div className={styles["event-card"]} key={index}>
                                <div className={styles["event-card-image"]} onClick={() => handleEventCardClick(item)}>
                                    <div className={styles["event-card-image-overlay"]}></div>
                                    <div className={styles["event-card-tag"]}>{node?.category}</div>
                                    <div className={styles["event-card-rating"]}>
                                        {item.Reviews_aggregate?.aggregate?.avg?.rating === null ? (
                                            <div>
                                                <Rating color={{ filled: "white" }} fontSize={27} rating={0} />
                                            </div>
                                        ) : (
                                            <div>
                                                {item.Reviews_aggregate?.aggregate?.avg?.rating && (
                                                    <Rating
                                                        color={{ filled: "white" }}
                                                        fontSize={27}
                                                        rating={item.Reviews_aggregate?.aggregate?.avg?.rating}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {node?.image && node?.image?.url && (
                                        <Image
                                            src={node?.image?.url}
                                            alt={node.image.url}
                                            layout="fill"
                                            objectFit="cover"
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                                <div className={styles["event-card-content"]}>
                                    <h4
                                        className={styles["event-card-title"]}
                                        onClick={() => handleEventCardClick(item)}
                                    >
                                        {item.eventTopic}
                                    </h4>
                                    <div className={styles["event-card-time"]}>
                                        <span>{moment(item && item.startTime).format("dddd, MMMM Do")}</span>
                                        <span className={styles["event-card-line"]}></span>
                                        <span>
                                            {moment(item && item.startTime).format("LT")} -{" "}
                                            {moment(item && item.startTime)
                                                .add(item && item.duration / 60, "hour")
                                                .format("LT")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </Slider>
        </div>
    );
};
export default EventCard2;
