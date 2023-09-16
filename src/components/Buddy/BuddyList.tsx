import React from "react";
import styles from "./Style/buddyList.module.scss";
import dynamic from "next/dynamic";
const BuddyCard = dynamic(() => import("./BuddyCard"));
import { BuddyListProps } from "./Type";

const BuddyList = ({ data }: BuddyListProps) => {
    return (
        <div className={styles["buddy-list"]}>
            {data.allBuddys.edges !== undefined &&
                data.allBuddys.edges.map((buddy, index) => {
                    const node = buddy && buddy.node;
                    return (
                        node && (
                            <BuddyCard
                                email={node.email}
                                image={node.image}
                                title={node.name}
                                availability={node.callAvailability}
                                about={node.about}
                                key={index}
                            />
                        )
                    );
                })}
        </div>
    );
};
export default BuddyList;
