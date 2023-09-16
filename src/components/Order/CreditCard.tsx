import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Style/creditCard.module.scss";
import InputField from "../InputField/InputField";
import { validateChange } from "../../Functions/functions";

const CreditCard: React.FunctionComponent = () => {
    const [form, setForm] = useState<{
        name: string;
        cardNo: string;
        expiryMonth: string;
        expiryYear: string;
        cardType: string;
        cvv: string;
    }>({
        name: "",
        cardNo: "",
        expiryMonth: "",
        expiryYear: "",
        cardType: "",
        cvv: "",
    });
    const [error, setError] = useState<{
        nameErrorMessage?: string;
        cardNoErrorMessage?: string;
        expiryMonthErrorMessage?: string;
        expiryYearErrorMessage?: string;
        cardTypeErrorMessage?: string;
        cvvErrorMessage?: string;
    }>({
        nameErrorMessage: "",
        cardNoErrorMessage: "",
        expiryMonthErrorMessage: "",
        expiryYearErrorMessage: "",
        cardTypeErrorMessage: "",
        cvvErrorMessage: "",
    });
    const [button1, setButton1] = useState({
        btnText: "Submit",
        disabled: true,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
        validateChange(name, value, setError, error);
    };

    useEffect(() => {
        if (
            form.name !== "" &&
            form.cardNo !== "" &&
            form.expiryMonth &&
            form.expiryYear &&
            form.cvv &&
            form.cardType &&
            error.nameErrorMessage === "" &&
            error.cardNoErrorMessage === "" &&
            error.expiryMonthErrorMessage === "" &&
            error.expiryYearErrorMessage === "" &&
            error.cardTypeErrorMessage === "" &&
            error.cvvErrorMessage === ""
        ) {
            setButton1({ ...button1, disabled: false });
        } else {
            setButton1({ ...button1, disabled: true });
        }
    }, [form, error]);

    return (
        <div className={styles["creditCard"]}>
            <InputField
                placeholder="Enter Name on Card"
                value={form.name}
                id="name"
                name="name"
                handleChange={handleChange}
                type="text"
                errorMessage={error.nameErrorMessage}
                label="Name on card"
                required={true}
            />
            <InputField
                placeholder="Enter Card Type"
                value={form.cardType}
                id="cardType"
                name="cardType"
                handleChange={handleChange}
                type="text"
                errorMessage={error.cardTypeErrorMessage}
                label="Card Type"
                required={true}
            />

            <InputField
                placeholder="XXXXXXXXXXXXXXXX"
                value={form.cardNo}
                id="cardNo"
                name="cardNo"
                handleChange={handleChange}
                type="text"
                errorMessage={error.cardNoErrorMessage}
                label="Card Number"
                required={true}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridGap: "10px" }}>
                <InputField
                    placeholder="XX"
                    value={form.expiryMonth}
                    id="expiryMonth"
                    name="expiryMonth"
                    handleChange={handleChange}
                    type="text"
                    errorMessage={error.expiryMonthErrorMessage}
                    label="Exp. Mon."
                    required={true}
                />
                <InputField
                    placeholder="XXXX"
                    value={form.expiryYear}
                    id="expiryYear"
                    name="expiryYear"
                    handleChange={handleChange}
                    type="text"
                    errorMessage={error.expiryYearErrorMessage}
                    label="Exp. Year"
                    required={true}
                />
                <InputField
                    placeholder="XXX"
                    value={form.cvv}
                    id="cvv"
                    name="cvv"
                    handleChange={handleChange}
                    type="text"
                    errorMessage={error.cvvErrorMessage}
                    label="CVV"
                    required={true}
                />
                <div className={styles["creditCard-submit"]}>
                    <button type="button" disabled={button1.disabled}>
                        {button1.btnText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;
