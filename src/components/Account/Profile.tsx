import { Avatar } from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import styles from "./Style/profile.module.scss";
import Link from "next/link";
import moment from "moment";
import client from "../../apolloClient";
import { updateUserDetailQuery } from "./Queries";
import { fetchCountryCodes, toCapitalizeLetter, validateChange } from "../../Functions/functions";
import InputField from "../InputField/InputField";
import TextAreaField from "../TextAreaField/TextAreaField";
import ErrorBox from "../ErrorBox/ErrorBox";
import Loader2 from "../Loader/Loader2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import CalenderIcon from "../../icons/CalenderIcon";
import PhoneBox from "../PhoneBox/PhoneBox";
import DeleteIcon from "../../icons/DeleteIcon";
import { ToastContainer, Toast } from "react-bootstrap";
import { handleProfileChange, uploadImageToCloudflare, uploadImageToHasura } from "../../Functions/Account/function";
import { useUser } from "../Authenticate/UserContext";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const Profile = () => {
    const { user, userDetails } = useUser();
    const [form, setForm] = useState<{
        firstName?: string;
        lastName?: string;
        birthDay?: string;
        aboutMe?: string;
        email?: string;
        phone?: string;
        phone2?: string;
        selected: string;
        countryCode: string;
    }>({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        birthDay:
            userDetails.birthDay && userDetails.aboutMe !== "" ? moment(userDetails.birthDay).format("yyyy-MM-DD") : "",
        aboutMe: userDetails.aboutMe,
        email: userDetails.email,
        phone: userDetails.phone,
        phone2: userDetails.phone,
        selected: "US",
        countryCode: "+1",
    });
    const [error, setError] = useState<{
        firstNameErrorMessage?: string;
        lastNameErrorMessage?: string;
        emailErrorMessage?: string;
        phoneErrorMessage?: string;
    }>({
        firstNameErrorMessage: "",
        lastNameErrorMessage: "",
        emailErrorMessage: "",
        phoneErrorMessage: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loader, setLoader] = useState<boolean>(false);
    const [btnText, setBtnText] = useState<string>("Save Changes");
    const [countryCodeList, setCountryCodeList] = useState<
        Array<{ countryName: string; countryCode: string; code: string }> | []
    >([]);
    const hiddenFileInput: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [showToast, setShowToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("");
    const [toastType, setToastType] = React.useState("");
    const [profileImageId, setProfileimageId] = useState<string>("");

    // Below Function will be called when profile field change.
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = name === "phone" ? e.target.value.replace(/\D/g, "") : e.target.value;
        if (name === "phone" && value.length > 15) {
            return;
        }
        setForm({ ...form, [name]: value });
        validateChange(name, value, setError, error, "profile");
    };

    // Below Function will be called when profile date(Birthday) field change.
    const handleChange2 = (value: string | null | undefined) => {
        if (value) {
            const date = new Date(value);
            const formattedDate = moment(date).format("yyyy-MM-DD");
            setForm({ ...form, birthDay: formattedDate });
        }
    };

    // api call to update user details profile on Keap.
    const updateUserOnKeap = async () => {
        const contactId = userDetails.contactId;
        const response = await fetch(`/api/updateProfile`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contactId: contactId,
                aboutMe: form.aboutMe,
                birthDay: form.birthDay,
                phone: userDetails.phone?.trim()
                    ? form.phone2?.trim()
                    : form.phone?.trim()
                    ? form.countryCode + form?.phone?.replaceAll("-", "").replaceAll(" ", "")
                    : null,
                email: form.email?.trim(),
            }),
        });
        if (response.status >= 400) {
            setErrorMessage("Something is wrong...please try again later.");
            setBtnText("Save Change");
            setSuccessMessage("");
            setLoader(false);
            return;
        }
        setLoader(false);
        const newUserDetail = {
            ...userDetails,
            birthDay: form.birthDay,
            aboutMe: form.aboutMe,
            email: form.email?.trim(),
            phone: userDetails.phone?.trim()
                ? form.phone2?.trim()
                : form.phone?.trim()
                ? form.countryCode + form?.phone?.replaceAll("-", "").replaceAll(" ", "")
                : null,
        };
        localStorage.setItem("userDetail", JSON.stringify(newUserDetail));
        setSuccessMessage("Your Profile has been updated Successfully");
        setErrorMessage("");
        setBtnText("Save Change");
    };

    // api call to update user details profile on Hasura cloud.
    const updateUserOnHasura = () => {
        client
            .mutate({
                variables: {
                    contactId: Number(userDetails.contactId),
                    birthDay: form.birthDay,
                    aboutMe: form.aboutMe,
                    email: form.email?.trim(),
                    phone: userDetails.phone?.trim()
                        ? form.phone2?.trim()
                        : form.phone?.trim()
                        ? form.countryCode + form?.phone?.replaceAll("-", "").replaceAll(" ", "")
                        : null,
                },
                mutation: updateUserDetailQuery,
            })
            .then(() => {
                updateUserOnKeap();
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setBtnText("Save Change");
                setSuccessMessage("");
                setLoader(false);
            });
    };

    // Below Function will be called when submit button click and updateUserOnHasura function invoked.
    const handleSubmit = async () => {
        setLoader(true);
        setErrorMessage("");
        setSuccessMessage("");
        setBtnText("Saving Change...");
        updateUserOnHasura();
    };

    // Below function will set country calling code based on the countrycode.
    const handleSelect = (code: string) => {
        const country = countryCodeList.filter((item) => item.code === code);
        setForm({ ...form, selected: code, countryCode: country[0].countryCode });
    };

    //Below useEffect will be triggered when any userDetails change, then setForm state value according to user.
    useEffect(() => {
        setForm({
            ...form,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            birthDay:
                userDetails.birthDay && userDetails.birthDay !== ""
                    ? moment(userDetails.birthDay).format("yyyy-MM-DD")
                    : "",
            aboutMe: userDetails.aboutMe,
            email: userDetails.email,
            phone: userDetails.phone,
            phone2: userDetails.phone,
        });
        const profileImageUrl = userDetails.profileImage;
        if (profileImageUrl) {
            const profileImageUrlArr = profileImageUrl.split("/");
            const imageId = profileImageUrlArr[profileImageUrlArr.length - 2];
            setProfileimageId(imageId);
        }
    }, [userDetails]);

    //Below useEffect will run triggered to fetch country list with country code and country calling code.
    useEffect(() => {
        fetchCountryCodes(setCountryCodeList);
    }, []);

    const handleImageClick = () => {
        if (hiddenFileInput.current !== null) {
            hiddenFileInput.current.click();
        }
    };

    useEffect(() => {
        if (image && imageUrl) {
            uploadImageToCloudflare(
                userDetails,
                image,
                imageUrl,
                setToastMessage,
                setToastType,
                setShowToast,
                profileImageId,
            );
        }
    }, [image, imageUrl]);

    return (
        <div className={styles["profile"]}>
            {loader && <Loader2 />}
            <ToastContainer
                style={{ position: "fixed", bottom: "0", left: "50%", transform: "translateX(-50%)" }}
                className="p-3"
            >
                {toastMessage && (
                    <Toast
                        show={showToast}
                        onClose={() => setShowToast(false)}
                        className={`bg-${toastType} text-white`}
                    >
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                )}
            </ToastContainer>
            <div className={styles["profile-avatar-or-heading"]}>
                <div
                    style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}
                >
                    <div className={styles["profile-avatar"]} style={{ position: "relative" }}>
                        <input
                            id="image-upload-input"
                            type="file"
                            name="image"
                            onChange={(event) =>
                                handleProfileChange(
                                    event,
                                    setToastMessage,
                                    setToastType,
                                    setShowToast,
                                    setImageUrl,
                                    setImage,
                                )
                            }
                            ref={hiddenFileInput}
                            style={{ display: "none" }}
                        />
                        <Avatar
                            alt="upload image"
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : userDetails.profileImage
                                    ? userDetails.profileImage
                                    : ""
                            }
                            sx={{
                                height: "160px",
                                width: "160px",
                                fontSize: "50px",
                                border: image || userDetails.profileImage?.trim() ? "2px solid #d92d3e" : "",
                            }}
                        >
                            {form.firstName?.toUpperCase().slice(0, 1)}
                        </Avatar>
                        {(userDetails.profileImage?.trim() || image) && (
                            <span
                                className={styles["profile-delete-icon"]}
                                onClick={() =>
                                    uploadImageToHasura(
                                        setToastMessage,
                                        setToastType,
                                        setShowToast,
                                        "",
                                        userDetails,
                                        profileImageId,
                                        "delete",
                                    )
                                }
                            >
                                <span>
                                    <DeleteIcon />
                                </span>
                            </span>
                        )}
                    </div>
                    <p className={styles["profile-change-heading"]} onClick={handleImageClick}>
                        {userDetails.profileImage ? "Change Picture" : "Add Picture"}
                    </p>
                </div>
            </div>
            <div className={styles["profile-form"]}>
                <div className={styles["infusion-form"]}>
                    <div style={{ backgroundColor: "#ffffff", opacity: "0.5" }}>
                        <InputField
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={toCapitalizeLetter(form.firstName)}
                            placeholder=""
                            handleChange={handleChange}
                            label="First Name"
                            disabled={true}
                            errorMessage=""
                            required={true}
                        />
                    </div>
                    <div style={{ backgroundColor: "#ffffff", opacity: "0.5" }}>
                        {" "}
                        <InputField
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={toCapitalizeLetter(form.lastName)}
                            placeholder=""
                            handleChange={handleChange}
                            label="Last Name"
                            disabled={true}
                            errorMessage=""
                            required={true}
                        />
                    </div>
                    <div style={user.email ? { backgroundColor: "#ffffff", opacity: "0.5" } : {}}>
                        <InputField
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                            type="text"
                            value={form.email}
                            handleChange={handleChange}
                            label="Email Address"
                            disabled={user.email ? true : false}
                            errorMessage={user.email ? "" : error.emailErrorMessage}
                            required={user.email ? true : false}
                        />
                    </div>
                    {userDetails?.phone ? (
                        <div style={user.phone_number ? { backgroundColor: "#ffffff", opacity: "0.5" } : {}}>
                            <InputField
                                id="phone2"
                                name="phone2"
                                placeholder="e.g. +13238256557"
                                type="text"
                                value={form.phone2}
                                disabled={user.phone_number ? true : false}
                                handleChange={handleChange}
                                label="Phone"
                                errorMessage={user.phone_number ? "" : error.phoneErrorMessage}
                                required={user.phone_number ? true : false}
                            />
                        </div>
                    ) : (
                        <PhoneBox
                            selected={form.selected}
                            countryCode={form.countryCode}
                            value={form.phone}
                            errorMessage={error.phoneErrorMessage}
                            countryCodeList={countryCodeList}
                            handleChange={handleChange}
                            handleSelect={handleSelect}
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                        />
                    )}

                    <div className={styles["profile-date"]}>
                        <label htmlFor="">Birthday</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ maxHeight: 50 }}>
                            {" "}
                            <DesktopDatePicker
                                value={form.birthDay}
                                onChange={handleChange2}
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="mm/dd/yyyy" sx={{ maxHeight: 50 }} />
                                )}
                                components={{ OpenPickerIcon: CalenderIcon }}
                                className="inputField-datepicker"
                                PopperProps={{ className: "inputField-datepicker-root" }}
                            />{" "}
                        </LocalizationProvider>
                    </div>

                    {/* <InputField
                        id="birthDay"
                        name="birthDay"
                        type="date"
                        placeholder=""
                        value={form.birthDay}
                        handleChange={handleChange}
                        label="Birthday"
                    /> */}
                    <TextAreaField
                        cols={24}
                        id="aboutMe"
                        name="aboutMe"
                        placeholder="Please tell us something about yourself"
                        handleChange={handleChange}
                        value={form.aboutMe}
                        rows={10}
                        label="About Me"
                    />
                    <ErrorBox successMessage={successMessage} errorMessage={errorMessage} />
                    <div className={`${styles["infusion-submit"]}`}>
                        <button onClick={() => handleSubmit()}>{btnText}</button>
                    </div>
                </div>
                <div className={styles["profile-deactive-btn-holder"]}>
                    <div>
                        <h1>Account</h1>
                        <h3>Temporarily deactivate my account</h3>
                    </div>
                    <Link href={"/UI/Footer/Cancellation Process"} passHref>
                        <button className={styles["profile-btn-deactivate"]}>Deactivate</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Profile;
