import React from "react";
import styles from "./Style/career.module.scss";
import Image from "next/image";
import { GetAllCareerssQuery } from "../../generated/graphql";
import { imageType } from "../Home/Type";

interface Props {
    data?: GetAllCareerssQuery["allCareerss"];
}

const Careers = ({ data }: Props) => {
    const edges = data?.edges;
    const firstEdge = edges?.[0];
    const node = firstEdge?.node;
    const slices = node?.slices;
    const itemsArray = slices?.[0]?.variation?.items;
    const itemsArrayList = slices?.[1]?.variation?.items;

    return (
        <div className="layout-container-fluid">
            <div className={styles["career"]}>
                <div className={styles["career-header-title"]}>
                    <h2>Careers</h2>
                </div>
                {itemsArray?.map(
                    (
                        item: {
                            title?: string;
                            description?: string;
                            image?: imageType;
                        },
                        index: number,
                    ) => {
                        if (index === 0) {
                            return (
                                <div className={styles["career-heroPanel1"]} key={index}>
                                    {item.title && (
                                        <div
                                            className={styles["career-heroPanel1-heading"]}
                                            dangerouslySetInnerHTML={{ __html: item?.title }}
                                        />
                                    )}
                                    {item.description && (
                                        <div
                                            className={styles["career-heroPanel1-para"]}
                                            dangerouslySetInnerHTML={{ __html: item?.description }}
                                        />
                                    )}
                                    <div className={styles["career-heroPanel1-image"]}>
                                        {item?.image?.url && (
                                            <Image
                                                src={item?.image?.url}
                                                alt={item?.image?.url}
                                                layout="fill"
                                                objectFit="contain"
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div className={styles["career-heroPanel2"]} key={index}>
                                    <div className={styles["career-heroPanel2-content1"]}>
                                        {item.title && (
                                            <div
                                                className={styles["career-heroPanel2-heading"]}
                                                dangerouslySetInnerHTML={{ __html: item?.title }}
                                            />
                                        )}
                                        {item.description && (
                                            <div
                                                className={styles["career-heroPanel2-para"]}
                                                dangerouslySetInnerHTML={{ __html: item?.description }}
                                            />
                                        )}
                                        <div className={styles["career-heroPanel2-image"]}>
                                            {item?.image?.url && (
                                                <Image
                                                    src={item?.image?.url}
                                                    alt={item?.image?.url}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    loading="lazy"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles["career-heroPanel2-content2"]}>
                                        {itemsArrayList?.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    {item.title && (
                                                        <div
                                                            className={styles["career-heroPanel2-title"]}
                                                            dangerouslySetInnerHTML={{ __html: item?.title }}
                                                        />
                                                    )}
                                                    {item.description && (
                                                        <ul>
                                                            <li
                                                                className={styles["career-heroPanel2-list"]}
                                                                dangerouslySetInnerHTML={{ __html: item?.description }}
                                                            />
                                                        </ul>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        }
                    },
                )}
            </div>
        </div>
    );
};
export default Careers;
