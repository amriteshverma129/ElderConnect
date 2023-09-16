interface CameraIconColor {
    fillcolor?: string;
    inpathfill?: string;
}

function CameraIcon({ fillcolor = "none", inpathfill = "#00cad9" }: CameraIconColor) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18">
            <g id="Icon_feather-camera" data-name="Icon feather-camera" transform="translate(-2.5 -4.5)">
                <g id="Path_346" data-name="Path 346" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path
                        d="M22.5,20.5a2,2,0,0,1-2,2H4.5a2,2,0,0,1-2-2V9.5a2,2,0,0,1,2-2h3l2-3h6l2,3h3a2,2,0,0,1,2,2Z"
                        stroke="none"
                    />
                    <path
                        d="M 20.5 20.70000076293945 C 20.61027908325195 20.70000076293945 20.70000076293945 20.61027908325195 20.70000076293945 20.5 L 20.70000076293945 9.5 C 20.70000076293945 9.38971996307373 20.61027908325195 9.300000190734863 20.5 9.300000190734863 L 17.5 9.300000190734863 C 16.89816093444824 9.300000190734863 16.33614921569824 8.99921989440918 16.00230979919434 8.498459815979004 L 14.53666973114014 6.300000190734863 L 10.46333026885986 6.300000190734863 L 8.997690200805664 8.498459815979004 C 8.663849830627441 8.99921989440918 8.101840019226074 9.300000190734863 7.5 9.300000190734863 L 4.5 9.300000190734863 C 4.38971996307373 9.300000190734863 4.300000190734863 9.38971996307373 4.300000190734863 9.5 L 4.300000190734863 20.5 C 4.300000190734863 20.61027908325195 4.38971996307373 20.70000076293945 4.5 20.70000076293945 L 20.5 20.70000076293945 M 20.5 22.5 L 4.5 22.5 C 3.395430088043213 22.5 2.5 21.60457038879395 2.5 20.5 L 2.5 9.5 C 2.5 8.395429611206055 3.395430088043213 7.5 4.5 7.5 L 7.5 7.5 L 9.5 4.5 L 15.5 4.5 L 17.5 7.5 L 20.5 7.5 C 21.60457038879395 7.5 22.5 8.395429611206055 22.5 9.5 L 22.5 20.5 C 22.5 21.60457038879395 21.60457038879395 22.5 20.5 22.5 Z"
                        stroke="none"
                        fill={inpathfill}
                    />
                </g>
                <g
                    id="Path_347"
                    data-name="Path 347"
                    transform="translate(-3.5 -3)"
                    fill={fillcolor}
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M20,17.5a4,4,0,1,1-4-4A4,4,0,0,1,20,17.5Z" stroke="none" />
                    <path
                        d="M 16 15.29999923706055 C 14.78692054748535 15.29999923706055 13.79999923706055 16.28692054748535 13.79999923706055 17.5 C 13.79999923706055 18.71307945251465 14.78692054748535 19.70000076293945 16 19.70000076293945 C 17.21308135986328 19.70000076293945 18.20000076293945 18.71307945251465 18.20000076293945 17.5 C 18.20000076293945 16.28692054748535 17.21308135986328 15.29999923706055 16 15.29999923706055 M 16 13.5 C 18.20914077758789 13.5 20 15.29085922241211 20 17.5 C 20 19.70914077758789 18.20914077758789 21.5 16 21.5 C 13.79085922241211 21.5 12 19.70914077758789 12 17.5 C 12 15.29085922241211 13.79085922241211 13.5 16 13.5 Z"
                        stroke="none"
                        fill={inpathfill}
                    />
                </g>
            </g>
        </svg>
    );
}

export default CameraIcon;
