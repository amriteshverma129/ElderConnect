import React from "react";
import styles from "./Style/eventCard.module.scss";
import { meetingType, EventCardHolderProps } from "./Type";
import moment from "moment";
import EventCard from "./EventCard";

const EventCardHolder = ({ items, prismicMapList }: EventCardHolderProps) => {
    // Function to check if two events have the same day
    const isSameDay = (date1: string, date2: string) => {
        return moment(date1).format("dddd") === moment(date2).format("dddd");
    };

    return (
        <div className={styles["event-card-holder"]}>
            {/* map is iterating through list of events */}
            {items.map((item: meetingType, index: number) => {
                const isFirstEventOfDay = index === 0 || !isSameDay(item.startTime, items[index - 1].startTime);
                return (
                    <div key={index}>
                        {isFirstEventOfDay && (
                            <div className={styles["event-card-day-line"]}>
                                <div className={styles["event-card-day-title"]}>
                                    {moment(item.startTime).format("dddd")}
                                </div>
                            </div>
                        )}
                        {!isFirstEventOfDay && <div className={styles["event-card-day-line2"]}></div>}
                        <EventCard item={item} prismicMapList={prismicMapList} />
                    </div>
                );
            })}
        </div>
    );
};
export default EventCardHolder;
