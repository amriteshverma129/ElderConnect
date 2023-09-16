interface Props {
    fill: string;
}
function StarIcon(props: Props) {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                style={{ marginRight: "5px" }}
                viewBox="0 0 49.5 46.5"
            >
                <path
                    id="Icon_ionic-ios-star"
                    data-name="Icon ionic-ios-star"
                    d="M48.429,18.952H32.668L27.879,4.522a1.73,1.73,0,0,0-3.257,0l-4.789,14.43H3.964A1.728,1.728,0,0,0,2.25,20.683a1.284,1.284,0,0,0,.032.292A1.667,1.667,0,0,0,3,22.2l12.954,9.216L10.982,46.006a1.746,1.746,0,0,0,.589,1.947,1.65,1.65,0,0,0,.964.422,2.088,2.088,0,0,0,1.071-.389l12.643-9.1,12.643,9.1a2,2,0,0,0,1.071.389,1.532,1.532,0,0,0,.954-.422,1.724,1.724,0,0,0,.589-1.947L36.536,31.413l12.846-9.3.311-.27a1.821,1.821,0,0,0,.557-1.157A1.822,1.822,0,0,0,48.429,18.952Z"
                    transform="translate(-1.5 -2.625)"
                    fill={props.fill}
                    stroke="#e24046"
                    stroke-width="1.5"
                />
            </svg>
        </div>
    );
}

export default StarIcon;
