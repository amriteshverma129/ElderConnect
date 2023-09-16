import { ReadMoreProp } from "./Type";
import { useState } from "react";

const ReadMore = ({ detail }: ReadMoreProp) => {
    const text = detail;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p>
            {isReadMore ? text.substring(0, 650) : text}
            <span onClick={toggleReadMore} style={{ fontWeight: "bold", cursor: "pointer" }}>
                {isReadMore ? "...read more" : " show less"}
            </span>
        </p>
    );
};

export default ReadMore;
