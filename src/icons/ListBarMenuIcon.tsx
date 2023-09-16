import React from "react";

interface ListBarMenuIconColor {
    strokecolor: string;
}
function ListBarMenuIcon({ strokecolor = "#142c60" }: ListBarMenuIconColor) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" fill="none" />
            <path d="M6 12H18" stroke={strokecolor} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 15.5H18" stroke={strokecolor} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 8.5H18" stroke={strokecolor} stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}

export default ListBarMenuIcon;
