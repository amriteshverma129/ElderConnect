import usc1HourReminderSMS from "./usc1HourReminderSMS";
import usc24HoursReminderSMS from "./usc24HoursReminderSMS";
import uscWelcomeSMS from "./uscWelcomeSMS";
import welcomeSMS from "./welcomeSMS";

const smsTemplate = (type: string, name: string, link?: string): string => {
    switch (type) {
        case "welcomeSMS":
            return welcomeSMS(name);
        case "uscWelcomeSMS":
            return uscWelcomeSMS(name);
        case "usc24HoursReminderSMS":
            return usc24HoursReminderSMS(name);
        case "usc1HourReminderSMS":
            if (link !== undefined) {
                return usc1HourReminderSMS(name, link);
            }
            return "";
        default:
            return welcomeSMS(name);
    }
};

export default smsTemplate;
