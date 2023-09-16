import React, { useState } from "react";
import styles from "./detailSummary.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface Props {
    Question?: string;
    Answer?: string;
}
// Custom component for expand and collapse.
const DetailSummary = ({ Question, Answer }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className={styles["detailSummary"]}>
            <div className={styles["detailSummary-question"]}>
                <div className={styles["detailSummary-title"]}>{Question}</div>
                <div onClick={() => setOpen(!open)} className={styles["detailSummary-action"]}>
                    {open ? (
                        <KeyboardArrowUpIcon sx={{ height: "45px", width: "45px" }} />
                    ) : (
                        <KeyboardArrowDownIcon sx={{ height: "45px", width: "45px" }} />
                    )}
                </div>
            </div>
            <div className={`${styles["detailSummary-answer"]} ${open ? styles["detailSummary-answerActive"] : ""}`}>
                {Answer}
            </div>
        </div>
    );
};

export default DetailSummary;
