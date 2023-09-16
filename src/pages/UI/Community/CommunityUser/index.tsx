import Head from "next/head";
import { Box } from "@mui/material";
import { NextPage } from "next";
import { withLayout } from "../../../../components/Layout/withLayout";
import styles from "../../../../components/Community/Style/communityUser.module.scss";
import Image from "next/image";
import React, { useState, ChangeEvent, useEffect } from "react";
import Search from "../../../../components/Search/Search";
import dynamic from "next/dynamic";
import CakeIcon from "../../../../icons/CakeIcon";
import { AllDummyDataType } from "../../../../components/Community/Type";
import ReadMore from "../../../../components/Community/ReadMore";
import Loader2 from "../../../../components/Loader/Loader2";
import { useUser } from "../../../../components/Authenticate/UserContext";
const Members = dynamic(() => import("../../../../components/Community/Members"), {
    loading: () => <Loader2 />,
});
const CommunityCards = dynamic(() => import("../../../../components/Community/CommunityCards"), {
    loading: () => <Loader2 />,
});

const CommunityUserPage: NextPage = () => {
    const [search, setSearch] = useState<string>("");
    const [showTab, setTab] = useState<string>("community");
    const [data, setData] = useState<AllDummyDataType>({
        dateOfBirth: "",
        community: 0,
        follower: 0,
        following: 0,
        connection: 0,
        specificUserFlower: 0,
    });
    const { user } = useUser();

    useEffect(() => {
        const dummydata = {
            dateOfBirth: "12 feb",
            community: 12,
            follower: 9,
            following: 12,
            connection: 23,
            specificUserFlower: 2.1,
        };
        setData(dummydata);
    }, []);

    // search member by name
    const handleSearchMember = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setSearch(value);
    };

    if (user.email || user.phone_number) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Head>
                    <title>User Community</title>
                    <meta name="description" content="Generated by create next app" />
                    <link
                        rel="icon"
                        href="https://images.prismic.io/loop-web-members/4df527d2-6dfb-4c78-9499-a0facef03af3_looptech.webp?auto=compress,format"
                    />
                </Head>
                {/* Header Section */}
                {/* community user details section */}
                <div className={styles["community-user"]}>
                    <div className={styles["community-user-image-and-details"]}>
                        <div className={styles["community-user-image-and-details-section"]}>
                            <Image
                                src="https://images.prismic.io/loop-web-members/86d0d197-30bb-4242-b0c5-9ded3fa52162_Frame%2B454.webp?auto=compress,format"
                                alt="..."
                                className={styles["community-user-image-and-details-section-image"]}
                                width={250}
                                height={250}
                            />
                            <div className="">
                                <h1 className={styles["community-user-heading"]}>Emily Andersons</h1>
                                <h2 className={styles["community-user-sub-heading"]}>Teacher</h2>
                                <p className={styles["community-user-paragraph"]}>
                                    Intrest
                                    <span>playing guitar, Dance, Drawing...3+</span>
                                </p>
                                <div className={styles["community-user-birthdate"]}>
                                    <CakeIcon></CakeIcon>
                                    <span className={styles["community-user-birthdate-paragraph"]}>
                                        {data.dateOfBirth}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles["community-user-follow-connect"]}>
                            <button className={styles["community-user-follow"]}>Follow</button>
                            <button className={styles["community-user-Connect"]}>Connect</button>
                        </div>
                    </div>
                    <p className={styles["community-user-about-readmore"]}>
                        <ReadMore
                            detail={`   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum
                            interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est,
                            ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc
                            sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis
                            imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla
                            congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. ultrices nec congue eget,
                            auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed
                            ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis.
                            Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed
                            dapibus pulvinar nibh tempor porta.imperdiet sed ornare turpis. Donec vitae dui eget tellus
                            gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor
                            porta. ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
                            Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis
                            imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla
                            congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta.`}
                        ></ReadMore>
                    </p>
                    {/* user related details tab communities,flow,flowing */}
                    <div className={styles["community-user-detail-tabs"]}>
                        <div>
                            <span
                                className={
                                    showTab === "community"
                                        ? styles["community-user-detail-tab-active"]
                                        : styles["community-user-detail-tab"]
                                }
                                onClick={() => setTab("community")}
                            >
                                Communities({data.community})
                            </span>
                            <span
                                className={
                                    showTab === "member"
                                        ? styles["community-user-detail-tab-active"]
                                        : styles["community-user-detail-tab"]
                                }
                                onClick={() => setTab("member")}
                            >
                                Followers({data.follower})
                            </span>
                            <span
                                className={
                                    showTab === "memberflowing"
                                        ? styles["community-user-detail-tab-active"]
                                        : styles["community-user-detail-tab"]
                                }
                                onClick={() => setTab("memberflowing")}
                            >
                                Following({data.following})
                            </span>
                            <span
                                className={
                                    showTab === "memberconnection"
                                        ? styles["community-user-detail-tab-active"]
                                        : styles["community-user-detail-tab"]
                                }
                                onClick={() => setTab("memberconnection")}
                            >
                                Connection({data.connection})
                            </span>
                        </div>
                    </div>
                    <div className={styles["community-user-search-Box"]}>
                        <Search
                            handleSearch={handleSearchMember}
                            value={search}
                            placeholders={
                                showTab === "community" ? "Search Community by name" : "Search Member by name"
                            }
                        />
                    </div>
                    {showTab === "community" && <CommunityCards communityDesginType={"communitycard"} />}
                    {showTab === "member" && <Members memberDesginType={"memberCard"} />}
                    {showTab === "memberflowing" && <Members memberDesginType={"memberCard"} />}
                    {showTab === "memberconnection" && <Members memberDesginType={"memberCard"} />}
                </div>
            </Box>
        );
    }
    return <Loader2 />;
};

export default withLayout(CommunityUserPage);