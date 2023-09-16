import { UserProfile } from "../Home/Type";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchUser } from "../../Functions/functions";
import Loader2 from "../Loader/Loader2";
import moment from "moment";

type ProtectPageInjectedProps = {
    user: UserProfile;
};

export type ExclueProtectPageInjectedProps<T> = Omit<T, keyof ProtectPageInjectedProps>;

export function protectPage<T>(Component: NextPage<T & ProtectPageInjectedProps>) {
    const WithProtectPage: NextPage<Omit<T, keyof ProtectPageInjectedProps>> = (props) => {
        const router = useRouter();
        const [user, setUser] = useState<UserProfile>({});

        useEffect(() => {
            const access_token = localStorage.getItem("access_token");
            const userObj = localStorage.getItem("user");
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
            if (userObj && userObj !== "undefined") {
                const parseUser = JSON.parse(userObj);
                setUser(parseUser);
            } else {
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
        }, [router]);

        // Auth has loaded its state, and user is logged in
        if (user.phone_number || user.email) return <Component user={user} {...(props as T)} />;

        //  Auth is loading its state
        return (
            <div className="layout-container">
                <Loader2 />
            </div>
        );
    };

    return WithProtectPage;
}
