import React, { useState } from "react";
import styles from "./Style/members.module.scss";
import dynamic from "next/dynamic";
const MemberCard = dynamic(() => import("./MemberCard"));
import { MembersProps } from "./Type";

const Members = ({ memberDesginType }: MembersProps) => {
    const [showComponent, setShowComponent] = useState(false);

    const showMoreComponent = () => {
        if (showComponent) {
            setShowComponent(false);
        } else {
            setShowComponent(true);
        }
    };

    return (
        <div className={styles["member-cards"]}>
            <MemberCard memberDesginType={memberDesginType} />
            <MemberCard memberDesginType={memberDesginType} />
            <MemberCard memberDesginType={memberDesginType} />
            <MemberCard memberDesginType={memberDesginType} />
            <MemberCard memberDesginType={memberDesginType} />
            {showComponent && (
                <div>
                    <MemberCard memberDesginType={memberDesginType} />
                    <MemberCard memberDesginType={memberDesginType} />
                    <MemberCard memberDesginType={memberDesginType} />
                    <MemberCard memberDesginType={memberDesginType} />
                    <MemberCard memberDesginType={memberDesginType} />
                </div>
            )}
            {memberDesginType == "memberCard" && (
                <button className={styles["member-cards-viewMore-button"]} onClick={showMoreComponent}>
                    View More
                </button>
            )}
        </div>
    );
};
export default Members;
