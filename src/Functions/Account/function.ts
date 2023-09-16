import { gql } from "@apollo/client";
import client from "../../apolloClient";
import { notificationType, userType } from "../../components/Account/Type";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
    getLatestNotificationQuery,
    getNotifcationsListBasedOnFilterQuery,
    getNotifcationsListQuery,
    getTotalUnreadNotificationsCountQuery,
    updateNotificationStatusQuery,
    updateUserNotificationStatusQuery,
} from "../../components/Account/Queries";
import moment from "moment";
import CustomError from "../../components/CustomError/CustomError";

export const showToastMessage = (
    message: string,
    type: string,
    time: number,
    setToastMessage: Dispatch<SetStateAction<string>>,
    setToastType: Dispatch<SetStateAction<string>>,
    setShowToast: Dispatch<SetStateAction<boolean>>,
) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    time !== 0 &&
        setTimeout(() => {
            setShowToast(false);
            setToastMessage("");
            setToastType("");
        }, 2000);
};

export const deleteImageFromCloudFlare = async (
    setToastMessage: Dispatch<SetStateAction<string>>,
    setToastType: Dispatch<SetStateAction<string>>,
    setShowToast: Dispatch<SetStateAction<boolean>>,
    profileImageId: string,
    type: string,
) => {
    const response = await fetch("/api/deleteImageFromCloudflare", {
        method: "DELETE",
        body: JSON.stringify({ imageId: profileImageId }),
    });
    if (response.status >= 400) {
        showToastMessage(
            "Something went wrong, please try again later ",
            "danger",
            2000,
            setToastMessage,
            setToastType,
            setShowToast,
        );
        return;
    }
    type === "delete"
        ? showToastMessage(
              "Your profile has been deleted",
              "success",
              2000,
              setToastMessage,
              setToastType,
              setShowToast,
          )
        : showToastMessage(
              "Your profile image has been updated.",
              "success",
              2000,
              setToastMessage,
              setToastType,
              setShowToast,
          );
    //   setTimeout(() => {
    //     window.location.reload();
    // }, 2000);
};

export const uploadImageToHasura = async (
    setToastMessage: Dispatch<SetStateAction<string>>,
    setToastType: Dispatch<SetStateAction<string>>,
    setShowToast: Dispatch<SetStateAction<boolean>>,
    url: string,
    userDetails: userType,
    profileImageId: string,
    type: string,
) => {
    type === "delete"
        ? showToastMessage("Deleting...", "danger", 0, setToastMessage, setToastType, setShowToast)
        : showToastMessage("Uploading...", "success", 0, setToastMessage, setToastType, setShowToast);
    client
        .mutate({
            mutation: gql`
                mutation update_userDetails_by_pk($contactId: Int!, $url: String) {
                    update_userDetails_by_pk(pk_columns: { contactId: $contactId }, _set: { profileImage: $url }) {
                        contactId
                    }
                }
            `,
            variables: {
                contactId: userDetails.contactId,
                url: url,
            },
        })
        .then(() => {
            if (profileImageId.trim()) {
                deleteImageFromCloudFlare(setToastMessage, setToastType, setShowToast, profileImageId, type);
            } else {
                showToastMessage(
                    "Your profile image has been updated.",
                    "success",
                    2000,
                    setToastMessage,
                    setToastType,
                    setShowToast,
                );
                // setTimeout(() => {
                //     window.location.reload();
                // }, 2000);
            }
        })
        .catch(() => {
            showToastMessage(
                "Something is wrong with Hasura",
                "danger",
                2000,
                setToastMessage,
                setToastType,
                setShowToast,
            );
        });
};

export const uploadImageToCloudflare = async (
    userDetails: userType,
    image: File | null,
    imageUrl: string,
    setToastMessage: Dispatch<SetStateAction<string>>,
    setToastType: Dispatch<SetStateAction<string>>,
    setShowToast: Dispatch<SetStateAction<boolean>>,
    profileImageId: string,
) => {
    if (imageUrl) {
        showToastMessage("Uploading...", "success", 0, setToastMessage, setToastType, setShowToast);
        const response = await fetch("/api/uploadImageToCloudflare", {
            method: "POST",
            body: JSON.stringify({ imageData: image, imageUrl: imageUrl }),
        });
        const data = await response.json();
        if (response.status >= 400) {
            if (response.status === 415) {
                showToastMessage(data.message, "danger", 2000, setToastMessage, setToastType, setShowToast);
            } else if (response.status === 405) {
                showToastMessage(data.message, "danger", 2000, setToastMessage, setToastType, setShowToast);
            } else {
                showToastMessage("Something went wrong", "danger", 2000, setToastMessage, setToastType, setShowToast);
            }
            return;
        }
        uploadImageToHasura(
            setToastMessage,
            setToastType,
            setShowToast,
            data.data.result.variants[0],
            userDetails,
            profileImageId,
            "Upload",
        );
    } else {
        showToastMessage(
            "Please select the Profile Image",
            "danger",
            2000,
            setToastMessage,
            setToastType,
            setShowToast,
        );
    }
};

