import Head from "next/head";
import { withLayout } from "../../../components/Layout/withLayout";
import { Box } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import styles from "../../../components/Account/Style/accountDetail.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Communities from "../../../components/Account/Communities";
import Followers from "../../../components/Account/Followers";
import Following from "../../../components/Account/Following";
import Connections from "../../../components/Account/Connections";
import BlockedUser from "../../../components/Account/BlockedUser";
import { ssrGetAllEventDetail, ssrGetAllPurchaseMembership } from "../../../generated/page";
import { AccountDetailPageProps } from "../../../components/Account/Type";
import { useUser } from "../../../components/Authenticate/UserContext";
import Loader2 from "../../../components/Loader/Loader2";
import dynamic from "next/dynamic";
import ChangePasswordSkeleton from "../../../components/Account/ChangePasswordSkeleton";
import Skeleton from "@mui/material/Skeleton";
const ChangePassword = dynamic(() => import("../../../components/Account/ChangePassword"), {
    loading: () => <ChangePasswordSkeleton />,
});
import ProfileSkeleton from "../../../components/Account/ProfileSkeleton";
const Profile = dynamic(() => import("../../../components/Account/Profile"), {
    loading: () => <ProfileSkeleton />,
});
import { PurchaseSkeleton } from "../../../components/Account/PurchaseSkeleton";
import { NotificationsSkeleton } from "../../../components/Account/NotificationsSkeleton";
import { SettingsSkeleton } from "../../../components/Account/SettingsSkeleton";
const Purchase = dynamic(() => import("../../../components/Account/Purchase"), {
    loading: () => <PurchaseSkeleton />,
});

const Notifications = dynamic(() => import("../../../components/Account/Notifications"), {
    loading: () => <NotificationsSkeleton />,
});
const Settings = dynamic(() => import("../../../components/Account/Settings"), {
    loading: () => <SettingsSkeleton />,
});

const accountArr = [
    {
        id: 1,
        title: "Profile",
        pathname: `/UI/Account/Profile`,
    },
    {
        id: 2,
        title: "Membership",
        pathname: `/UI/Account/Purchase Membership`,
    },
    {
        id: 3,
        title: "Change Password",
        pathname: `/UI/Account/Change Password`,
    },
    {
        id: 4,
        title: "Notifications",
        pathname: `/UI/Account/Notifications`,
    },
    {
        id: 5,
        title: "Settings",
        pathname: `/UI/Account/Settings`,
    },
    // {
    //     id: 6,
    //     title: "Communities(24)",
    //     pathname: `/UI/Account/Communities`,
    // },
    // {
    //     id: 7,
    //     title: "Followers(35)",
    //     pathname: `/UI/Account/Followers`,
    // },
    // {
    //     id: 8,
    //     title: "Following(56)",
    //     pathname: `/UI/Account/Following`,
    // },
    // {
    //     id: 9,
    //     title: "Connections(45)",
    //     pathname: `/UI/Account/Connections`,
    // },
    // {
    //     id: 10,
    //     title: "Blocked users(5)",
    //     pathname: `/UI/Account/Blocked User`,
    // },
];

