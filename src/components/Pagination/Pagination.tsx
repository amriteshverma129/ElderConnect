import React, { Dispatch, SetStateAction } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./pagination.module.scss";

interface Props {
    pageNo: number;
    pageSize: number;
    totalPageCount: number;
    setPageNo: Dispatch<SetStateAction<number>>;
    setPageFirstIndex: Dispatch<SetStateAction<number>>;
    setPageSecondIndex: Dispatch<SetStateAction<number>>;
}

const Pagination: React.FunctionComponent<Props> = (props) => {
    return (
        <div className={styles["pagination"]}>
            <button
                className={styles["pagination-left-arrow"]}
                disabled={props.pageNo === 0}
                onClick={() => {
                    props.setPageNo(props.pageNo - 1);
                    props.setPageFirstIndex((props.pageNo - 1) * props.pageSize);
                    props.setPageSecondIndex((props.pageNo - 1) * props.pageSize + props.pageSize);
                }}
                aria-label="pagination-left-arrow"
            >
                <ArrowBackIcon />
            </button>
            <button
                className={styles["pagination-right-arrow"]}
                disabled={props.pageNo === props.totalPageCount - 1 || props.totalPageCount === props.pageNo}
                onClick={() => {
                    props.setPageNo(props.pageNo + 1);
                    props.setPageFirstIndex((props.pageNo + 1) * props.pageSize);
                    props.setPageSecondIndex((props.pageNo + 1) * props.pageSize + props.pageSize);
                }}
                aria-label="pagination-right-arrow"
            >
                <ArrowForwardIcon />
            </button>
        </div>
    );
};

export default Pagination;
