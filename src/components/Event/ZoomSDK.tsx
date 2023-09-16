import React, { useEffect, useState } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import { ZoomProps } from "./Type";
import Head from "next/head";
import ErrorBox from "../ErrorBox/ErrorBox";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.13.0/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

function ZoomSDK(props: ZoomProps) {
    const [signature, setSignature] = useState("");
    const [sdkKey, setSDKKey] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    let userName = "";
    let userEmail = "";
    const leaveUrl =
        window.location.origin +
        `/UI/Events/?meetingId=${props.meetingId}&startTime=${props.startTime}&open=true&eventTopic=${props.eventTopic}`;
    if (props && props.name !== undefined && typeof props.name === "string") userName = props.name;
    else userName = "";
    if (props && props.email !== undefined && typeof props.email === "string") userEmail = props.email;
    else userEmail = "";

    useEffect(() => {
        const fetchSignature = async () => {
            const response = await fetch(`/api/zoom/signature`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    meetingNumber: `${props.meetingId}`,
                }),
            });
            if (response.status >= 400) {
                setErrorMessage("Signature Generation got failed ...please try again later");
                props.setLoader(false);
                document.getElementById("zmmtg-root")?.setAttribute("style", "display: none");
                return;
            }
            const data = await response.json();
            console.log(data);
            setSignature(data.signature);
            setSDKKey(data.sdkKey);
        };
        fetchSignature();
    }, []);

    useEffect(() => {
        function startMeeting() {
            ZoomMtg.init({
                leaveUrl: leaveUrl,
                disableInvite: true,
                success: (success: unknown) => {
                    props.setLoader(false);
                    console.log(success);
                    ZoomMtg.join({
                        signature: signature,
                        meetingNumber: `${props.meetingId}`,
                        userName: userName,
                        sdkKey: sdkKey,
                        userEmail: userEmail,
                        passWord: `${props.passcode}`,
                        tk: "",
                        success: (success2: unknown) => {
                            console.log(success2);
                        },
                        error: (error: unknown) => {
                            console.log(error);
                            setErrorMessage("Something is wrong ...please try again later");
                            props.setLoader(false);
                            document.getElementById("zmmtg-root")?.setAttribute("style", "display: none");
                        },
                    });
                },
                error: (error: unknown) => {
                    props.setLoader(false);
                    setErrorMessage("Something is wrong ...please try again later");
                    document.getElementById("zmmtg-root")?.setAttribute("style", "display: none");
                    console.log(error);
                },
            });
        }
        if (sdkKey && signature) {
            startMeeting();
            const timer = setInterval(() => {
                // if (document.getElementsByClassName("zm-btn")) {
                //     document.getElementsByClassName("zm-btn")[0]?.setAttribute("style", "width:100%;");
                // }
                if (document.getElementsByClassName("footer__leave-btn")[0] !== undefined) {
                    clearInterval(timer);
                    document.getElementsByClassName("footer__leave-btn")[0].addEventListener("click", () => {
                        ZoomMtg.leaveMeeting({
                            success: () => {
                                console.log("Left meeting successfully");
                            },
                            error: (error: unknown) => {
                                console.log(error);
                            },
                        });
                        window.location.replace(leaveUrl);
                    });
                }
            }, 500);
        }
    }, [leaveUrl, props, sdkKey, signature, userEmail, userName]);

    return (
        <div>
            <Head>
                <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.13.0/css/bootstrap.css" />
                <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.13.0/css/react-select.css" />
            </Head>
            <main></main>
            <ErrorBox successMessage="" errorMessage={errorMessage} />
        </div>
    );
}

export default ZoomSDK;
