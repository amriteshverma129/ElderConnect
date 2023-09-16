import React from "react";
import moment from "moment";
import styles from "./Style/joinEventButton.module.scss";
import { JoinEventButtonProps } from "./Type";
import { useUser } from "../Authenticate/UserContext";
import client from "../../apolloClient";
import { insert_userAnalytics_one_Query } from "./Queries";

// JoinEventButton component used for disabled and enabled according to eventstartTime.
function JoinEventButton({
  startTime,
  duration,
  eventTopic,
  meetingId,
  passcode,
  join_url,
}: JoinEventButtonProps) {
  const { user, userDetails } = useUser();
  console.log(passcode);
  const handleJoinEvent = async () => {
    window.open(join_url);
  };

  return (
    <button
      disabled={
        !(
          moment(
            moment(startTime)
              .add(duration / 60, "hour")
              .format("YYYY-MM-DDTHH:mm:ss")
          ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss")) &&
          moment(
            moment(startTime)
              .subtract(15 / 60, "hour")
              .format("YYYY-MM-DDTHH:mm:ss")
          ).isSameOrBefore(moment().format("YYYY-MM-DDTHH:mm:ss"))
        )
      }
      className={styles["joinEventButton"]}
      onClick={() => {
        // Pushing logs to dataDogs.
        fetch("https://api.ipify.org?format=json")
          .then((response) => response.json())
          .then((data) => {
            const userIpAddress = data.ip;
            fetch(`https://ipinfo.io/${userIpAddress}?token=41e0e59c44b36b`)
              .then((response) => response.json())
              .then((data) => {
                const city = data.city;
                const state = data.region;
                const country = data.country;
                try {
                  client.mutate({
                    variables: {
                      username:
                        userDetails.connection === "email"
                          ? userDetails.email
                          : userDetails.phone,
                      join_url: join_url,
                      meetingId: meetingId,
                      startTime: startTime,
                      eventTopic: eventTopic,
                      userAuthId:
                        userDetails.connection === "email"
                          ? user.user_id
                          : user.sub,
                      contactId: userDetails.contactId,
                      roles: userDetails.roles,
                      firstName: userDetails.firstName,
                      lastName: userDetails.lastName,
                      connection: userDetails.connection,
                      city: city,
                      state: state,
                      country: country,
                    },
                    mutation: insert_userAnalytics_one_Query,
                  });
                } catch (error) {
                  console.log(error);
                }
              })
              .catch((error) => {
                console.error("Error fetching geolocation data:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching IP address:", error);
          });
        handleJoinEvent();
      }}
    >
      {moment(
        moment(startTime)
          .subtract(15 / 60, "hour")
          .format("YYYY-MM-DDTHH:mm:ss")
      ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss"))
        ? "Coming Soon"
        : moment(
            moment(startTime)
              .add(duration / 60, "hour")
              .format("YYYY-MM-DDTHH:mm:ss")
          ).isAfter(moment().format("YYYY-MM-DDTHH:mm:ss"))
        ? "Join Event"
        : "Event Ended"}
    </button>
  );
}

export default JoinEventButton;
