import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../Style/ThankYou/thankyou.module.scss";
import { useUser } from "../../Authenticate/UserContext";

const HomeDetails = () => {
    const { user } = useUser();
    const [form, setForm] = useState({
        inf_custom_CommunityName: "",
        inf_custom_LivingSituation: "",
    });
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        if (form.inf_custom_CommunityName !== "" && form.inf_custom_LivingSituation !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [form]);

    return (
        <div>
            <form
                accept-charset="UTF-8"
                action="https://uqq968.infusionsoft.com/app/form/process/6ef12c0c4244e99dbb0272164a5b6822"
                className={`infusion-form ${styles["infusion-form"]}`}
                id="inf_form_6ef12c0c4244e99dbb0272164a5b6822"
                method="POST"
            >
                <input name="inf_form_xid" type="hidden" value="6ef12c0c4244e99dbb0272164a5b6822" />
                <input name="inf_form_name" type="hidden" value="Buddy Intake Form 2&#a;Home Details" />
                <input name="infusionsoft_version" type="hidden" value="1.70.0.531568" />
                {user.email && typeof user.email === "string" && (
                    <input name="inf_field_Email" type="hidden" value={user.email} />
                )}
                <div className={`infusion-field ${styles["infusion-field"]}`}>
                    <label htmlFor="inf_custom_CommunityName">Community Name or Private Home*</label>
                    <input
                        id="inf_custom_CommunityName"
                        name="inf_custom_CommunityName"
                        placeholder="Community name or private home"
                        type="text"
                        onChange={(e) => handleChange(e)}
                        value={form.inf_custom_CommunityName}
                    />
                </div>
                <div className={`infusion-field ${styles["infusion-field"]}`}>
                    <label htmlFor="inf_custom_LivingSituation">Living Situation*</label>
                    <div className={`infusion-field-input-container ${styles["infusion-field-input-container"]}`}>
                        <select
                            id="inf_custom_LivingSituation"
                            name="inf_custom_LivingSituation"
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="">Please select one</option>
                            <option value="No Caregiver">No Caregiver</option>
                            <option value="Caregiver">Caregiver</option>
                        </select>
                    </div>
                </div>
                <div className={`infusion-container ${styles["infusion-container"]}`}>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_CaregiverName">Caregiver Name</label>
                        <input
                            id="inf_custom_CaregiverName"
                            name="inf_custom_CaregiverName"
                            placeholder="Caregiver name"
                            type="text"
                        />
                    </div>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_SpousesName">Spouse&apos;s Name</label>
                        <input
                            id="inf_custom_SpousesName"
                            name="inf_custom_SpousesName"
                            placeholder="Spouse's name"
                            type="text"
                        />
                    </div>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_Caregiverphonenumber">Caregiver phone number</label>
                        <input
                            id="inf_custom_Caregiverphonenumber"
                            name="inf_custom_Caregiverphonenumber"
                            placeholder="Caregiver phone number"
                            type="text"
                        />
                    </div>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_SpouseInformation">Spouse Information</label>
                        <div className={`infusion-field-input-container ${styles["infusion-field-input-container"]}`}>
                            <select id="inf_custom_SpouseInformation" name="inf_custom_SpouseInformation">
                                <option value="">Please select one</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widow/Widower">Widow/Widower</option>
                            </select>
                        </div>
                    </div>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_Caregiveradditionaldetails">Caregiver additional details</label>
                        <textarea
                            cols={24}
                            id="inf_custom_Caregiveradditionaldetails"
                            name="inf_custom_Caregiveradditionaldetails"
                            placeholder="Caregiver additional details"
                            rows={5}
                        ></textarea>
                    </div>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_Detailsaboutspouse">Details about spouse</label>
                        <textarea
                            cols={24}
                            id="inf_custom_Detailsaboutspouse"
                            name="inf_custom_Detailsaboutspouse"
                            placeholder="Details about spouse"
                            rows={5}
                        ></textarea>
                    </div>
                </div>
                <div className={`infusion-submit ${styles["infusion-submit"]}`}>
                    <button
                        className="infusion-recaptcha"
                        id="recaptcha_6ef12c0c4244e99dbb0272164a5b6822"
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
                src="https://uqq968.infusionsoft.com/app/timezone/timezoneInputJs?xid=6ef12c0c4244e99dbb0272164a5b6822"
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
export default HomeDetails;
