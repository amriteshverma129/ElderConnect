import React, { ChangeEvent } from "react";
import styles from "./search.module.scss";
import SearchIcon from "../../icons/SearchIcon";

interface Props {
    placeholders?: string;
    aria_Label?: string;
    value: string;
    handleSearch: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Search = (props: Props) => {
    return (
        <div className={styles["search-box"]}>
            <span className={styles["search-icon"]}>
                <SearchIcon />
            </span>
            <input
                type="search"
                className={styles["search-input"]}
                placeholder={props.placeholders || ""}
                aria-label={props.aria_Label || ""}
                name="search"
                value={props.value || ""}
                onChange={(e) => props.handleSearch(e)}
            />
        </div>
    );
};
export default Search;
