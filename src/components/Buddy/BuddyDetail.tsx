import React, { useEffect, useState } from "react";
import styles from "./Style/buddyDetail.module.scss";
import Image from "next/image";
import { BuddyDetailProps, nodeType } from "./Type";
import { useMediaQuery } from "react-responsive";

const BuddyDetail = ({ data }: BuddyDetailProps) => {
    const [buddy, setBuddy] = useState<nodeType>({});
    const isMobile = useMediaQuery({ query: `(max-width: 576px)` });

    useEffect(() => {
        data.allBuddys.edges && data.allBuddys.edges[0] && setBuddy(data.allBuddys.edges[0].node);
    }, [data]);

    return (
        <div className="layout-container-fluid">
            <div className={styles["buddy-detail"]}>
                <div className={styles["buddy-detail-heading"]}>About {buddy?.name}</div>
                <div className={styles["buddy-detail-img-content-holder"]}>
                    <div className={styles["buddy-detail-img"]}>
                        {buddy.image && buddy.image.url && (
                            <Image src={buddy.image.url} alt={buddy.image.url} layout="fill" objectFit="cover" />
                        )}
                    </div>
                    <div className={styles["buddy-detail-content"]}>
                        <div className={styles["buddy-detail-para"]}>
                            {buddy.about !== undefined && <div dangerouslySetInnerHTML={{ __html: buddy.about }} />}
                        </div>
                        {buddy.aWordFromBuddy && (
                            <>
                                <div className={styles["buddy-detail-title"]}>A word from {buddy?.name}</div>
                                <div className={styles["buddy-detail-para"]}>{buddy.aWordFromBuddy}</div>
                            </>
                        )}
                        {buddy.favouriteColor && (
                            <>
                                <div className={styles["buddy-detail-title"]}>Favorite Color</div>
                                <div className={styles["buddy-detail-para"]}>{buddy.favouriteColor}</div>
                            </>
                        )}
                        {buddy.familyBackground && (
                            <div>
                                <div className={styles["buddy-detail-title"]}>Family situation</div>
                                <div className={styles["buddy-detail-para"]}>{buddy.familyBackground}</div>
                            </div>
                        )}
                        {buddy.background && (
                            <div>
                                <div className={styles["buddy-detail-title"]}>{buddy.name}&apos;s Background</div>
                                <div className={styles["buddy-detail-para"]}>{buddy.background}</div>
                            </div>
                        )}
                        {buddy.likes && (
                            <div>
                                <div className={styles["buddy-detail-title"]}>Likes</div>
                                <div className={styles["buddy-detail-para"]}>{buddy.likes}</div>
                            </div>
                        )}
                        {buddy.dislikes && (
                            <div>
                                <div className={styles["buddy-detail-title"]}>Dislikes</div>
                                <div className={styles["buddy-detail-para"]}>{buddy.dislikes}</div>
                            </div>
                        )}
                        {buddy.hobbies && (
                            <div>
                                <div className={styles["buddy-detail-title"]}>Hobbies</div>
                                <div className={styles["buddy-detail-para"]}>{buddy.hobbies}</div>
                            </div>
                        )}
                        {buddy.use && (
                            <div>
                                <div className={styles["buddy-detail-title"]}>I use</div>
                                <div className={styles["buddy-detail-para"]}>{buddy.use}</div>
                            </div>
                        )}
                        {buddy.personality && (
                            <div>
                                <div className={styles["buddy-detail-title"]}>Personality</div>
                                <div className={styles["buddy-detail-para"]}>{buddy.personality}</div>
                            </div>
                        )}
                        {buddy.callAvailability && (
                            <div>
                                <div className={styles["buddy-detail-title"]}>Reminder about Call availability</div>
                                <div className={styles["buddy-detail-para"]}>{buddy.callAvailability}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles["buddy-detail-contact-box"]}>
                    <div className={styles["buddy-detail-contact-info"]}>
                        Want to connect with me ?<br />
                        Please email me at
                    </div>
                    {isMobile ? (
                        <button
                            className={styles["buddy-detail-contact-btn"]}
                            onClick={() => {
                                window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${buddy.email}`;
                            }}
                        >
                            Send Email
                        </button>
                    ) : (
                        <button
                            className={styles["buddy-detail-contact-btn"]}
                            onClick={() => {
                                window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${buddy.email}`;
                            }}
                        >
                            {buddy.email}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default BuddyDetail;
