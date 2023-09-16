import styles from "../Account/Style/communities.module.scss";
import Search from "../Search/Search";
import React, { useState, ChangeEvent } from "react";
import CommunityCards from "../Community/CommunityCards";

const Communities = () => {
    const [search, setSearch] = useState<string>("");

    // search community
    const handleSearchCommunity = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setSearch(value);
    };
    return (
        <div className={styles["account-communities"]}>
            <div className={styles["account-communities-search-Box"]}>
                <Search handleSearch={handleSearchCommunity} value={search} placeholders={"Search Community by name"} />
            </div>
            <CommunityCards communityDesginType={"communitycard"} />
        </div>
    );
};
export default Communities;
