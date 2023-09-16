import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../Style/ThankYou/thankyou.module.scss";
import { useRouter } from "next/router";
import { useUser } from "../../Authenticate/UserContext";

const PersonalDetails = () => {
    const router = useRouter();
    const { user, userDetails } = useUser();
    const [form, setForm] = useState<{
        inf_field_Title: string;
        inf_field_FirstName: string;
        inf_field_LastName: string;
        inf_field_Email: string;
        inf_field_Phone1: string;
        inf_custom_WhatTechnologyareyouusingtoaccesscalls: Array<string>;
    }>({
        inf_field_Title: "",
        inf_field_FirstName: "",
        inf_field_LastName: "",
        inf_field_Email: "",
        inf_field_Phone1: "",
        inf_custom_WhatTechnologyareyouusingtoaccesscalls: [],
    });
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
    };
    const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        let selectedValues: Array<string> = [];
        if (name === "inf_custom_WhatTechnologyareyouusingtoaccesscalls") {
            selectedValues = [...form.inf_custom_WhatTechnologyareyouusingtoaccesscalls];
        }
        if (checked) {
            selectedValues.push(value);
        } else {
            const index = selectedValues.indexOf(value);
            if (index !== -1) {
                selectedValues.splice(index, 1);
            }
        }

        setForm((prevForm) => ({
            ...prevForm,
            [name]: selectedValues,
        }));
    };

    useEffect(() => {
        if (userDetails.buddy && userDetails.buddy !== undefined) {
            router.push({
                pathname: `/UI/Buddy/${userDetails.buddy}`,
            });
        }
    }, [userDetails, router]);

    useEffect(() => {
        if (
            form.inf_field_Title !== "" &&
            form.inf_field_FirstName !== "" &&
            form.inf_custom_WhatTechnologyareyouusingtoaccesscalls.length !== 0 &&
            form.inf_field_LastName !== "" &&
            form.inf_field_Email !== "" &&
            form.inf_field_Phone1 !== ""
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [form]);

    return (
        <div>
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/pikaday/1.5.1/css/pikaday.min.css"
                rel="stylesheet"
                type="text/css"
            />
            <form
                accept-charset="UTF-8"
                action="https://uqq968.infusionsoft.com/app/form/process/83b39c61430c148beeaad4d9059b144e"
                className={`infusion-form ${styles["infusion-form"]}`}
                id="inf_form_83b39c61430c148beeaad4d9059b144e"
                method="POST"
            >
                <input name="inf_form_xid" type="hidden" value="83b39c61430c148beeaad4d9059b144e" />
                <input name="inf_form_name" type="hidden" value="Buddy Intake Form 1Contact Details" />
                <input name="infusionsoft_version" type="hidden" value="1.70.0.533167" />
                {user.email && typeof user.email === "string" && (
                    <input name="inf_field_Email" type="hidden" value={user.email} />
                )}
                <div className={`infusion-container ${styles["infusion-container"]}`}>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_field_Title">Title</label>
                        <div className={`infusion-field-input-container ${styles["infusion-field-input-container"]}`}>
                            <select id="inf_field_Title" name="inf_field_Title" onChange={(e) => handleChange(e)}>
                                <option value="">Please select one</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Dr.">Dr.</option>
                                <option value="Ms.">Ms.</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={`infusion-container ${styles["infusion-container"]}`}>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_field_FirstName">First Name*</label>
                        <input
                            id="inf_field_FirstName"
                            name="inf_field_FirstName"
                            placeholder="First name"
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={form.inf_field_FirstName}
                        />
                    </div>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_field_LastName">Last Name*</label>
                        <input
                            id="inf_field_LastName"
                            name="inf_field_LastName"
                            placeholder="Last name"
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={form.inf_field_LastName}
                        />
                    </div>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_field_Phone1">Best Contact Number*</label>
                        <input
                            id="inf_field_Phone1"
                            name="inf_field_Phone1"
                            placeholder="Enter phone number"
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={form.inf_field_Phone1}
                        />
                    </div>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_field_Birthday">Birthday</label>
                        <div className="infusion-calendar-wrapper">
                            <script
                                src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.0/moment.min.js"
                                type="text/javascript"
                                async
                                defer
                            ></script>
                            <script
                                src="https://cdnjs.cloudflare.com/ajax/libs/pikaday/1.5.1/pikaday.min.js"
                                type="text/javascript"
                                async
                                defer
                            ></script>
                            <input
                                className="infusion-field-input-container infusion-date-input"
                                id="inf_field_Birthday"
                                name="inf_field_Birthday"
                                placeholder="Birthday"
                                type="date"
                            />
                        </div>
                    </div>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_WhatTechnologyareyouusingtoaccesscalls">
                            What Technology are you using to access calls*
                        </label>
                        <div className={`infusion-checkbox-group ${styles["infusion-checkbox-group"]}`}>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Computer - Mac"
                                    name="inf_custom_WhatTechnologyareyouusingtoaccesscalls"
                                    value="Computer - Mac"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Computer - Mac">Computer - Mac</label>
                            </div>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Computer - PC"
                                    name="inf_custom_WhatTechnologyareyouusingtoaccesscalls"
                                    value="Computer - PC"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Computer - PC">Computer - PC</label>
                            </div>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Phone - iPhone"
                                    name="inf_custom_WhatTechnologyareyouusingtoaccesscalls"
                                    value="Phone - iPhone"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Phone - iPhone">Phone - iPhone</label>
                            </div>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Phone - Android"
                                    name="inf_custom_WhatTechnologyareyouusingtoaccesscalls"
                                    value="Phone - Android"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Phone - Android">Phone - Android</label>
                            </div>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Tablet - iPad"
                                    name="inf_custom_WhatTechnologyareyouusingtoaccesscalls"
                                    value="Tablet - iPad"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Tablet - iPad">Tablet - iPad</label>
                            </div>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Tablet - Android"
                                    name="inf_custom_WhatTechnologyareyouusingtoaccesscalls"
                                    value="Tablet - Android"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Tablet - Android">Tablet - Android</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`infusion-submit ${styles["infusion-submit"]}`}>
                    <button
                        className="infusion-recaptcha"
                        id="recaptcha_83b39c61430c148beeaad4d9059b144e"
                        type="submit"
                        disabled={disabled}
                    >
                        Next
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
                src="https://uqq968.infusionsoft.com/resources/external/recaptcha/production/recaptcha.js?b=1.70.0.533167"
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
                src="https://uqq968.infusionsoft.com/app/timezone/timezoneInputJs?xid=83b39c61430c148beeaad4d9059b144e"
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
export default PersonalDetails;
