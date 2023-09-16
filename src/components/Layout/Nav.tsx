import React, { useEffect, useState } from "react";
import Link from "next/link";
import Hamburger from "../Hamburger/Hamburger";
import styles from "./Style/navbar.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import BellIcon from "../../icons/BellIcon";
import { useUser } from "../Authenticate/UserContext";

export default function Nav() {
    const router = useRouter();
    const [tab, setTab] = useState("");
    const { userDetails, countTodaysNotification } = useUser();

    useEffect(() => {
        if (router.pathname.includes("/UI/Events")) {
            setTab("Events");
        } else if (router.pathname.includes("/UI/Library")) {
            setTab("Library");
        } else if (router.pathname.includes("/UI/Account")) {
            setTab("Account");
        } else if (router.pathname.includes("/UI/Buddy")) {
            setTab("Buddy");
        }
    }, [router.pathname]);

    return (
        <div className={styles["navbar-outerBox"]}>
            <div className={styles["navbar"]}>
                {userDetails.roles
                    ?.split(",")
                    .some(
                        (role) =>
                            role?.trim() === "The Loop Spectrum Role" ||
                            role?.trim() === "The Loop One Generation Role" ||
                            role?.trim() === "The Loop USC Role",
                    ) ? (
                    <div className={styles["navbar-brand"]}>
                        <div className={styles["navbar-brand-loop-image"]}>
                            <Link href="/UI/Events/" passHref>
                                <Image
                                    src="https://images.prismic.io/loop-web-members/4df527d2-6dfb-4c78-9499-a0facef03af3_looptech.webp?auto=compress,format"
                                    alt="logo"
                                    layout="fill"
                                    objectFit="cover"
                                    loading="lazy"
                                ></Image>
                            </Link>
                        </div>
                        <span
                            style={{
                                height: "45px",
                                width: "3px",
                                backgroundColor: "#d3d3d3",
                                display: "inline-block",
                                margin: "auto 10px",
                            }}
                        ></span>
                        <div className={styles["navbar-brand-partner-image"]}>
                            {userDetails && userDetails.roles?.includes("The Loop Spectrum Role") && (
                                <Link href="/UI/Events/" passHref>
                                    <Image
                                        src="https://images.prismic.io/loop-web-members/485c0c9f-a026-45ae-ae14-222691b71354_MicrosoftTeams-image.png?auto=compress,format"
                                        alt="Spectrum Image"
                                        layout="fill"
                                        objectFit="contain"
                                        loading="lazy"
                                    />
                                </Link>
                            )}
                            {userDetails && userDetails.roles?.includes("The Loop One Generation Role") && (
                                <Link href="/UI/Events/" passHref>
                                    <Image
                                        src="https://images.prismic.io/loop-web-members/c401ed9c-3122-4fd5-bf85-1c977f7f19af_Screenshot+2023-07-05+160748.png?auto=compress,format"
                                        alt="One Generation Image"
                                        layout="fill"
                                        objectFit="contain"
                                        loading="lazy"
                                    />
                                </Link>
                            )}
                            {userDetails && userDetails.roles?.includes("The Loop USC Role") && (
                                <Link href="/UI/Events/" passHref>
                                    <Image
                                        src="https://images.prismic.io/loop-web-members/e51b3166-f084-4e82-b375-27375c926b23_download-1.webp?auto=compress,format"
                                        alt="USC Image"
                                        layout="fill"
                                        objectFit="contain"
                                        loading="lazy"
                                    />
                                </Link>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={styles["navbar-brand"]}>
                        <div className={styles["navbar-brand-loop-image"]}>
                            <Link href="/UI/Events/" passHref>
                                <Image
                                    src="https://images.prismic.io/loop-web-members/4df527d2-6dfb-4c78-9499-a0facef03af3_looptech.webp?auto=compress,format"
                                    alt="logo"
                                    layout="fill"
                                    objectFit="cover"
                                    loading="lazy"
                                ></Image>
                            </Link>
                        </div>
                        {/* <div className={styles["navbar-brand-title"]}>
                            <Link href="/UI/Events/" passHref>
                                LOOP Village
                            </Link>
                        </div> */}
                    </div>
                )}
                <div className={styles["navbar-link-holder"]}>
                    <Link href="/UI/Events/" passHref>
                        <h6
                            className={tab === "Events" ? styles["navbar-link-active"] : styles["navbar-link"]}
                            style={{}}
                        >
                            Events
                        </h6>
                    </Link>
                    {/* <Link href="/UI/Community/" passHref>
                        <h6 className={styles["navbar-link"]} style={{}}>
                            Community
                        </h6>
                    </Link> */}
                    {/* <Link href="/UI/Buddy/" passHref>
                        <h6
                            className={tab === "Buddy" ? styles["navbar-link-active"] : styles["navbar-link"]}
                            style={{}}
                        >
                            My Buddy
                        </h6>
                    </Link> */}
                    <Link href="/UI/Library/" passHref>
                        <h6
                            className={tab === "Library" ? styles["navbar-link-active"] : styles["navbar-link"]}
                            style={{}}
                        >
                            Library
                        </h6>
                    </Link>
                    <Link href="/UI/Account/" passHref>
                        <h6
                            className={tab === "Account" ? styles["navbar-link-active"] : styles["navbar-link"]}
                            style={{}}
                        >
                            Account
                        </h6>
                    </Link>
                </div>
                <Hamburger />
                <Link href="/UI/Account/Notifications" passHref>
                    <div className={styles["navbar-notification"]}>
                        <BellIcon />
                        {countTodaysNotification !== 0 && <span></span>}
                    </div>
                </Link>
            </div>
        </div>
    );
}
