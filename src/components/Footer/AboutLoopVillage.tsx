import React from "react";
import styles from "./Style/aboutLoopVillage.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetAllAboutLoopVillagesQuery } from "../../generated/graphql";
import { imageType } from "../Home/Type";

interface Props {
    data?: GetAllAboutLoopVillagesQuery["allAboutloopvilages"];
}

const HeroPanel = ({
    item,
    index,
    len,
}: {
    item: { image?: imageType; description?: string; title?: string };
    index: number;
    len: number;
}) => {
    const router = useRouter();
    return (
        <div className={styles["aboutLoopVillage-image-content-holder"]} key={index}>
            <div className={styles["aboutLoopVillage-image"]} style={index % 2 === 0 ? { order: 1 } : { order: 2 }}>
                <div>
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
            <div
                className={`${styles["aboutLoopVillage-content"]} ${styles["aboutLoopVillage-center"]}`}
                style={index % 2 === 0 ? { order: 2 } : { order: 1 }}
            >
                {item.title && (
                    <div
                        className={styles["aboutLoopVillage-title"]}
                        dangerouslySetInnerHTML={{ __html: item?.title }}
                    />
                )}
                {item.description && (
                    <div
                        className={styles["aboutLoopVillage-para"]}
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                    />
                )}
                {index === len - 1 && (
                    <button
                        onClick={() => {
                            router.push("/UI/Events");
                        }}
                    >
                        Browse our events
                    </button>
                )}
            </div>
        </div>
    );
};

const AboutLoopVillage = ({ data }: Props) => {
    const edges = data?.edges;
    const firstEdge = edges?.[0];
    const node = firstEdge?.node;
    const slices = node?.slices;
    const itemsArray = slices?.[0]?.variation?.items;

    return (
        <div className="layout-container-fluid">
            <div className={styles["aboutLoopVillage-heading"]}>About The LOOP Village</div>
            <div className={styles["aboutLoopVillage"]}>
                {itemsArray?.map((item, index) => {
                    if (index === 2) {
                        return (
                            <div key={index}>
                                <div className={styles["aboutLoopVillage-thought"]}>
                                    <div className={styles["aboutLoopVillage-para"]}>
                                        &quot;Hope, even more than necessity, is the mother of invention&quot;
                                    </div>
                                    <div className={styles["aboutLoopVillage-writer"]}>Jonathan Sacks</div>
                                </div>
                                <HeroPanel item={item} index={index} len={itemsArray.length} />
                            </div>
                        );
                    } else {
                        return (
                            <div key={index}>
                                <HeroPanel item={item} index={index} len={itemsArray.length} />
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default AboutLoopVillage;
