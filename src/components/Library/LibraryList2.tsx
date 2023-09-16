import React, { useState, useEffect } from "react";
import styles from "./Style/libraryList.module.scss";
import dynamic from "next/dynamic";
const LibraryCards2 = dynamic(() => import("./LibraryCards2"), {
    loading: () => <LibraryList2Skeleton />,
});
import Pagination from "../../components/Pagination/Pagination";
import { useMediaQuery } from "react-responsive";
import { LibraryList2Props, recordingType } from "./Type";
import { handleResize } from "../../Functions/functions";
import { nodeType } from "../Event/Type";
import { fetchRecordingDetailsBasedOnFilter } from "../../Functions/Library/function";
import { LibraryList2Skeleton } from "./LibraryList2Skeleton";
import { useUser } from "../Authenticate/UserContext";

const LibraryList2 = ({ category }: LibraryList2Props) => {
    const { userDetails } = useUser();
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    const isTablet = useMediaQuery({ query: `(max-width: 1024px` });
    let noOfCounts = 6;
    if (isTablet === true && isMobile === false) {
        noOfCounts = 2;
    } else if (isTablet === true && isMobile === true) {
        noOfCounts = 1;
    }
    const [displayedCards, setDisplayedCards] = useState<number>(noOfCounts);
    const [recordingList, setRecordingList] = useState<Array<recordingType> | []>([]);
    // const [recordingDetails, setRecordingDetails] = useState<Array<recordingType> | []>([]);
    const [map, setMap] = useState(new Map());
    const [loader, setLoader] = useState<boolean>(true);
    const [pageNo, setPageNo] = useState<number>(0);
    const [pageFirstIndex, setPageFirstIndex] = useState<number>(0);
    const [pageSecondIndex, setPageSecondIndex] = useState<number>(displayedCards);
    const [totalPageCount, setTotalPageCount] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [roleStr, setRoleStr] = useState<string>("");

    //Below useEffect will be trigged when any state changes
    useEffect(() => {
        window.addEventListener("resize", () =>
            handleResize(setDisplayedCards, setPageSecondIndex, setPageFirstIndex, setPageNo, 2, 6),
        );
    });

    useEffect(() => {
        const prismicContentStr = localStorage.getItem("prismicContent");
        const prismicContent = prismicContentStr && JSON.parse(prismicContentStr);
        const map2: Map<number, nodeType> = new Map(prismicContent);
        setMap(map2);
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
    }, [userDetails]);

    useEffect(() => {
        if (category && category !== "" && roleStr) {
            setLoader(true);
            setRecordingList([]);
            fetchRecordingDetailsBasedOnFilter(
                setRecordingList,
                roleStr,
                "",
                setTotalCount,
                pageNo * displayedCards,
                displayedCards,
                setLoader,
                category,
            );
        }
    }, [category, roleStr, pageNo, displayedCards]);

    useEffect(() => {
        setTotalPageCount(Math.ceil(totalCount / displayedCards));
    }, [totalCount]);

    console.log(pageFirstIndex, pageSecondIndex);
    return (
        <div>
            {recordingList.length !== 0 && <LibraryCards2 recordings={recordingList} prismicMapList={map} />}
            {!loader && recordingList.length === 0 && (
                <div className={styles["library-list-message-box"]}>No Related Videos</div>
            )}
            {loader && <LibraryList2Skeleton />}
            <Pagination
                pageNo={pageNo}
                pageSize={displayedCards}
                totalPageCount={totalPageCount}
                setPageNo={setPageNo}
                setPageFirstIndex={setPageFirstIndex}
                setPageSecondIndex={setPageSecondIndex}
            />
        </div>
    );
};
export default LibraryList2;
