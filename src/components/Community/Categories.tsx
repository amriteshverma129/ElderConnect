import React from "react";
import dynamic from "next/dynamic";
const Category = dynamic(() => import("./Category"));

const Categories = () => {
    return (
        <div>
            <Category category={"Cafe"} />
            <Category category={"One Generation"} />
            <Category category={"Travel"} />
            <Category category={"Spain"} />
            <Category category={"St. Barnabas"} />
            <Category category={"Animal"} />
            <Category category={"Exercise"} />
            <Category category={"Cafe"} />
            <Category category={"One Generation"} />
            <Category category={"Travel"} />
            <Category category={"Spain"} />
            <Category category={"St. Barnabas"} />
            <Category category={"Animal"} />
            <Category category={"Exercise"} />
            <Category category={"Cafe"} />
            <Category category={"One Generation"} />
            <Category category={"Travel"} />
            <Category category={"Spain"} />
            <Category category={"St. Barnabas"} />
            <Category category={"Animal"} />
            <Category category={"Exercise"} />
        </div>
    );
};
export default Categories;
