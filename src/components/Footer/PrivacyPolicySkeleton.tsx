import React from "react";
import styles from "./Style/privacyPolicy.module.scss";
import Skeleton from "@mui/material/Skeleton";

const RenderSkeletons = (count: number, width?: string) => {
    return Array(count)
        .fill(null)
        .map((_, i) => <Skeleton variant="text" sx={width ? { width } : undefined} key={i} />);
};

export const PrivacyPolicySkeleton = () => {
    return (
        <div className="layout-container-fluid">
            <div className={styles["privacyPolicy-skeleton"]}>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "30%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(3)}
                    {RenderSkeletons(1, "35%")}
                    <br />
                    <br />
                    {RenderSkeletons(3)}
                    {RenderSkeletons(1, "20%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(3)}
                    {RenderSkeletons(1, "85%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(4)}
                    <br />
                    <br />
                    <ul>
                        {RenderSkeletons(2, "42%")}
                        {RenderSkeletons(1, "45%")}
                    </ul>
                    {RenderSkeletons(3)}
                    {RenderSkeletons(1, "50%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "55%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(2)}
                    {RenderSkeletons(1, "75%")}
                    <br />
                    <br />
                    <ul>
                        {RenderSkeletons(1, "45%")}
                        {RenderSkeletons(1, "33%")}
                        {RenderSkeletons(1, "36%")}
                        {RenderSkeletons(1, "39%")}
                        {RenderSkeletons(1, "42%")}
                        {RenderSkeletons(1, "50%")}
                        {RenderSkeletons(1, "47%")}
                        {RenderSkeletons(1, "30%")}
                        {RenderSkeletons(1, "33%")}
                        {RenderSkeletons(1, "36%")}
                        {RenderSkeletons(1, "48%")}
                        {RenderSkeletons(1, "46%")}
                        {RenderSkeletons(1, "48%")}
                        {RenderSkeletons(1, "47%")}
                    </ul>
                    {RenderSkeletons(1)}
                    {RenderSkeletons(1, "25%")}
                    <br />
                    <br />
                    <ul>
                        {RenderSkeletons(1)}
                        {RenderSkeletons(1, "60%")}

                        {RenderSkeletons(1)}
                        {RenderSkeletons(1, "15%")}
                        {RenderSkeletons(1, "55%")}
                        {RenderSkeletons(1, "90%")}
                        {RenderSkeletons(1, "70%")}
                    </ul>
                    {RenderSkeletons(3)}
                    {RenderSkeletons(1, "45%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "40%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(2)}
                    {RenderSkeletons(1, "55%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(3)}
                    <br />
                    <br />
                    {RenderSkeletons(4)}
                    {RenderSkeletons(1, "50%")}
                    <br />
                    <br />
                    {RenderSkeletons(2)}
                    {RenderSkeletons(1, "45%")}
                    <br />
                    <br />
                    {RenderSkeletons(1)}
                    {RenderSkeletons(1, "65%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(4)}
                    {RenderSkeletons(1, "65%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(4)}
                    {RenderSkeletons(1, "60%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "40%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(1)}
                    <br />
                    <br />
                    <ul>
                        {RenderSkeletons(3)}
                        {RenderSkeletons(1, "45%")}
                        {RenderSkeletons(1, "70%")}
                        {RenderSkeletons(1, "80%")}
                        {RenderSkeletons(3)}
                        {RenderSkeletons(1, "25%")}
                    </ul>
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(2)}
                    {RenderSkeletons(1, "30%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(3)}
                    {RenderSkeletons(1, "35%")}
                    <br />
                    <br />
                    <ul>
                        {RenderSkeletons(2)}
                        {RenderSkeletons(1, "70%")}
                        {RenderSkeletons(1)}
                        {RenderSkeletons(1, "65%")}
                        {RenderSkeletons(1)}
                        {RenderSkeletons(1, "50%")}
                        {RenderSkeletons(3)}
                        {RenderSkeletons(1, "80%")}
                    </ul>
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "40%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(5)}
                    {RenderSkeletons(1, "55%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "40%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(5)}
                    {RenderSkeletons(1, "30%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "35%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>{RenderSkeletons(6)}</div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "25%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(2)}
                    {RenderSkeletons(1, "60%")}
                    <br />
                    <br />
                    {RenderSkeletons(2)}
                    {RenderSkeletons(1, "60%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "35%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>{RenderSkeletons(5)}</div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "30%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(3)}
                    {RenderSkeletons(1, "70%")}
                    <br />
                    <br />
                    {RenderSkeletons(3)}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "40%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(2)}
                    {RenderSkeletons(1, "80%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "36%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(4)}
                    <br />
                    <br />
                    <ul>
                        {RenderSkeletons(1, "60%")}
                        {RenderSkeletons(1)}
                        {RenderSkeletons(1, "30%")}
                        {RenderSkeletons(1, "80%")}
                    </ul>
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "25%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(5)}
                    {RenderSkeletons(1, "60%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "45%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(6)}
                    {RenderSkeletons(1, "80%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "40%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(2)}
                    {RenderSkeletons(1, "30%")}
                </div>
                <div className={styles["privacyPolicy-heading-skeleton"]}>{RenderSkeletons(1, "30%")}</div>
                <div className={styles["privacyPolicy-para-skeleton"]}>
                    {RenderSkeletons(1)}
                    {RenderSkeletons(1, "60%")}
                    {RenderSkeletons(1, "40%")}
                </div>
            </div>
        </div>
    );
};
