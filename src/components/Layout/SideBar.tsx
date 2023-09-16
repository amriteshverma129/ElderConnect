import Link from "next/link";
import styles from "./Style/sidebar.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { linktype, SideBarProps } from "./Type";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const sideBarData = [
    {
        label: "Events",
        path: "/UI/Events/",
        tab: "Events",
    },
    // {
    //     label: "Communities",
    //     path: "/UI/Community/",
    // },
    // {
    //     label: "My Buddy",
    //     path: "/UI/Buddy/",
    //     tab: "Buddy",
    // },
    {
        label: "Library",
        path: "/UI/Library/",
        tab: "Library",
    },
    {
        label: "Account",
        path: "/UI/Account/",
        tab: "Account",
    },
    {
        label: "Sign out",
        path: "/UI/Authenticate/Login",
        tab: "Logout",
    },
];

const SideBar: React.FunctionComponent<SideBarProps> = ({ setShow, show, setClass }) => {
    const router = useRouter();
    const [tab, setTab] = useState("");

    useEffect(() => {
        if (router.pathname.includes("/UI/Events")) {
            setTab("Events");
        } else if (router.pathname.includes("/UI/Library")) {
            setTab("Library");
        } else if (router.pathname.includes("/UI/Account")) {
            setTab("Account");
        } else if (router.pathname.includes("/UI/Authenticate/Login")) {
            setTab("Logout");
        } else if (router.pathname.includes("/UI/Buddy")) {
            setTab("Buddy");
        }
    }, [router.pathname]);

    return (
        <div className={styles["sidebar"]}>
            <div className={styles["sidebar-title"]}>
                <div>Menu</div>
                <CancelOutlinedIcon
                    onClick={() => {
                        setShow(!show);
                        show ? setClass("hamburger-menu-collapse") : setClass("hamburger-menu-expand");
                    }}
                    sx={{ marginLeft: "auto", display: { md: "none", xs: "block" } }}
                />
            </div>
            <hr className={styles["sidebar-divider1"]} />
            <ul className={styles["sidebar-list"]}>
                {sideBarData.map((item: linktype, index: number) => {
                    return (
                        <div
                            key={index}
                            className={tab === item.tab ? styles["sidebar-item-active"] : styles["sidebar-item"]}
                            onClick={() => {
                                if (item.label === "Sign out") {
                                    localStorage.clear();
                                }
                            }}
                        >
                            <Link href={item.path} className={styles["sidebar-link"]} passHref>
                                <li>{item.label}</li>
                            </Link>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};
export default SideBar;
