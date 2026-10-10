import { Browser, EsgPerformanceApiItem } from "@/interfaces";

interface WindowWithOpera extends Window {
  opr?: {
    addons?: unknown;
  };
}

interface WindowWithChrome extends Window {
  chrome?: {
    runtime?: unknown;
  };
}

export const isBrowser = () => typeof window !== "undefined";

export const getBrowserName = (ua: string): Browser => {
  const agent = ua.toLowerCase();
  switch (true) {
    case agent.indexOf("edge") > -1:
      return "edge";
    case agent.indexOf("opr") > -1 && !!(window as WindowWithOpera).opr:
      return "opera";
    case agent.indexOf("chrome") > -1 && !!(window as WindowWithChrome).chrome:
      return "chrome";
    case agent.indexOf("trident") > -1:
      return "ie";
    case agent.indexOf("firefox") > -1:
      return "firefox";
    case agent.indexOf("safari") > -1:
      return "safari";
    default:
      return "other";
  }
};

/**
 * Maps url value to the provide params object
 * @param {string} url - url containing the pattern as {} to be replaced by the param value
 * @param {Object} params - contains the map of key {string} value {string} to be mapped against the string
 * @returns {string} - replaced with the value matched against the provide url
 */
export const replaceParamInString = (
  str: string,
  params: { [key: string]: unknown }
): string => {
  const regexReqParam = /[^{]+(?=})/g;
  const matches = str.match(regexReqParam) || [];
  let changedUrl = str;
  matches.forEach((match) => {
    const param = params[match] !== undefined ? String(params[match]) : "";
    changedUrl = changedUrl.replace(`{${match}}`, param);
  });
  return changedUrl;
};

interface WindowWithMSStream extends Window {
  MSStream?: unknown;
}

export const isIos = () => {
  if (typeof window === "undefined") {
    // If window object is not available (server-side rendering), assume it's not iOS
    return false;
  }

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as WindowWithMSStream).MSStream
  );
};

// create util function to check allowed list of pages for dark/light mode
export const isAllowedPageForTheme = (params: { [key: string]: string }) => {
  const page = params?.["category-slug"];
  const allowedPages = [
    "luxury-residences",
    "office-parks",
    "hospitality",
    "data-centres",
    "retail",
    "about",
  ];
  return allowedPages.includes(page);
};

export type DeviceType = "mobile" | "desktop";

/** Viewport-based check; on the server returns `"desktop"` (no `window`). */
export const getDeviceType = (): DeviceType => {
  if (typeof window === "undefined") {
    return "desktop";
  }
  return window.innerWidth < 768 ? "mobile" : "desktop";
};

export function findTypeMetrics(
  performance?: EsgPerformanceApiItem[],
  performanceKey: number = 0
) {
  const energyItem = performance?.[performanceKey];

  return energyItem;
}
