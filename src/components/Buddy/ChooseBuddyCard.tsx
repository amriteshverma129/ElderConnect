import React, { useState } from "react";
import styles from "./Style/chooseBuddyCard.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { ChooseBuddyCardProps } from "./Type";

const ChooseBuddyCard = ({
    email,
    image,
    title,
    availability,
    about,
    id,
    arr,
    handleActiveArr,
    scrollToBottom,
    index,
}: ChooseBuddyCardProps) => {
    const [readMore, setReadMore] = useState(false);
    const router = useRouter();

    const handleBuddyCardClick = () => {
        return router.push({
            pathname: `/UI/Buddy/${email}`,
        });
    };

    return (
        <div className={styles["choose-buddy-card"]}>
            <div className={styles["choose-buddy-card-image"]} onClick={handleBuddyCardClick}>
                {image && image.url && <Image src={image.url} alt={image.url} layout="fill" objectFit="cover" />}
            </div>
            <div className={styles["choose-buddy-card-content"]}>
                <div className={styles["choose-buddy-card-title-btn-holder"]}>
                    <div className={styles["choose-buddy-card-title"]} onClick={handleBuddyCardClick}>
                        Meet Village Buddy {title}
                    </div>
                    <button
                        className={
                            arr[index] ? styles["choose-buddy-card-btn-active"] : styles["choose-buddy-card-btn"]
                        }
                    >
                        <label
                            htmlFor={id}
                            onClick={() => {
                                handleActiveArr(index);
                                scrollToBottom();
                            }}
                        >
                            Select this Buddy
                        </label>
                    </button>
                </div>
                <div>
                    <span className={styles["choose-buddy-card-subHeading"]}>Call availability:</span>
                    <span className={styles["choose-buddy-card-time"]}>{availability}</span>
                </div>
                <div>
                    <span className={styles["choose-buddy-card-subHeading"]}>A little bit about {title}:</span>
                    <p className={styles["choose-buddy-card-para"]}>
                        {readMore
                            ? about !== undefined && <span dangerouslySetInnerHTML={{ __html: about }} />
                            : about?.slice(0, 240) !== undefined && (
                                  <span dangerouslySetInnerHTML={{ __html: about.slice(0, 240) }} />
                              )}
                        {!readMore ? (
                            <span
                                onClick={() => setReadMore(!readMore)}
                                className={styles["choose-buddy-card-readMore"]}
                            >
                                ...&nbsp;<span>Read More</span>
                            </span>
                        ) : (
                            <span
                                onClick={() => setReadMore(!readMore)}
                                className={styles["choose-buddy-card-readMore"]}
                            >
                                ...&nbsp;<span>Show Less</span>
                            </span>
                        )}
                    </p>
                </div>
                <button
                    className={arr[index] ? styles["choose-buddy-card-btn2-active"] : styles["choose-buddy-card-btn2"]}
                >
                    <label htmlFor={id} onClick={() => handleActiveArr(index)}>
                        Select this Buddy
                    </label>
                </button>
            </div>
        </div>
    );
};
export default ChooseBuddyCard;
