interface Props {
    color?: string;
    width?: number;
    height?: number;
    type?: string; //filled, unfilled, halffilled
}
function StarIcon2({ color = "yellow", width = 20, height = 20, type = "filled" }: Props) {
    if (type === "filled") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={`${width}`}
                height={`${height}`}
                viewBox="0 0 20 19"
                fill="none"
            >
                <path
                    d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z"
                    fill={color}
                />
            </svg>
        );
    } else if (type === "unfilled") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={`${width}`}
                height={`${height}`}
                viewBox="0 0 20 19"
                fill="none"
            >
                <path
                    d="M10 13.39L6.24 15.66L7.23 11.38L3.91 8.5L8.29 8.13L10 4.09L11.71 8.13L16.09 8.5L12.77 11.38L13.76 15.66M20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.45 11.97L3.82 19L10 15.27L16.18 19L14.54 11.97L20 7.24Z"
                    fill={color}
                />
            </svg>
        );
    } else if (type === "halffilled") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={`${width}`}
                height={`${height}`}
                viewBox="0 0 20 19"
                fill="none"
            >
                <path
                    d="M20 7.24L12.81 6.62L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27L16.18 19L14.55 11.97L20 7.24ZM10 13.4V4.1L11.71 8.14L16.09 8.52L12.77 11.4L13.77 15.68L10 13.4Z"
                    fill={color}
                />
            </svg>
        );
    } else {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={`${width}`}
                height={`${height}`}
                viewBox="0 0 20 19"
                fill="none"
            >
                <path
                    d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z"
                    fill={color}
                />
            </svg>
        );
    }
}

export default StarIcon2;
