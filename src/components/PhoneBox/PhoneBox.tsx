import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./phoneBox.module.scss";
import FlagsSelect from "react-flags-select";

interface PhoneBoxProps {
    selected: string;
    countryCode: string;
    errorMessage?: string;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelect: (code: string) => void;
    countryCodeList: Array<{ countryName: string; countryCode: string; code: string }> | [];
    id: string;
    name: string;
    value?: string;
    placeholder: string;
    note?: string;
}

const PhoneBox = ({
    selected,
    countryCode,
    value,
    id,
    name,
    errorMessage,
    handleChange,
    handleSelect,
    countryCodeList,
    placeholder,
    note,
}: PhoneBoxProps) => {
    const [countryList, setCountryList] = useState<Array<string> | []>([]);

    useEffect(() => {
        if (countryCodeList?.length) {
            setCountryList(countryCodeList.map((item) => item.code));
        }
    }, [countryCodeList]);

    return (
        <div className={styles["phoneBox"]}>
            <label htmlFor="phone">
                Phone Number<span>*</span>
            </label>
            <div className={styles["phoneBox-field"]}>
                <FlagsSelect
                    searchable={true}
                    countries={countryList}
                    onSelect={handleSelect}
                    selected={selected}
                    showSelectedLabel={false}
                    selectedSize={22}
                    className="phoneBox-flags"
                />
                <div>({countryCode})&nbsp;-</div>
                <div className={styles["phoneBox-input"]}>
                    <input
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        type="text"
                        onChange={(e) => handleChange(e)}
                        value={value}
                        autoComplete="off"
                        inputMode="numeric"
                    />
                </div>
            </div>
            {note && <span className={styles["phoneBox-note"]}>{note}</span>}
            {errorMessage && <span className={styles["phoneBox-error"]}>{errorMessage}</span>}
        </div>
    );
};
export default PhoneBox;
