import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../Style/ThankYou/thankyou.module.scss";
import { useUser } from "../../Authenticate/UserContext";

const FamilyDetails = () => {
    const { user } = useUser();
    const [form, setForm] = useState({
        inf_custom_ChildrenStepChildrenDetails: "",
        inf_custom_GrandChildren: "",
    });
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        if (form.inf_custom_ChildrenStepChildrenDetails !== "" && form.inf_custom_GrandChildren !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [form]);

    return (
        <div>
            <form
                accept-charset="UTF-8"
                action="https://uqq968.infusionsoft.com/app/form/process/0a7560671bb8a735680777e6fcba9fb0"
                className={`infusion-form ${styles["infusion-form"]}`}
                id="inf_form_0a7560671bb8a735680777e6fcba9fb0"
                method="POST"
            >
                <input name="inf_form_xid" type="hidden" value="0a7560671bb8a735680777e6fcba9fb0" />
                <input name="inf_form_name" type="hidden" value="Buddy Intake Form 3&#a;Family Details" />
                <input name="infusionsoft_version" type="hidden" value="1.70.0.531568" />
                {user.email && typeof user.email === "string" && (
                    <input name="inf_field_Email" type="hidden" value={user.email} />
                )}
                <div className={`infusion-container ${styles["infusion-container"]}`}>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_ChildrenStepChildrenDetails">Children/Step Children Details*</label>
                        <textarea
                            cols={24}
                            id="inf_custom_ChildrenStepChildrenDetails"
                            name="inf_custom_ChildrenStepChildrenDetails"
                            placeholder="Children/Step children details"
                            rows={5}
                            onChange={(e) => handleChange(e)}
                            value={form.inf_custom_ChildrenStepChildrenDetails}
                        ></textarea>
                    </div>
                    <div className={`infusion-field ${styles["infusion-field"]}`}>
                        <label htmlFor="inf_custom_GrandChildren">Grand Children*</label>
                        <textarea
                            cols={24}
                            id="inf_custom_GrandChildren"
                            name="inf_custom_GrandChildren"
                            placeholder="Grand children"
                            rows={5}
                            onChange={(e) => handleChange(e)}
                            value={form.inf_custom_GrandChildren}
                        ></textarea>
                    </div>
                </div>
                <div className={`infusion-field ${styles["infusion-field"]}`}>
                    <label htmlFor="inf_custom_FamilyContactInformation">Family Contact Information</label>
                    <textarea
                        cols={24}
                        id="inf_custom_FamilyContactInformation"
                        name="inf_custom_FamilyContactInformation"
                        placeholder="Family contact information"
                        rows={5}
                    ></textarea>
                </div>
                <div>
                    <div>&nbsp;</div>
                </div>
                <div className={`infusion-submit ${styles["infusion-submit"]}`}>
                    <button
                        className="infusion-recaptcha"
                        id="recaptcha_0a7560671bb8a735680777e6fcba9fb0"
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
                src="https://uqq968.infusionsoft.com/app/timezone/timezoneInputJs?xid=0a7560671bb8a735680777e6fcba9fb0"
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
export default FamilyDetails;
