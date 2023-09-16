import usc1HourReminderMail from "./usc1HourReminderMail";
import usc24HoursReminderMail from "./usc24HoursReminderMail";
import uscWelcomeMail from "./uscWelcomeMail";
import welcomeMail from "./welcomeMail";

const emailTemplate = (type: string, name: string, link?: string): string => {
    switch (type) {
        case "welcomeMail":
            return welcomeMail(name);
        case "uscWelcomeMail":
            return uscWelcomeMail(name);
        case "usc24HoursReminderMail":
            return usc24HoursReminderMail(name);
        case "usc1HourReminderMail":
            if (link !== undefined) {
                return usc1HourReminderMail(name, link);
            }
            return "";
        default:
            return welcomeMail(name);
    }
};

export default emailTemplate;
