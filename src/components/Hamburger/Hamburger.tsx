import React, { useState } from "react";
import styles from "./hamburger.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SideBar from "../Layout/SideBar";
import { Avatar } from "@mui/material";
import { useUser } from "../Authenticate/UserContext";

const Hamburger = () => {
    const [show, setShow] = useState(false);
    const [class2, setClass] = useState("hamburger-menu-collapse");
    const { userDetails } = useUser();

    return (
        <div className={styles["hamburger"]}>
            <div className={styles["hamburger-menu"]} onClick={() => setShow(!show)}>
                {!show ? (
                    <MenuIcon
                        onClick={() => {
                            setShow(!show);
                            setClass("hamburger-menu-expand");
                        }}
                    />
                ) : (
                    <CloseIcon
                        onClick={() => {
                            setShow(!show);
                            setClass("hamburger-menu-collapse");
                        }}
                    />
                )}
            </div>
            <>
                <div className={styles[`${class2}`]}>
                    <SideBar setShow={setShow} setClass={setClass} show={show} />
                </div>
                {show && (
                    <div
                        className={styles["hamburger-background"]}
                        onClick={() => {
                            show ? setClass("hamburger-menu-collapse") : setClass("hamburger-menu-expand");
                            setShow(!show);
                        }}
                    ></div>
                )}
            </>
            <div
                className={styles["hamburger-avatar"]}
                onClick={() => {
                    show ? setClass("hamburger-menu-collapse") : setClass("hamburger-menu-expand");
                    setShow(!show);
                }}
            >
                {/* {userDetails?.firstName?.charAt(0).toUpperCase()} */}
                <Avatar
                    alt="upload image"
                    src={userDetails.profileImage ? userDetails.profileImage : ""}
                    sx={{
                        height: "100%",
                        width: "100%",
                        fontSize: "16px",
                        backgroundColor: "#d92d3e",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        fontWeight: 500,
                        border: userDetails.profileImage?.trim() ? "1px solid #d92d3e" : "",
                    }}
                >
                    {userDetails?.firstName?.charAt(0).toUpperCase()}
                </Avatar>
            </div>
        </div>
    );
};
export default Hamburger;
