import { useRouter } from "next/router";
import styles from "./Style/trialbar.module.scss";
import { useState, useEffect } from "react";
import moment from "moment";
import { useUser } from "../Authenticate/UserContext";

const TrialBar = () => {
    const { userDetails } = useUser();
    const [trialDaysLeft, setTrialDaysLeft] = useState(0);
    const [trailBarShow, setTrailBarShow] = useState<boolean>(false);
    const router = useRouter();
    const trialPeriod = 30;

    useEffect(() => {
        if (userDetails) {
            const roles = userDetails.roles?.split(",");
            if (
                roles &&
                roles.some(
                    (role) => role?.trim() === "The Loop Trial Role" || role?.trim() === "The Loop Trial Expired",
                ) &&
                !(router.pathname.includes("/UI/Account") && router.query.account_Card === "Purchase Membership")
            ) {
                setTrailBarShow(true);
            } else {
                setTrailBarShow(false);
            }
            const currentDate = moment();
            const trialStartDate = moment(userDetails.created_at);
            const elapsedDays = currentDate.diff(trialStartDate, "days");
            if (elapsedDays >= 30) {
                setTrialDaysLeft(0);
                return;
            }
            const daysLeft = trialPeriod - elapsedDays;
            setTrialDaysLeft(daysLeft);
        }
    }, [userDetails, router]);

    const progressBarWidth = ((trialPeriod - trialDaysLeft) / trialPeriod) * 100;

    return (
        <>
            {trailBarShow && (
                <div className={styles["trialBar"]}>
                    <div className={styles["trialBar-details"]}>
                        <p>Free Trial</p>
                        <p>{trialDaysLeft} Days Left</p>
                    </div>
                    <div className={styles["trialBar-progress"]}>
                        <div
                            className={styles["trialBar-progress-bar"]}
                            style={{ width: `${progressBarWidth}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </>
    );
};
export default TrialBar;
