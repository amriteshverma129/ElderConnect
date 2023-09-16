interface HeartIconColor {
    fillcolor?: string;
    inpathfill?: string;
}

function HeartIcon({ fillcolor = "#fff", inpathfill = "#222" }: HeartIconColor) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16">
            <g
                id="Icon_ionic-ios-heart"
                data-name="Icon ionic-ios-heart"
                transform="translate(-3.375 -3.938)"
                fill={fillcolor}
            >
                <path
                    d="M 12.37522888183594 18.71877861022949 C 11.14915561676025 17.84268569946289 8.16313362121582 15.59131526947021 6.227469921112061 13.14500045776367 C 4.947800159454346 11.52775001525879 4.375 9.625399589538574 4.375 8.457500457763672 C 4.375 6.536880493164062 6.102232933044434 4.958630084991455 8.225983619689941 4.9375 L 8.264419555664062 4.9375 C 9.595569610595703 4.9375 10.82668018341064 5.556610107421875 11.55764007568359 6.593629837036133 L 12.375 7.753220081329346 L 13.19235992431641 6.593629837036133 C 13.92331981658936 5.556610107421875 15.1544303894043 4.9375 16.48557090759277 4.9375 L 16.52400588989258 4.9375 C 18.64776802062988 4.958630084991455 20.375 6.536880493164062 20.375 8.457500457763672 C 20.375 9.625399589538574 19.80220031738281 11.52775001525879 18.52252960205078 13.14498996734619 C 16.58335876464844 15.59574222564697 13.60061645507812 17.84376525878906 12.37522888183594 18.71877861022949 Z"
                    stroke="none"
                />
                <path
                    d="M 8.231246948242188 5.9375 C 6.655570983886719 5.955297470092773 5.375 7.08433723449707 5.375 8.457500457763672 C 5.375 9.420069694519043 5.887170791625977 11.10334014892578 7.011680603027344 12.52449035644531 C 8.61570930480957 14.55169773101807 10.99324131011963 16.45474624633789 12.37577533721924 17.48196792602539 C 13.75657844543457 16.45697212219238 16.1288948059082 14.55851173400879 17.73833084106445 12.52447986602783 C 18.86283111572266 11.10334014892578 19.375 9.420069694519043 19.375 8.457500457763672 C 19.375 7.08433723449707 18.09442901611328 5.955297470092773 16.51874351501465 5.9375 L 16.48556900024414 5.9375 C 15.49417018890381 5.9375 14.5454797744751 6.409679412841797 14.00971031188965 7.169759750366211 L 12.375 9.488929748535156 L 10.74028968811035 7.169759750366211 C 10.2045202255249 6.409679412841797 9.255829811096191 5.9375 8.264419555664062 5.9375 L 8.231246948242188 5.9375 M 8.221149444580078 3.9375 C 8.234130859375 3.9375 8.251440048217773 3.9375 8.264419555664062 3.9375 C 9.982210159301758 3.9375 11.50096035003662 4.777500152587891 12.375 6.017499923706055 C 13.24903964996338 4.777500152587891 14.76778984069824 3.9375 16.48556900024414 3.9375 C 16.49855995178223 3.9375 16.515869140625 3.9375 16.52883911132812 3.9375 C 19.20721054077148 3.96150016784668 21.375 5.973499298095703 21.375 8.457500457763672 C 21.375 9.9375 20.67403984069824 12.03750038146973 19.30673027038574 13.76550006866455 C 16.70191955566406 17.05749893188477 12.375 19.9375 12.375 19.9375 C 12.375 19.9375 8.048080444335938 17.05749893188477 5.443269729614258 13.76550006866455 C 4.075960159301758 12.03750038146973 3.375 9.9375 3.375 8.457500457763672 C 3.375 5.973499298095703 5.542789459228516 3.96150016784668 8.221149444580078 3.9375 Z"
                    stroke="none"
                    fill={inpathfill}
                />
            </g>
        </svg>
    );
}

export default HeartIcon;
