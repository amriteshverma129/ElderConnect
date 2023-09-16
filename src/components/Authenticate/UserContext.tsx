import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchUser, fetchUserDetail } from "../../Functions/functions";
import { UserProfile } from "../Home/Type";
import { UserContextValue, UserProviderProps, notificationType, userType } from "../Account/Type";
import { useRouter } from "next/router";
import moment from "moment";
import { fetchLatestNotification, getTotalUnreadNotificationsCount } from "../../Functions/Account/function";

// Create the context
export const UserContext = createContext<UserContextValue>({
    user: {},
    userDetails: {},
    trialExpirePopUp: false,
    countTodaysNotification: 0,
    notifications: [],
});

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<UserProfile>({});
    const [userDetails, setUserDetails] = useState<userType>({});
    const [trialExpirePopUp, setTrialExpirePopUp] = useState<boolean>(false);
    const [countTodaysNotification, setCountTodaysNotification] = useState(0);
    const [notifications, setNotifications] = useState<Array<notificationType> | []>([]);
    const router = useRouter();

    useEffect(() => {
        if (
            router.pathname === "/UI/Partner/SignUp" ||
            router.pathname === "/UI/Authenticate/SignUp" ||
            router.pathname === "/UI/Business/SignUp" ||
            router.pathname === "/UI/Authenticate/Thankyou"
        )
            return;
        const storedUser: string | null = localStorage.getItem("user");
        const access_token = localStorage.getItem("access_token");
        const localLogoutTimeout = localStorage.getItem("logoutTimeout");
        if (!access_token) {
            router.push("/UI/Authenticate/Login");
            return;
        }
        if (!localLogoutTimeout) {
            router.push("/UI/Authenticate/Login");
            return;
        }
        if (typeof localLogoutTimeout === "string" && !isNaN(Number(localLogoutTimeout))) {
            localStorage.removeItem("logoutTimeout");
            router.push("/UI/Authenticate/Login");
            return;
        }
        if (moment(localLogoutTimeout).isBefore(moment().format("YYYY-MM-DDTHH:mm:ss"))) {
            localStorage.removeItem("logoutTimeout");
            router.push("/UI/Authenticate/Login");
            return;
        }
        if (storedUser && storedUser !== "undefined") setUser(JSON.parse(storedUser));
        else {
            fetchUser()
                .then((response) => {
                    setUser(response);
                    localStorage.setItem("user", JSON.stringify(response));
                })
                .catch((error) => {
                    console.log(error);
                    router.push("/UI/Authenticate/Login");
                });
        }
    }, [router.asPath]);

    useEffect(() => {
        if (!(user.email || user.phone_number)) {
            return;
        }
        fetchUserDetail(user, setUserDetails, setTrialExpirePopUp, router);
    }, [user]);

    useEffect(() => {
        if (userDetails.contactId) {
            let str = ``;
            userDetails.roles?.split(",").forEach((role) => {
                str =
                    str +
                    `{
                    roles: {
                        _contains: ["${role.trim()}"],
                    },
                }`;
            });
            const str2 = `[${str}]`;
            getTotalUnreadNotificationsCount(
                str2,
                setCountTodaysNotification,
                user.email && user.email !== undefined ? user.email : String(user.phone_number),
            );
            fetchLatestNotification(
                setNotifications,
                str2,
                0,
                20,
                user.email && user.email !== undefined ? user.email : String(user.phone_number),
            );
        }
    }, [userDetails]);

    const contextValue: UserContextValue = {
        user,
        userDetails,
        trialExpirePopUp,
        countTodaysNotification,
        notifications,
    };
    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
