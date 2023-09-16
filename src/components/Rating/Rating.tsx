import React from "react";
import StarIcon2 from "../../icons/StarIcon2";

interface Props {
    count?: number;
    rating: number;
    color: {
        filled: string;
    };
    fontSize: number;
}

const Rating = ({ count = 5, rating, color, fontSize }: Props) => {
    let isInteger = Number.isInteger(rating);

    return (
        <div className="star-rating" style={{ display: "flex", gap: "5px" }}>
            {[...Array(count)].map((_star, index) => {
                if (index + 1 <= Math.floor(rating))
                    return (
                        <StarIcon2
                            color={color.filled}
                            height={fontSize}
                            width={fontSize}
                            type={"filled"}
                            key={index}
                        />
                    );
                else if (!isInteger) {
                    isInteger = true;
                    return (
                        <StarIcon2
                            color={color.filled}
                            height={fontSize}
                            width={fontSize}
                            type={"halffilled"}
                            key={index}
                        />
                    );
                } else
                    return (
                        <StarIcon2
                            color={color.filled}
                            height={fontSize}
                            width={fontSize}
                            type={"unfilled"}
                            key={index}
                        />
                    );
            })}
        </div>
    );
};

export default Rating;
