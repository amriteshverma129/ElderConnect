import React, { useState } from "react";
import styles from "./Style/buddyCard.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { BuddyCardProps } from "./Type";

const BuddyCard = ({ email, image, title, availability, about }: BuddyCardProps) => {
    const [readMore, setReadMore] = useState(false);
    const router = useRouter();

    const handleBuddyCardClick = () => {
        return router.push({
            pathname: `/UI/Buddy/${email}`,
        });
    };

    return (
        <div className={styles["buddy-card"]}>
            <div className={styles["buddy-card-image"]} onClick={handleBuddyCardClick}>
                {image && image.url && <Image src={image.url} alt={image.url} layout="fill" objectFit="cover" />}
            </div>
            <div className={styles["buddy-card-content"]}>
                <div className={styles["buddy-card-title"]} onClick={handleBuddyCardClick}>
                    Meet Village Buddy {title}
                </div>
                <div>
                    <span className={styles["buddy-card-subHeading"]}>Call availability:</span>
                    <span className={styles["buddy-card-time"]}>{availability}</span>
                </div>
                <div>
                    <span className={styles["buddy-card-subHeading"]}>A little bit about {title}:</span>
                    <p className={styles["buddy-card-para"]}>
                        {readMore
                            ? about !== undefined && <div dangerouslySetInnerHTML={{ __html: about }} />
                            : about?.slice(0, 80)}
                        {!readMore ? (
                            <span onClick={() => setReadMore(!readMore)} className={styles["buddy-card-readMore"]}>
                                ...&nbsp;<span>Read More</span>
                            </span>
                        ) : (
                            <span onClick={() => setReadMore(!readMore)} className={styles["buddy-card-readMore"]}>
                                ...&nbsp;<span>Show Less</span>
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default BuddyCard;
