import React, { useState } from "react";
import styles from "./Style/communityCards.module.scss";
import dynamic from "next/dynamic";
const CommunityCard = dynamic(() => import("./CommunityCard"));
import { CommunityCardsProps } from "./Type";

const CommunityCards = ({ communityDesginType }: CommunityCardsProps) => {
    const [showcomponent, setComponent] = useState(false);

    const showMoreComponent = () => {
        if (showcomponent) {
            setComponent(false);
        } else {
            setComponent(true);
        }
    };
    return (
        <div className={styles["community-cards"]}>
            <CommunityCard communityDesginType={communityDesginType} />
            <CommunityCard communityDesginType={communityDesginType} />
            <CommunityCard communityDesginType={communityDesginType} />
            <CommunityCard communityDesginType={communityDesginType} />
            <CommunityCard communityDesginType={communityDesginType} />
            {showcomponent && (
                <div>
                    <CommunityCard communityDesginType={communityDesginType} />
                    <CommunityCard communityDesginType={communityDesginType} />
                    <CommunityCard communityDesginType={communityDesginType} />
                    <CommunityCard communityDesginType={communityDesginType} />
                </div>
            )}
            {communityDesginType === "communitycard" && (
                <button className={styles["community-cards-viewMore-button"]} onClick={showMoreComponent}>
                    View More
                </button>
            )}
        </div>
    );
};
export default CommunityCards;
