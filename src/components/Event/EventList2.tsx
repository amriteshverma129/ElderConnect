import React, { useState, useEffect } from "react";
import styles from "./Style/eventList.module.scss";
import { meetingType, EventList2Props, nodeType } from "./Type";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { toCapitalizeLetter } from "../../Functions/functions";
import { fetchMeetingDetailsBasedOnFilter } from "../../Functions/Event/function";
import { EventList2Skeleton } from "./EventList2Skeleton";
import { useUser } from "../Authenticate/UserContext";
const EventCard = dynamic(() => import("./EventCard2"));

const EventList2 = ({ category }: EventList2Props) => {
    const { userDetails } = useUser();
    const [filterList, setFilterList] = useState<Array<meetingType> | []>([]);
    const [meetingDetails2, setMeetingDetails] = useState<Array<meetingType> | []>([]);
    const [map, setMap] = useState(new Map());
    const [loader, setLoader] = useState<boolean>(true);
    const router = useRouter();
    const [roleStr, setRoleStr] = useState<string>("");
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        const prismicContentStr = localStorage.getItem("prismicContent");
        const prismicContent = prismicContentStr && JSON.parse(prismicContentStr);
        const map2: Map<number, nodeType> = new Map(prismicContent);
        setMap(map2);
        if (userDetails.contactId) {
            let str = ``;
            userDetails.roles?.split(",").forEach((role) => {
                console.log(role);
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
        roleStr &&
            category &&
            fetchMeetingDetailsBasedOnFilter(setMeetingDetails, roleStr, "", setTotalCount, 0, 30, setLoader, {
                startDate: "",
                endDate: "",
                eventStartTime: "",
                eventEndTime: "",
                rating: null,
                startTime: "",
                endTime: "",
                categories: category.split(",").map((cat) => cat?.trim().toLowerCase()),
            });
    }, [roleStr, category]);

    useEffect(() => {
        setFilterList([...filterList, ...meetingDetails2]);
    }, [meetingDetails2]);

    console.log(totalCount);
    return (
        <div className="layout-container-fluid layout-slider">
            {filterList.length !== 0 && (
                <>
                    <h3 className={styles["event-list-title"]} style={{ marginBottom: "20px" }}>
                        Hey {toCapitalizeLetter(userDetails.firstName)}, we found some similar events for you. Just have
                        a look
                    </h3>
                    <EventCard items={filterList} prismicMapList={map} />
                </>
            )}
            {!loader && filterList.length === 0 && (
                <div className={styles["event-list-message-box"]}>No Events are Available</div>
            )}
            {loader && <EventList2Skeleton />}
            <div className={styles["event-list-action"]}>
                <div>
                    {filterList.length ? (
                        <button className={styles["event-list-button"]} onClick={() => router.push(`/UI/Events/`)}>
                            View All
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};
export default EventList2;
