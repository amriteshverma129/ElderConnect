import React, { useState, useEffect } from "react";
import styles from "./loader.module.scss";

interface Loader2Props {
    active?: boolean;
}

const Loader2 = ({ active = false }: Loader2Props) => {
    const [active2, setActive2] = useState(active);

    useEffect(() => {
        setActive2(active);
    }, []);

    return (
        <div className={`${styles["lds-backdrop"]} ${active2 && styles["lds-backdrop-absolute"]}`}>
            <div className={`${styles["lds-roller"]} ${active2 && styles["lds-roller2"]}`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};
export default Loader2;
