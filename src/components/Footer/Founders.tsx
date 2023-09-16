import React from "react";
import styles from "./Style/founders.module.scss";
import Image from "next/image";
import Link from "next/link";
import { GetAllFoundersQuery } from "../../generated/graphql";

interface Props {
    data?: GetAllFoundersQuery["allFounders"];
}

const Founders = ({ data }: Props) => {
    const edges = data?.edges;
    const firstEdge = edges?.[0];
    const node = firstEdge?.node;
    const slices = node?.slices;
    const itemsArray = slices?.[0]?.variation?.items;

    return (
        <div className="layout-container-fluid">
            <div className={styles["founders"]}>
                <div className={styles["founders-heading"]}>Our Founders</div>
                <div className={styles["founders-list"]}>
                    {itemsArray?.map((item, index) => {
                        return (
                            <div className={styles["founders-card"]} key={index}>
                                <div className={styles["founders-card-image"]}>
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
                                {item.name && (
                                    <div
                                        className={styles["founders-card-name"]}
                                        dangerouslySetInnerHTML={{ __html: item?.name }}
                                    />
                                )}
                                {item.designation && (
                                    <div
                                        className={styles["founders-card-designation"]}
                                        dangerouslySetInnerHTML={{ __html: item?.designation }}
                                    />
                                )}
                                {item.about && (
                                    <div
                                        className={styles["founders-card-about"]}
                                        dangerouslySetInnerHTML={{ __html: item?.about }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className={styles["founders-help"]}>
                    <div className={styles["founders-para"]}>Want to learn more ?</div>
                    <Link href={"/UI/Footer/Contact Us"} passHref>
                        <button>Contact Us</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Founders;
