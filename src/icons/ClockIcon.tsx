interface ClockIconColor {
    fillcolor: string;
}

function ClockIcon({ fillcolor = "#fff" }: ClockIconColor) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <g clip-path="url(#clip0_25_2862)">
                <path
                    d="M16 26.6663C13.8903 26.6663 11.8281 26.0408 10.0739 24.8687C8.31981 23.6966 6.95263 22.0307 6.1453 20.0816C5.33797 18.1326 5.12673 15.9878 5.53831 13.9187C5.94988 11.8496 6.96578 9.94897 8.45754 8.45721C9.9493 6.96545 11.8499 5.94955 13.9191 5.53797C15.9882 5.12639 18.1329 5.33763 20.082 6.14496C22.0311 6.9523 23.697 8.31947 24.869 10.0736C26.0411 11.8277 26.6667 13.89 26.6667 15.9997C26.6667 18.8287 25.5429 21.5418 23.5425 23.5422C21.5421 25.5425 18.829 26.6663 16 26.6663ZM16 6.85701C14.1918 6.85701 12.4241 7.39322 10.9206 8.39783C9.41712 9.40244 8.24528 10.8303 7.55329 12.5009C6.86131 14.1715 6.68025 16.0098 7.03302 17.7833C7.38579 19.5568 8.25655 21.1859 9.53517 22.4645C10.8138 23.7431 12.4429 24.6139 14.2164 24.9667C15.9899 25.3194 17.8282 25.1384 19.4988 24.4464C21.1694 23.7544 22.5973 22.5826 23.6019 21.0791C24.6065 19.5756 25.1427 17.8079 25.1427 15.9997C25.1427 13.5749 24.1794 11.2494 22.4649 9.53484C20.7503 7.82025 18.4248 6.85701 16 6.85701Z"
                    fill={fillcolor}
                />
                <path
                    d="M19.512 20.6826L15.1853 16.3559V9.07324H16.7333V15.7132L20.6 19.5906L19.512 20.6826Z"
                    fill={fillcolor}
                />
            </g>
            <defs>
                <clipPath id="clip0_25_2862">
                    <rect width="21.3333" height="21.3333" fill={fillcolor} transform="translate(5.33334 5.33301)" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default ClockIcon;