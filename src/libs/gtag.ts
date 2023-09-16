export const GA_TRACKING_ID = "";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL): void => {
  if (
    typeof window !== "undefined" &&
    window.gtag &&
    GA_TRACKING_ID !== undefined
  ) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category: string;
  name: string;
  value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, name, value }: GTagEvent): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      category,
      name,
      value,
    });
  }
};
