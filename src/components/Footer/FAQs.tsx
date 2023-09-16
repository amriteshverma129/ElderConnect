import React, { useState } from "react";
import styles from "./Style/faqs.module.scss";
import dynamic from "next/dynamic";
import { GetAllFaQsQuery } from "../../generated/graphql";
import { DetailSummarySkeleton } from "../DetailSummary/DetailSummarySkeleton";
const DetailSummary = dynamic(() => import("../DetailSummary/DetailSummary"), {
    loading: () => <DetailSummarySkeleton />,
});

interface Props {
    data?: GetAllFaQsQuery["allFaqs"];
}
const FAQs = ({ data }: Props) => {
    const [feed, setFeed] = useState<string>("FAQs Classes & Events");
    return (
        <div className="layout-container-fluid">
            <div className={styles["FAQs"]}>
                <div className={styles["FAQs-heading"]}>Member Portal Questions</div>
                <div className={styles["FAQs-tabs"]}>
                    <div>
                        <span
                            className={styles["FAQs-tab"]}
                            style={{
                                backgroundColor: feed === "FAQs Classes & Events" ? "#142C60" : "white",
                                color: feed === "FAQs Classes & Events" ? "white" : "#142C60",
                            }}
                            onClick={() => setFeed("FAQs Classes & Events")}
                        >
                            FAQ Classes & Events
                        </span>
                        <span
                            className={styles["FAQs-tab"]}
                            style={{
                                backgroundColor: feed === "FAQs Village Buddies" ? "#142C60" : "white",
                                color: feed === "FAQs Village Buddies" ? "white" : "#142C60",
                            }}
                            onClick={() => setFeed("FAQs Village Buddies")}
                        >
                            FAQ Village Buddies
                        </span>
                    </div>
                </div>
                <div className={styles["FAQs-holders"]}>
                    {feed === "FAQs Classes & Events" && (
                        <div>
                            {data?.edges?.length &&
                                data.edges[0]?.node.slices?.length &&
                                data.edges[0]?.node.slices[0]?.variation?.items?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <DetailSummary Question={item.question} Answer={item.answer} />
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                    {feed === "FAQs Village Buddies" && (
                        <div>
                            {data?.edges?.length &&
                                data.edges[0]?.node.slices?.length &&
                                data.edges[0]?.node.slices[1]?.variation?.items?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <DetailSummary Question={item.question} Answer={item.answer} />
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default FAQs;
