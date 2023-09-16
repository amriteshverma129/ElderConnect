import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./Style/chooseBuddyList.module.scss";
import dynamic from "next/dynamic";
const ChooseBuddyCard = dynamic(() => import("./ChooseBuddyCard"));
import { ChooseBuddyListProps } from "./Type";

const newArr = new Array(5);
newArr.fill(false);
const ChooseBuddyList = ({ data, email }: ChooseBuddyListProps) => {
    const map = new Map();
    map.set("deirdrec@theloopvillage.com", "inf_custom_MyVillageBuddyis1_Deirdre");
    map.set("pamlevine@theloopvillage.com", "inf_custom_MyVillageBuddyis1_Pam");
    map.set("reerios@theloopvillage.com", "inf_custom_MyVillageBuddyis1_Ree");
    map.set("ayeshas@theloopvillage.com", "inf_custom_MyVillageBuddyis1_Ayesha");
    map.set("mackenzie@theloopvillage.com", "inf_custom_MyVillageBuddyis1_Mackenzie");

    const [form, setForm] = useState({
        inf_custom_MyVillageBuddyis1: "",
    });
    const [disabled, setDisabled] = useState(true);
    const [arr, setArr] = useState(newArr);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
    };

    const scrollToBottom = () => {
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        if (form.inf_custom_MyVillageBuddyis1 !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [form]);

    const handleActiveArr = (index: number) => {
        newArr.fill(false);
        newArr[index] = true;
        setArr(newArr);
    };

    return (
        <div className={styles["choose-buddy-list"]}>
            {data.allBuddys.edges !== undefined &&
                data.allBuddys.edges.map((buddy, index) => {
                    const node = buddy && buddy.node;
                    return (
                        node && (
                            <ChooseBuddyCard
                                email={node.email}
                                image={node.image}
                                title={node.name}
                                availability={node.callAvailability}
                                about={node.about}
                                id={node && node.email && map.get(node.email)}
                                key={index}
                                arr={arr}
                                handleActiveArr={handleActiveArr}
                                scrollToBottom={scrollToBottom}
                                index={index}
                            />
                        )
                    );
                })}
            <form
                accept-charset="UTF-8"
                action="https://uqq968.infusionsoft.com/app/form/process/b8aed96f5f47377fd3834e615dd42c89"
                className={`infusion-form ${styles["infusion-form"]}`}
                id="inf_form_b8aed96f5f47377fd3834e615dd42c89"
                method="POST"
            >
                <input name="inf_form_xid" type="hidden" value="b8aed96f5f47377fd3834e615dd42c89" />
                <input name="inf_form_name" type="hidden" value="Choose My Buddy" />
                <input name="infusionsoft_version" type="hidden" value="1.70.0.531568" />
                <input name="inf_field_Email" type="hidden" value={email} />
                <div className="infusion-field">
                    <div className="infusion-radio">
                        <div className="options-container">
                            <span className="infusion-option">
                                <input
                                    id="inf_custom_MyVillageBuddyis1_Deirdre"
                                    name="inf_custom_MyVillageBuddyis1"
                                    type="radio"
                                    value="Deirdre"
                                    onChange={(e) => handleChange(e)}
                                />
                            </span>
                            <span className="infusion-option">
                                <input
                                    id="inf_custom_MyVillageBuddyis1_Pam"
                                    name="inf_custom_MyVillageBuddyis1"
                                    type="radio"
                                    value="Pam"
                                    onChange={(e) => handleChange(e)}
                                />
                                {/* <label htmlFor="inf_custom_MyVillageBuddyis1_Pam">Pam</label> */}
                            </span>
                            <span className="infusion-option">
                                <input
                                    id="inf_custom_MyVillageBuddyis1_Ree"
                                    name="inf_custom_MyVillageBuddyis1"
                                    type="radio"
                                    value="Ree"
                                    onChange={(e) => handleChange(e)}
                                />
                                {/* <label htmlFor="inf_custom_MyVillageBuddyis1_Ree">Ree</label> */}
                            </span>
                            <span className="infusion-option">
                                <input
                                    id="inf_custom_MyVillageBuddyis1_Ayesha"
                                    name="inf_custom_MyVillageBuddyis1"
                                    type="radio"
                                    value="Ayesha"
                                    onChange={(e) => handleChange(e)}
                                />
                                {/* <label htmlFor="inf_custom_MyVillageBuddyis1_Ayesha">Ayesha</label> */}
                            </span>
                            <span className="infusion-option">
                                <input
                                    id="inf_custom_MyVillageBuddyis1_Mackenzie"
                                    name="inf_custom_MyVillageBuddyis1"
                                    type="radio"
                                    value="Mackenzie"
                                    onChange={(e) => handleChange(e)}
                                />
                                {/* <label htmlFor="inf_custom_MyVillageBuddyis1_Mackenzie">Mackenzie</label> */}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`infusion-submit ${styles["infusion-submit"]}`}>
                    <button
                        className="infusion-recaptcha"
                        id="recaptcha_b8aed96f5f47377fd3834e615dd42c89"
                        type="submit"
                        disabled={disabled}
                    >
                        Submit My Selection
                    </button>
                </div>
            </form>
            <script
                type="text/javascript"
                src="https://uqq968.infusionsoft.app/app/webTracking/getTrackingCode"
                async
                defer
            ></script>
            <script
                type="text/javascript"
                src="https://uqq968.infusionsoft.com/resources/external/recaptcha/production/recaptcha.js?b=1.70.0.531568"
                async
                defer
            ></script>
            <script
                src="https://www.google.com/recaptcha/api.js?onload=onloadInfusionRecaptchaCallback&render=explicit"
                async
                defer
            ></script>
            <script
                type="text/javascript"
                src="https://uqq968.infusionsoft.com/app/timezone/timezoneInputJs?xid=b8aed96f5f47377fd3834e615dd42c89"
                async
                defer
            ></script>
            <script
                type="text/javascript"
                src="https://uqq968.infusionsoft.com/js/jquery/jquery-3.3.1.js"
                async
                defer
            ></script>
            <script
                type="text/javascript"
                src="https://uqq968.infusionsoft.app/app/webform/overwriteRefererJs"
                async
                defer
            ></script>
        </div>
    );
};
export default ChooseBuddyList;
