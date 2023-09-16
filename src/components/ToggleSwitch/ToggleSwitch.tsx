import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./toggleSwitch.module.scss";

interface ToggleSwitchProps {
    on: boolean;
    setOn: Dispatch<SetStateAction<boolean>>;
}
const ToggleSwitch = ({ on, setOn }: ToggleSwitchProps) => {
    const [checked, setChecked] = useState<boolean>(on);

    useEffect(() => {
        setChecked(on);
    }, [on]);

    return (
        <div>
            {checked === false ? (
                <div
                    className={styles["toggle-switch-off"]}
                    onClick={() => {
                        setOn(true);
                        setChecked(true);
                    }}
                >
                    <div className={styles["toggle-slider"]}></div>
                </div>
            ) : (
                <div
                    className={styles["toggle-switch-on"]}
                    onClick={() => {
                        setOn(false);
                        setChecked(false);
                    }}
                >
                    <div className={styles["toggle-slider"]}></div>
                </div>
            )}
        </div>
    );
};
export default ToggleSwitch;
