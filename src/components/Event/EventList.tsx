import React, { useState, useEffect } from "react";
import { meetingType, EventListProps, nodeType } from "./Type";
import styles from "./Style/eventList.module.scss";
import dynamic from "next/dynamic";
import { fetchMeetingDetails, fetchMeetingDetailsBasedOnFilter } from "../../Functions/Event/function";
import EventSkeleton from "./EventSkeleton";
import { useUser } from "../Authenticate/UserContext";
const EventCardHolder = dynamic(() => import("./EventCardHolder"), {
    loading: () => <EventSkeleton />,
});

const EventList = ({ data, search, filterObj }: EventListProps) => {
    const { userDetails } = useUser();
    const [filterList, setFilterList] = useState<Array<meetingType> | []>([]);
    const [meetingDetails2, setMeetingDetails] = useState<Array<meetingType> | []>([]);
    const [map, setMap] = useState(new Map());
    const [loader, setLoader] = useState<boolean>(true);
    const [roleStr, setRoleStr] = useState<string>("");
    const [totalCount, setTotalCount] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const limit = 5;

    useEffect(() => {
        localStorage.setItem("prismicContent", data);
        const prismicContent = JSON.parse(data);
        const map: Map<number, nodeType> = new Map(prismicContent);
        setMap(map);
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
    }, [userDetails, data]);

    useEffect(() => {
        setLoader(true);
        setFilterList([]);
        setOffset(0);
        const delay = 500; // Adjust the delay time as needed (in milliseconds)
        let timeoutId: NodeJS.Timeout | undefined;

        if (roleStr) {
            timeoutId && clearTimeout(timeoutId); // Clear previous timeout if it exists
            timeoutId = setTimeout(() => {
                if (filterObj.categories.length || filterObj.eventStartTime || filterObj.eventEndTime) {
                    fetchMeetingDetailsBasedOnFilter(
                        setMeetingDetails,
                        roleStr,
                        search,
                        setTotalCount,
                        0,
                        limit,
                        setLoader,
                        filterObj,
                    );
                } else fetchMeetingDetails(setMeetingDetails, roleStr, search, setTotalCount, 0, limit, setLoader);
            }, delay);
        }
        return () => {
            timeoutId && clearTimeout(timeoutId); // Cleanup the timeout when the component unmounts or when the effect re-runs
        };
    }, [search]);

    useEffect(() => {
        if (filterObj.categories.length || (filterObj.eventStartTime !== "" && filterObj.eventStartTime)) {
            setLoader(true);
            setFilterList([]);
            setOffset(0);
            fetchMeetingDetailsBasedOnFilter(
                setMeetingDetails,
                roleStr,
                search,
                setTotalCount,
                0,
                limit,
                setLoader,
                filterObj,
            );
        } else if (roleStr) {
            setLoader(true);
            setFilterList([]);
            setOffset(0);
            fetchMeetingDetails(setMeetingDetails, roleStr, search, setTotalCount, 0, limit, setLoader);
        }
    }, [filterObj.categories, filterObj.eventStartTime, filterObj.eventEndTime, roleStr]);

    useEffect(() => {
        setFilterList([...filterList, ...meetingDetails2]);
    }, [meetingDetails2]);

    return (
        <div>
            {filterList.length !== 0 && <EventCardHolder items={filterList} prismicMapList={map} />}
            {!loader && filterList.length === 0 && (
                <div className={styles["event-list-message-box"]}>No Events are Available</div>
            )}
            {loader && <EventSkeleton />}
            {totalCount > offset + limit && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        className={styles["event-list-loadMore-button"]}
                        onClick={() => {
                            setOffset(offset + limit);
                            if ((filterObj.eventEndTime && filterObj.eventStartTime) || filterObj.categories.length) {
                                fetchMeetingDetailsBasedOnFilter(
                                    setMeetingDetails,
                                    roleStr,
                                    search,
                                    setTotalCount,
                                    offset + limit,
                                    limit,
                                    setLoader,
                                    filterObj,
                                );
                            } else
                                fetchMeetingDetails(
                                    setMeetingDetails,
                                    roleStr,
                                    search,
                                    setTotalCount,
                                    offset + limit,
                                    limit,
                                    setLoader,
                                );
                        }}
                    >
                        View more
                    </button>
                </div>
            )}
        </div>
    );
};
export default EventList;