export const handleProfileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setToastMessage: Dispatch<SetStateAction<string>>,
    setToastType: Dispatch<SetStateAction<string>>,
    setShowToast: Dispatch<SetStateAction<boolean>>,
    setImageUrl: Dispatch<SetStateAction<string>>,
    setImage: Dispatch<SetStateAction<File | null>>,
) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.size > 524288) {
        showToastMessage("Maximum size limit is 500KB", "danger", 2000, setToastMessage, setToastType, setShowToast);
        return;
    }
    if (
        file &&
        !(
            file.type === "image/png" ||
            file.type === "image/jpeg" ||
            file.type === "image/webp" ||
            file.type === "image/jpg"
        )
    ) {
        showToastMessage(
            "Image format should be in .jpg, .jpeg, .png, .webp.",
            "danger",
            2000,
            setToastMessage,
            setToastType,
            setShowToast,
        );
        return;
    }
    if (file !== null) {
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result as string);
            const fileWithInfo = Object.assign(file, { path: file.name });
            setImage(fileWithInfo);
        };
        file && reader.readAsDataURL(file);
    }
};

//Notification Functions

export const fetchNotificationList = async (
    setNotifications: Dispatch<SetStateAction<Array<notificationType> | []>>,
    str: string,
    setTotalCount: Dispatch<SetStateAction<number>>,
    offset: number,
    limit: number,
    setLoader: Dispatch<SetStateAction<boolean>>,
    username: string,
) => {
    setLoader(true);
    setNotifications([]);
    const hasuraNotificationsRes = await client.query({
        query: getNotifcationsListQuery(str),
        variables: {
            limit: limit,
            offset: offset,
            username: username?.trim(),
        },
    });
    const hasuraNotificationsData = await hasuraNotificationsRes.data;
    const notifications = await hasuraNotificationsData.Notifications;
    const notificationsAggregate = await hasuraNotificationsData.Notifications_aggregate;
    const aggregate = await notificationsAggregate.aggregate;
    const count = await aggregate.count;
    setNotifications(notifications);
    setTotalCount(count);
    setLoader(false);
};

export const fetchFilterNotificationList = async (
    setNotifications: Dispatch<SetStateAction<Array<notificationType> | []>>,
    str: string,
    setTotalCount: Dispatch<SetStateAction<number>>,
    offset: number,
    limit: number,
    setLoader: Dispatch<SetStateAction<boolean>>,
    username: string,
) => {
    setLoader(true);
    setNotifications([]);
    const hasuraNotificationsRes = await client.query({
        query: getNotifcationsListBasedOnFilterQuery(str),
        variables: {
            limit: limit,
            offset: offset,
            username: username?.trim(),
        },
    });
    const hasuraNotificationsData = await hasuraNotificationsRes.data;
    const notifications = await hasuraNotificationsData.Notifications;
    const notificationsAggregate = await hasuraNotificationsData.Notifications_aggregate;
    const aggregate = await notificationsAggregate.aggregate;
    const count = await aggregate.count;
    setNotifications(notifications);
    setTotalCount(count);
    setLoader(false);
};

export const fetchLatestNotification = async (
    setNotifications: Dispatch<SetStateAction<Array<notificationType> | []>>,
    str: string,
    offset: number,
    limit: number,
    username: string,
) => {
    const currentDate = new Date();
    const currentDateInUTC = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);
    client
        .subscribe({
            query: getLatestNotificationQuery(str),
            variables: {
                limit: limit,
                offset: offset,
                username: username?.trim(),
                startTime: moment(currentDateInUTC).format("YYYY-MM-DD HH:mm:ss"),
                endTime: moment(currentDateInUTC).add(0.5, "hour").format("YYYY-MM-DD HH:mm:ss"),
            },
        })
        .subscribe({
            next(response) {
                const notifications = response.data?.Notifications;
                const newNotifications = notifications.filter(
                    (item: notificationType) =>
                        item.type === "reminder" &&
                        moment(
                            moment(item.startTime)
                                .add(item.duration / 60, "hour")
                                .format("YYYY-MM-DDTHH:mm:ss"),
                        ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss")),
                );
                setNotifications(newNotifications);
            },
            error(error) {
                console.error("Subscription error:", error);
            },
            complete() {
                console.log("Subscription completed");
            },
        });
};

export const updateNotificationStatus = async (notification: notificationType) => {
    const hasuraRes = await client.mutate({
        mutation: updateNotificationStatusQuery,
        variables: {
            meetingId: notification.meetingId,
            startTime: notification.startTime,
            username: notification.username?.trim(),
        },
    });
    const hasuraData = await hasuraRes.data;
    const update_Notifications = await hasuraData.update_Notifications;
    console.log(update_Notifications);
};

export const updateUserNotificationStatus = async (userDetails: userType, notificationsOn: boolean) => {
    try {
        const res = await client.mutate({
            mutation: updateUserNotificationStatusQuery,
            variables: {
                notificationsOn,
                contactId: userDetails.contactId,
            },
        });
        const data = await res.data;
        const update_userDetails_by_pk = data.update_userDetails_by_pk;
        return update_userDetails_by_pk;
    } catch (error) {
        throw new CustomError("Failed to update the user's Notification status", 400);
    }
};

export const getTotalUnreadNotificationsCount = async (
    str: string,
    setTotalCount: Dispatch<SetStateAction<number>>,
    username: string,
) => {
    await client
        .subscribe({
            query: getTotalUnreadNotificationsCountQuery(str),
            variables: {
                username: username,
            },
        })
        .subscribe({
            next(response) {
                setTotalCount(response.data?.Notifications_aggregate.aggregate.count);
            },
            error(error) {
                console.error("Subscription error:", error);
                return;
            },
            complete() {
                console.log("Subscription completed");
            },
        });
};
