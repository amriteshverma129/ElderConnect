import React, { useState, ChangeEvent } from "react";
import Search from "../Search/Search";
import Members from "../Community/Members";
import styles from "./Style/following.module.scss";

const Following = () => {
    const [search, setSearch] = useState<string>("");

    const handleSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setSearch(value);
    };
    return (
        <div className={styles["account-following"]}>
            <div className={styles["account-following-search-Box"]}>
                <Search handleSearch={handleSearch} value={search} placeholders={"Search member by name"} />
            </div>
            <Members memberDesginType={"memberCard"} />
        </div>
    );
};
export default Following;
