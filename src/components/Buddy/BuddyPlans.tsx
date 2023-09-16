import React from "react";
import styles from "./Style/buddyPlans.module.scss";
import { useRouter } from "next/router";
import { BuddyListProps } from "./Type";

const BuddyPlans = ({ data }: BuddyListProps) => {
    const router = useRouter();
    return (
        <div className={styles["buddyPlans-card-holder"]}>
            {data.allPurchaseMemberships.edges &&
                data.allPurchaseMemberships.edges.length &&
                data.allPurchaseMemberships.edges[0] &&
                data.allPurchaseMemberships.edges[0].node &&
                data.allPurchaseMemberships.edges[0].node.slices?.map((plan, index) => {
                    if (plan.variation?.primary?.type && plan.variation?.primary?.type === "buddy") {
                        return (
                            <div className={styles["buddyPlans-card"]} key={index}>
                                <div className={styles["buddyPlans-card-title"]}>{plan.variation?.primary?.title}</div>
                                <div className={styles["buddyPlans-card-para"]}>
                                    {plan.variation?.primary?.description}
                                </div>
                                <div className={styles["buddyPlans-card-price"]}>
                                    $ {plan.variation?.primary?.price}
                                    <span className={styles["buddyPlans-card-time"]}>
                                        / {plan.variation?.primary?.term}
                                    </span>
                                </div>
                                {plan.variation?.primary?.profit && (
                                    <span className={styles["buddyPlans-card-message"]}>
                                        You save ${plan.variation?.primary?.profit}
                                    </span>
                                )}
                                <a className={styles["buddyPlans-card-btn"]}>
                                    <button
                                        onClick={() =>
                                            router.push({
                                                pathname: `/UI/Account/Plan`,
                                                query: {
                                                    link: plan.variation?.primary?.link,
                                                    plan: plan.variation?.primary?.title,
                                                },
                                            })
                                        }
                                    >
                                        Buy now
                                    </button>
                                </a>
                            </div>
                        );
                    }
                })}
        </div>
    );
};
export default BuddyPlans;
