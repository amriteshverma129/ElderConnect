import React, { useState, useEffect, MouseEvent } from "react";
import { Modal } from "@mui/material";
import styles from "./style/filterModal.module.scss";
//import Rating from "@mui/material/Rating";
import CrossIcon from "../../icons/CrossIcon";
import { setStartEndDate, validateDate } from "../../Functions/functions";
import Categories from "../../../Categories.json";
import { FilterModalProps } from "./Type";
import AlertBoxModal from "./AlertBoxModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import CalenderIcon from "../../icons/CalenderIcon";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers";
// import TimeIcon from "../../icons/TimeIcon";
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function FilterModal(props: FilterModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [rating, setRating] = useState<number | null>(null);
    const [categories, setCategories] = useState<Array<string> | []>([]);
    const [message, setMessage] = useState("");
    const [popUp, setPopUp] = useState(false);

    //Below useEffect will be triggred when props value change and setStates all Value according to props.
    useEffect(() => {
        setStartDate(props.filterObj.startDate);
        setEndDate(props.filterObj.endDate);
        setStartTime(props.filterObj.startTime);
        setEndTime(props.filterObj.endTime);
        setRating(props.filterObj.rating);
        setCategories(props.filterObj.categories);
    }, [props]);

    //Below function will be called when click on clear all button, then clear filter value in text filed blank.
    const handleClear = () => {
        setStartDate("");
        setEndDate("");
        setStartTime("");
        setEndTime("");
        setRating(null);
        setCategories([]);
        const obj = {
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            eventStartTime: "",
            eventEndTime: "",
            rating: null,
            categories: [],
        };
        props.setFilterObj(obj);
    };

    // Below Function will be called when click on Apply Filters button and get all details on selected fiters value.
    const handleApply = () => {
        validateDate(startDate, endDate)
            .then(() => {
                // setMessage("");
                // setPopUp(false);
                // validateTime(startTime, endTime, startDate, endDate)
                //     .then(() => {
                setMessage("");
                setPopUp(false);
                const dates = setStartEndDate(startDate, endDate, startTime, endTime);
                const eventStartTime = dates[0];
                const eventEndTime = dates[1];
                const obj = {
                    startDate: startDate,
                    endDate: endDate,
                    startTime: startTime,
                    endTime: endTime,
                    eventStartTime: eventStartTime,
                    eventEndTime: eventEndTime,
                    rating: rating,
                    categories: categories,
                };
                props.setFilterObj(obj);
                handleClose();
                // })
                // .catch((error) => {
                //     setPopUp(true);
                //     setMessage(error);
                // });
            })
            .catch((error) => {
                setPopUp(true);
                setMessage(error);
            });
    };

    // Below function will be called when user select any category then find category if exits then return list of category.
    const handleCategoryClick = (event: MouseEvent<HTMLButtonElement>) => {
        const eventTarget = event.currentTarget.name;
        const name = eventTarget;
        if (categories.some((category) => category.toLowerCase() === name.toLowerCase())) {
            setCategories([...categories.filter((category) => category !== name)]);
        } else {
            setCategories([...categories, name]);
        }
    };

    const handleChange = (value: string | null | undefined, dateType: "start" | "end") => {
        if (value) {
            const date = new Date(value);
            const formattedDate = moment(date).format("MM/DD/YYYY");

            if (dateType === "start") {
                setStartDate(formattedDate);
            } else if (dateType === "end") {
                setEndDate(formattedDate);
            }
        }
    };

    //Below function will be called when find list according to rating.
    // const handleRatingClick = (rating: number) => {
    //     setRating(rating);
    // };
    return (
        <div>
            <div onClick={handleOpen}>{props.children}</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                id="filter-modal"
            >
                <div className={styles["filter-modal-holder"]}>
                    {popUp && message !== "" && <AlertBoxModal open2={popUp} message={message} setPopUp={setPopUp} />}
                    <div className={styles["filter-modal-heading-cross-holder"]}>
                        <div>Event filters</div>
                        <div onClick={handleClose}>
                            <CrossIcon />
                        </div>
                    </div>
                    <div className={styles["filter-modal-subHeading"]}>
                        Select Your Preference & Click on Apply Filter.
                    </div>
                    <div className={styles["filter-title"]}>Choose from below Categories</div>
                    <div className={styles["filter-categories"]}>
                        {Categories.map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    className={
                                        categories.some(
                                            (category) => category.toLowerCase() === item.category.toLowerCase(),
                                        )
                                            ? styles["filter-modal-btn-active"]
                                            : styles["filter-modal-btn"]
                                    }
                                    name={item.category.toLowerCase()}
                                    onClick={(e) => handleCategoryClick(e)}
                                >
                                    {item.category}
                                </button>
                            );
                        })}
                    </div>
                    <div className={styles["filter-title"]}>Pick your suitable dates</div>
                    <div className={styles["filter-modal-date-holder"]}>
                        <div className={styles["filter-modal-date"]}>
                            <span>From:</span>
                            {/* <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ maxHeight: 50 }}>
                                <DesktopDatePicker
                                    key={startDate}
                                    value={startDate}
                                    onChange={(value) => handleChange(value, "start")}
                                    renderInput={(params) => (
                                        <TextField {...params} placeholder="mm/dd/yyyy" sx={{ maxHeight: 50 }} />
                                    )}
                                    components={{ OpenPickerIcon: CalenderIcon }}
                                    className="inputField-datepicker inputField-filter-datepicker"
                                    PopperProps={{ className: "inputField-datepicker-root" }}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className={`${styles["filter-modal-date"]} ${styles["second-input"]}`}>
                            <span>To:</span>
                            {/* <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ maxHeight: 50 }}>
                                <DesktopDatePicker
                                    key={endDate}
                                    value={endDate}
                                    onChange={(value) => handleChange(value, "end")}
                                    renderInput={(params) => (
                                        <TextField {...params} placeholder="mm/dd/yyyy" sx={{ maxHeight: 50 }} />
                                    )}
                                    components={{ OpenPickerIcon: CalenderIcon }}
                                    className="inputField-datepicker inputField-filter-datepicker"
                                    PopperProps={{ className: "inputField-datepicker-root" }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    {/* <div className={styles["filter-title"]}>Pick your suitable time</div>
                    <div className={styles["filter-modal-time-holder"]}>
                        <div className={styles["filter-modal-time"]}>
                            <span>Starts:</span>
                            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} /> */}
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ maxHeight: 50 }}>
                            {" "}
                                <TimePicker
                                    value={startDate}
                                    onChange={(e) => {}}
                                    renderInput={(params) => <TextField {...params} sx={{ maxHeight: 50 }} />}
                                    components={{ OpenPickerIcon: TimeIcon }}
                                    className="inputField-datepicker inputField-filter-datepicker"
                                    PopperProps={{ className: "inputField-datepicker-root" }}
                                />{" "}
                            </LocalizationProvider> */}
                    {/* </div>
                        <div className={styles["filter-modal-time"]}>
                            <span>Ends:</span>
                            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles["filter-title"]}>Average user reviews</div>
                    <div className={styles["filter-modal-rating-holder"]}>
                        <div
                            className={
                                rating === 4
                                    ? `${styles["filter-modal-rating"]} ${styles["filter-modal-rating-active"]}`
                                    : `${styles["filter-modal-rating"]} ${styles["filter-modal-rating-no-active"]}`
                            }
                            onClick={() => handleRatingClick(4)}
                        >
                            <Rating
                                name="half-rating-read"
                                defaultValue={4}
                                precision={0.5}
                                readOnly
                                sx={{
                                    "& .MuiRating-iconFilled": {
                                        color: rating === 4 ? "white" : "black",
                                    },
                                    fontSize: "18px",
                                }}
                            />
                            <span>& up</span>
                        </div>
                        <div
                            className={
                                rating === 3
                                    ? `${styles["filter-modal-rating"]} ${styles["filter-modal-rating-active"]}`
                                    : `${styles["filter-modal-rating"]} ${styles["filter-modal-rating-no-active"]}`
                            }
                            onClick={() => handleRatingClick(3)}
                        >
                            <Rating
                                name="half-rating-read"
                                defaultValue={3}
                                precision={0.5}
                                readOnly
                                sx={{
                                    "& .MuiRating-iconFilled": {
                                        color: rating === 3 ? "white" : "black",
                                    },
                                    fontSize: "18px",
                                }}
                            />
                            <span>& up</span>
                        </div>
                        <div
                            className={
                                rating === 2
                                    ? `${styles["filter-modal-rating"]} ${styles["filter-modal-rating-active"]}`
                                    : `${styles["filter-modal-rating"]} ${styles["filter-modal-rating-no-active"]}`
                            }
                            onClick={() => handleRatingClick(2)}
                        >
                            <Rating
                                name="half-rating-read"
                                defaultValue={2}
                                precision={0.5}
                                readOnly
                                sx={{
                                    "& .MuiRating-iconFilled": {
                                        color: rating === 2 ? "white" : "black",
                                    },
                                    fontSize: "18px",
                                }}
                            />
                            <span>& up</span>
                        </div>
                        <div
                            className={
                                rating === 1
                                    ? `${styles["filter-modal-rating"]} ${styles["filter-modal-rating-active"]}`
                                    : `${styles["filter-modal-rating"]} ${styles["filter-modal-rating-no-active"]}`
                            }
                            onClick={() => handleRatingClick(1)}
                        >
                            <Rating
                                name="half-rating-read"
                                defaultValue={1}
                                precision={0.5}
                                readOnly
                                sx={{
                                    "& .MuiRating-iconFilled": {
                                        color: rating === 1 ? "white" : "black",
                                    },
                                    fontSize: "18px",
                                }}
                            />
                            <span>& up</span>
                        </div>
                    </div> */}
                    <div className={styles["filter-modal-btns"]}>
                        <button
                            className={styles["filter-modal-apply-btn"]}
                            onClick={() => {
                                handleApply();
                            }}
                        >
                            Apply filters
                        </button>
                        <button
                            className={styles["filter-modal-clearAll-btn"]}
                            onClick={() => {
                                handleClear();
                            }}
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
