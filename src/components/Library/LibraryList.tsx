import React, { useState, useEffect } from "react";
import styles from "./Style/libraryList.module.scss";
import dynamic from "next/dynamic";
const LibraryCards = dynamic(() => import("./LibraryCards"), {
    loading: () => <LibrarySkeleton />,
});
import { LibraryListProps, recordingType } from "./Type";
import { nodeType } from "../Event/Type";
import { fetchRecordingDetails, fetchRecordingDetailsBasedOnFilter } from "../../Functions/Library/function";
import LibrarySkeleton from "./LibrarySkeleton";
import { useUser } from "../Authenticate/UserContext";

const LibraryList = ({ data, search, category, menuIcon }: LibraryListProps) => {
    const { userDetails } = useUser();
    const [recordingList, setRecordingList] = useState<Array<recordingType> | []>([]);
    const [recordingDetails, setRecordingDetails] = useState<Array<recordingType> | []>([]);
    const [map, setMap] = useState(new Map());
    const [loader, setLoader] = useState<boolean>(true);
    const [roleStr, setRoleStr] = useState<string>("");
    const [totalCount, setTotalCount] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const limit = 9;

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
        setRecordingList([]);
        setOffset(0);
        const delay = 500;
        let timeoutId: NodeJS.Timeout | undefined;

        if (roleStr) {
            timeoutId && clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (category !== "") {
                    fetchRecordingDetailsBasedOnFilter(
                        setRecordingDetails,
                        roleStr,
                        search,
                        setTotalCount,
                        0,
                        limit,
                        setLoader,
                        category,
                    );
                } else fetchRecordingDetails(setRecordingDetails, roleStr, search, setTotalCount, 0, limit, setLoader);
            }, delay);
        }
        return () => {
            timeoutId && clearTimeout(timeoutId);
        };
    }, [search]);

    useEffect(() => {
        if (category !== "") {
            setLoader(true);
            setRecordingList([]);
            setOffset(0);
            fetchRecordingDetailsBasedOnFilter(
                setRecordingDetails,
                roleStr,
                search,
                setTotalCount,
                0,
                limit,
                setLoader,
                category,
            );
        } else if (roleStr) {
            setLoader(true);
            setRecordingList([]);
            setOffset(0);
            fetchRecordingDetails(setRecordingDetails, roleStr, search, setTotalCount, 0, limit, setLoader);
        }
    }, [category, roleStr]);

    useEffect(() => {
        setRecordingList([...recordingList, ...recordingDetails]);
    }, [recordingDetails]);

    return (
        <div>
            {recordingList.length !== 0 && (
                <LibraryCards recordings={recordingList} menuIcon={menuIcon} prismicMapList={map} />
            )}
            {!loader && recordingList.length === 0 && (
                <div className={styles["library-list-message-box"]}>No Videos are Available</div>
            )}
            {loader && menuIcon && <LibrarySkeleton menuIcon={menuIcon} />}
            {totalCount > offset + limit && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        className={styles["library-list-loadMore-button"]}
                        onClick={() => {
                            setOffset(offset + limit);
                            if (category !== "") {
                                fetchRecordingDetailsBasedOnFilter(
                                    setRecordingDetails,
                                    roleStr,
                                    search,
                                    setTotalCount,
                                    offset + limit,
                                    limit,
                                    setLoader,
                                    category,
                                );
                            } else {
                                fetchRecordingDetails(
                                    setRecordingDetails,
                                    roleStr,
                                    search,
                                    setTotalCount,
                                    offset + limit,
                                    limit,
                                    setLoader,
                                );
                            }
                        }}
                    >
                        View more
                    </button>
                </div>
            )}
        </div>
    );
};
export default LibraryList;
