import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../Style/ThankYou/thankyou.module.scss";
import { useUser } from "../../Authenticate/UserContext";

const AboutYou = () => {
    const { user } = useUser();
    const [form, setForm] = useState({
        inf_custom_DoyoustillDrive: "",
        inf_custom_Likes: "",
        inf_custom_Dislikes: "",
        inf_custom_Hobbies: "",
        inf_custom_MentalState: [],
        inf_custom_DescribemyPersonality: "",
        inf_custom_Availabilityforcalls: [],
        inf_custom_BestTimeforCalls: "",
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
        if (name === "inf_custom_Availabilityforcalls") {
            selectedValues = [...form.inf_custom_Availabilityforcalls];
        }
        if (name === "inf_custom_MentalState") {
            selectedValues = [...form.inf_custom_MentalState];
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
        if (
            form.inf_custom_DoyoustillDrive !== "" &&
            form.inf_custom_Likes !== "" &&
            form.inf_custom_Dislikes !== "" &&
            form.inf_custom_Hobbies !== "" &&
            form.inf_custom_MentalState.length !== 0 &&
            form.inf_custom_DescribemyPersonality !== "" &&
            form.inf_custom_Availabilityforcalls.length !== 0 &&
            form.inf_custom_BestTimeforCalls !== ""
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [form]);

    return (
        <div>
            <form
                accept-charset="UTF-8"
                action="https://uqq968.infusionsoft.com/app/form/process/783e012601c8b8851a47d72f08b6c4fe"
                className={`infusion-form ${styles["infusion-form"]}`}
                id="inf_form_783e012601c8b8851a47d72f08b6c4fe"
                method="POST"
            >
                <input name="inf_form_xid" type="hidden" value="783e012601c8b8851a47d72f08b6c4fe" />
                <input name="inf_form_name" type="hidden" value="Buddy Intake Form 4&#a;About You" />
                <input name="infusionsoft_version" type="hidden" value="1.70.0.531568" />
                {user.email && typeof user.email === "string" && (
                    <input name="inf_field_Email" type="hidden" value={user.email} />
                )}
                <div className={`infusion-field ${styles["infusion-field"]}`}>
                    <label htmlFor="inf_custom_DoyoustillDrive">Do you still drive*</label>
                    <div className={`infusion-field-input-container ${styles["infusion-field-input-container"]}`}>
                        <select
                            id="inf_custom_DoyoustillDrive"
                            name="inf_custom_DoyoustillDrive"
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="">Please select one</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
                <div className={`infusion-container ${styles["infusion-container"]}`}>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_Likes">Likes*</label>
                        <textarea
                            cols={24}
                            id="inf_custom_Likes"
                            name="inf_custom_Likes"
                            placeholder="Likes"
                            rows={5}
                            onChange={(e) => handleChange(e)}
                            value={form.inf_custom_Likes}
                        ></textarea>
                    </div>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_Dislikes">Dislikes*</label>
                        <textarea
                            cols={24}
                            id="inf_custom_Dislikes"
                            name="inf_custom_Dislikes"
                            placeholder="Dislikes"
                            rows={5}
                            onChange={(e) => handleChange(e)}
                            value={form.inf_custom_Dislikes}
                        ></textarea>
                    </div>
                </div>
                <div className={`infusion-field ${styles["infusion-field"]}`}>
                    <label htmlFor="inf_custom_Hobbies">Hobbies*</label>
                    <textarea
                        cols={24}
                        id="inf_custom_Hobbies"
                        name="inf_custom_Hobbies"
                        placeholder="Hobbies"
                        rows={5}
                        onChange={(e) => handleChange(e)}
                        value={form.inf_custom_Hobbies}
                    ></textarea>
                </div>
                <div className={`infusion-field ${styles["infusion-field"]}`}>
                    <label htmlFor="inf_custom_MentalState">Mental Ability*</label>
                    <div className={`infusion-checkbox-group ${styles["infusion-checkbox-group"]}`}>
                        <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                            <input
                                type="checkbox"
                                id="Self-Sufficient"
                                name="inf_custom_MentalState"
                                value="Self-Sufficient"
                                onChange={(e) => handleChange2(e)}
                            />
                            <label htmlFor="Self-Sufficient">Self-Sufficient</label>
                        </div>
                        <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                            <input
                                type="checkbox"
                                id="Need-assistance-with-Technology"
                                name="inf_custom_MentalState"
                                value="Need assistance with Technology"
                                onChange={(e) => handleChange2(e)}
                            />
                            <label htmlFor="Need-assistance-with-Technology">Need assistance with Technology</label>
                        </div>
                        <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                            <input
                                type="checkbox"
                                id="Need-assistance-with-Daily-Tasks"
                                name="inf_custom_MentalState"
                                value="Need assistance with Daily Tasks"
                                onChange={(e) => handleChange2(e)}
                            />
                            <label htmlFor="Need-assistance-with-Daily-Tasks">Need assistance with Daily Tasks</label>
                        </div>
                        <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                            <input
                                type="checkbox"
                                id="Early-stages-of-Dementia"
                                name="inf_custom_MentalState"
                                value="Early stages of Dementia"
                                onChange={(e) => handleChange2(e)}
                            />
                            <label htmlFor="Early-stages-of-Dementia">Early stages of Dementia</label>
                        </div>
                    </div>
                </div>
                <div className={`infusion-field ${styles["infusion-field"]}`}>
                    <label htmlFor="inf_custom_DescribemyPersonality">Describe Your Personality*</label>
                    <textarea
                        cols={24}
                        id="inf_custom_DescribemyPersonality"
                        name="inf_custom_DescribemyPersonality"
                        placeholder="Describe your personality"
                        rows={5}
                        onChange={(e) => handleChange(e)}
                        value={form.inf_custom_DescribemyPersonality}
                    ></textarea>
                </div>
                <div className={`infusion-container ${styles["infusion-container"]}`}>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_Availabilityforcalls">Best Days for Calls*</label>
                        <div className={`infusion-checkbox-group ${styles["infusion-checkbox-group"]}`}>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Monday"
                                    name="inf_custom_Availabilityforcalls"
                                    value="Monday"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Monday">Monday</label>
                            </div>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Tuesday"
                                    name="inf_custom_Availabilityforcalls"
                                    value="Tuesday"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Tuesday">Tuesday</label>
                            </div>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Wednesday"
                                    name="inf_custom_Availabilityforcalls"
                                    value="Wednesday"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Wednesday">Wednesday</label>
                            </div>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Thursday"
                                    name="inf_custom_Availabilityforcalls"
                                    value="Thursday"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Thursday">Thursday</label>
                            </div>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Friday"
                                    name="inf_custom_Availabilityforcalls"
                                    value="Friday"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Friday">Friday</label>
                            </div>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Saturday"
                                    name="inf_custom_Availabilityforcalls"
                                    value="Saturday"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Saturday">Saturday</label>
                            </div>
                            <div className={`infusion-checkbox ${styles["infusion-checkbox"]}`}>
                                <input
                                    type="checkbox"
                                    id="Sunday"
                                    name="inf_custom_Availabilityforcalls"
                                    value="Sunday"
                                    onChange={(e) => handleChange2(e)}
                                />
                                <label htmlFor="Sunday">Sunday</label>
                            </div>
                        </div>
                    </div>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_BestTimeforCalls">Best Time for Calls*</label>
                        <div className={`infusion-field-input-container ${styles["infusion-field-input-container"]}`}>
                            <select
                                id="inf_custom_BestTimeforCalls"
                                name="inf_custom_BestTimeforCalls"
                                onChange={(e) => handleChange(e)}
                            >
                                <option value="">Please select one</option>
                                <option value="Mornings">Mornings</option>
                                <option value="Afternoons">Afternoons</option>
                                <option value="Both work for me">Both work for me</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`infusion-submit ${styles["infusion-submit"]}`}>
                    <button
                        className="infusion-recaptcha"
                        id="recaptcha_783e012601c8b8851a47d72f08b6c4fe"
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
                src="https://uqq968.infusionsoft.com/app/timezone/timezoneInputJs?xid=783e012601c8b8851a47d72f08b6c4fe"
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
export default AboutYou;