const AccountDetailPage: NextPage<AccountDetailPageProps> = ({ allEventdetailpages, allPurchaseMemberships }) => {
    //There are total 10 tabs : Profile, Notifications, Settings, PurchaseMembership,Communities ,Follower,Following,Connections,BlockedUser;
    const [tab, setTab] = useState<string | string[] | undefined>("Profile");
    const router = useRouter();
    const { user, userDetails, countTodaysNotification } = useUser();
    const [newList, setNewList] = useState<Array<{ id: number; title: string; pathname: string }>>([]);

    useEffect(() => {
        setTab(router.query.account_Card);
    }, [router.query.account_Card]);

    useEffect(() => {
        setNewList([]);
        if (userDetails.contactId) {
            const newAccountArrList = accountArr.filter((accountCard) => {
                if (accountCard.title === "Change Password" && !user.email) return false;
                else if (
                    accountCard.title === "Membership" &&
                    userDetails.roles
                        ?.split(",")
                        .some(
                            (role) =>
                                role?.trim() === "The Loop Spectrum Role" ||
                                role?.trim() === "The Loop One Generation Role" ||
                                role?.trim() === "The Loop USC Role",
                        )
                )
                    return false;
                return true;
            });
            setNewList(newAccountArrList);
        }
    }, [userDetails]);

    const newSkeletonArr = new Array(5).fill(0);

    if (user.email || user.phone_number) {
        return (
            <Box sx={{ flexGrow: 1 }} className="layout-container-fluid">
                <Head>
                    <title>{tab}</title>
                    <meta name="description" content="Generated by create next app" />
                    <link
                        rel="icon"
                        href="https://images.prismic.io/loop-web-members/4df527d2-6dfb-4c78-9499-a0facef03af3_looptech.webp?auto=compress,format"
                    />
                </Head>
                <h5 className={styles["account-detail-heading"]}>
                    <span
                        onClick={() => {
                            router.push({
                                pathname: `/UI/Account`,
                            });
                        }}
                    >
                        <span className={styles["heading-left-arrow"]}></span>
                        <span style={{ cursor: "pointer" }}> My Account</span>
                    </span>
                    &nbsp;&nbsp;/&nbsp; {tab}
                </h5>

                <div className={styles["account-detail"]}>
                    <div className={styles["account-detail-tabs"]}>
                        {newList.length !== 0 &&
                            newList.map((accountCard) => {
                                return (
                                    <div
                                        onClick={() => {
                                            router.push({
                                                pathname: accountCard.pathname,
                                            });
                                        }}
                                        className={
                                            tab === accountCard.title
                                                ? styles["account-detail-active-tab"]
                                                : styles["account-detail-tab"]
                                        }
                                        key={accountCard.id}
                                    >
                                        {accountCard.title}
                                        {accountCard.title === "Notifications" && (
                                            <span>&nbsp;({countTodaysNotification})</span>
                                        )}
                                    </div>
                                );
                            })}
                        {newList.length === 0 &&
                            newSkeletonArr.map((index) => {
                                return (
                                    <div className={styles["account-detail-tab"]} key={index}>
                                        {" "}
                                        <Skeleton variant="text" sx={{ fontSize: "40px", width: "200px" }} />
                                    </div>
                                );
                            })}
                    </div>
                    <div>
                        {tab === "Profile" && <Profile />}
                        {tab === "Notifications" &&
                            (userDetails.contactId ? (
                                <Notifications data={allEventdetailpages} />
                            ) : (
                                <NotificationsSkeleton />
                            ))}
                        {tab === "Settings" && <Settings />}
                        {tab === "Purchase Membership" && allPurchaseMemberships?.edges?.length && (
                            <Purchase slices={allPurchaseMemberships.edges[0]?.node.slices} />
                        )}
                        {tab === "Communities" && <Communities />}
                        {tab === "Followers" && <Followers />}
                        {tab === "Following" && <Following />}
                        {tab === "Connections" && <Connections />}
                        {tab === "Blocked User" && <BlockedUser />}
                        {tab === "Change Password" && <ChangePassword fullWidth={false} />}
                    </div>
                </div>
            </Box>
        );
    }
    return <Loader2 />;
};

export default withLayout(AccountDetailPage);

export const getStaticProps: GetStaticProps = async (params) => {
    let serverSideProps;
    if (params?.params?.account_Card === "Purchase Membership") {
        serverSideProps = await ssrGetAllPurchaseMembership.getServerPage(
            {
                variables: {},
            },
            {},
        );
    } else if (params?.params?.account_Card === "Notifications") {
        serverSideProps = await ssrGetAllEventDetail.getServerPage(
            {
                variables: {},
            },
            {},
        );
    }
    return {
        props: {
            ...serverSideProps?.props.data,
        },
        revalidate: 10,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const dynamicPaths = ["Purchase Membership", "Profile", "Change Password", "Notifications"];
    return {
        paths: dynamicPaths.map((accountCard) => ({
            params: { account_Card: accountCard },
        })),
        fallback: true,
    };
};
