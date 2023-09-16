import React from "react";
import styles from "./Style/termOfUse.module.scss";
import Skeleton from "@mui/material/Skeleton";

const RenderSkeletons = (count: number, width?: string) => {
    return Array(count)
        .fill(null)
        .map((_, i) => <Skeleton variant="text" sx={width ? { width } : undefined} key={i} />);
};

export const TermOfUseSkeleton = () => {
    return (
        <div className="layout-container-fluid">
            <div className={styles["termOfUse-skeleton"]}>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "40%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(3)}
                    {RenderSkeletons(1, "80%")}
                    <br />
                    <br />
                    {RenderSkeletons(4)}
                    {RenderSkeletons(1, "60%")}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(4)}
                    <br />
                    <br />
                    {RenderSkeletons(5)}
                    {RenderSkeletons(1, "60%")}
                </div>

                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "40%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(6)}
                    {RenderSkeletons(1, "60%")}
                    <br />
                    <br />
                    {RenderSkeletons(4)}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(5)}
                    {RenderSkeletons(1, "90%")}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "40%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(4)}
                    {RenderSkeletons(1, "60%")}
                    <br />
                    <br />
                    {RenderSkeletons(4)}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>{RenderSkeletons(7)}</div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "30%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(1)}
                    <br />
                    <br />
                    <ul>
                        {RenderSkeletons(1, "28%")}
                        {RenderSkeletons(1, "65%")}
                        {RenderSkeletons(2, "90%")}
                        {RenderSkeletons(1)}
                        {RenderSkeletons(1, "45%")}
                        {RenderSkeletons(1, "40%")}
                        {RenderSkeletons(1)}
                        {RenderSkeletons(1, "62%")}
                        {RenderSkeletons(1, "50%")}
                        {RenderSkeletons(1, "45%")}
                        {RenderSkeletons(1)}
                        {RenderSkeletons(1, "90%")}
                    </ul>
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(4)}
                    {RenderSkeletons(1, "90%")}
                    <br />
                    <br />
                    {RenderSkeletons(5)}
                    {RenderSkeletons(1, "30%")}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "40%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(4)}
                    {RenderSkeletons(1, "40%")}
                    <br />
                    <br />
                    {RenderSkeletons(4)}
                    {RenderSkeletons(1, "65%")}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(5)}
                    {RenderSkeletons(1, "50%")}
                    <br />
                    <br />
                    {RenderSkeletons(4)}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "30%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(3)}
                    {RenderSkeletons(1, "80%")}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "25%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(5)}
                    {RenderSkeletons(1, "20%")}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "35%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    <Skeleton variant="text" />
                    {RenderSkeletons(5)}
                    {RenderSkeletons(1, "50%")}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "20%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(3)}
                    {RenderSkeletons(1, "70%")}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(2)}
                    {RenderSkeletons(1, "70%")}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(2)}
                    {RenderSkeletons(1, "30%")}
                </div>
                <div className={styles["termOfUse-heading-skeleton"]}>{RenderSkeletons(1, "30%")}</div>
                <div className={styles["termOfUse-para-skeleton"]}>
                    {RenderSkeletons(1)}
                    {RenderSkeletons(1, "40%")}
                </div>
            </div>
        </div>
    );
};
