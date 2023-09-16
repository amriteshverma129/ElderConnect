import React, { useEffect, useState } from "react";
import styles from "./Style/settings.module.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { showToastMessage, updateUserNotificationStatus } from "../../Functions/Account/function";
import { ToastContainer, Toast } from "react-bootstrap";
import { useUser } from "../Authenticate/UserContext";

const Settings = () => {
    const { userDetails } = useUser();
    const [notificationsOn, setNotificationsOn] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    useEffect(() => {
        if (userDetails.contactId && userDetails.notificationsOn !== undefined) {
            setNotificationsOn(userDetails.notificationsOn);
        }
    }, [userDetails]);

    const handleToggleChange = () => {
        const newNotificationsOn = !notificationsOn;
        showToastMessage("Updating the setting", "success", 2000, setToastMessage, setToastType, setShowToast);
        setNotificationsOn(newNotificationsOn);
        updateUserNotificationStatus(userDetails, newNotificationsOn)
            .then(() => {
                showToastMessage("Successful", "success", 2000, setToastMessage, setToastType, setShowToast);
            })
            .catch((error) => {
                showToastMessage(error.message, "danger", 2000, setToastMessage, setToastType, setShowToast);
            });
    };

    return (
        <div className={styles["settings"]}>
            <ToastContainer
                style={{ position: "fixed", bottom: "0", left: "50%", transform: "translateX(-50%)" }}
                className="p-3"
            >
                {toastMessage && (
                    <Toast
                        show={showToast}
                        onClose={() => setShowToast(false)}
                        className={`bg-${toastType} text-white`}
                    >
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                )}
            </ToastContainer>
            <div className={styles["settings-card"]}>
                <div>
                    <h1>All event&apos;s notifications</h1>
                    <h3>From here you can turn on/off notifications for all events</h3>
                </div>
                <div className={styles["settings-toggle-switch"]}>
                    <ToggleSwitch on={notificationsOn} setOn={handleToggleChange} />
                </div>
            </div>
            {/* <div className={styles["settings-card"]}>
                <div>
                    <h1>Individual event&apos;s notifications</h1>
                    <h3>From here you can turn on/off notifications from Individual event</h3>
                </div>
                <button className={styles["settings-btn-customize"]}>Customize</button>
            </div> */}
        </div>
    );
};
export default Settings;
