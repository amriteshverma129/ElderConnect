import React from "react";
import styles from "./Style/libraryCard.module.scss";
import LibraryCard from "./LibraryCard";
import { LibraryCardsProps } from "./Type";

//Library Cards component mapping through list of recordings and rendering Library Card
const LibraryCards = ({ recordings, menuIcon, prismicMapList }: LibraryCardsProps) => {
    return (
        <div
            className={
                menuIcon == "GridMenu"
                    ? styles["library-card-holder-grid-style"]
                    : styles["library-card-holder-list-style"]
            }
        >
            {recordings.map((recording, index) => {
                return (
                    <LibraryCard
                        recording={recording}
                        key={index}
                        menuIcon={menuIcon}
                        prismicMapList={prismicMapList}
                    />
                );
            })}
        </div>
    );
};
export default LibraryCards;
