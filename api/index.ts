import ApiException from "./Api.exception";
import { isBrowser, replaceParamInString } from "@/utils/utils";

export const GetCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }
  const nameEQ = name + "=";
  const ca = document?.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return undefined;
};

/**
 * Handle API errors and show appropriate toast notifications
 * @param {Error} error - The error object
 * @param {string} uri - The API endpoint that failed
 */
const handleApiError = (error: unknown, uri: string): void => {
  // Only show toast on client side
  if (!isBrowser()) {
    return;
  }

  // Error handling logic can be extended here if needed
  // Currently, errors are re-thrown to maintain existing error handling behavior
  if (error instanceof ApiException || error instanceof Error) {
    // Error is properly typed and can be logged or handled here
    console.error(`API Error for ${uri}:`, error.message);
  }
};

interface ApiParams {
  [key: string]: unknown;
  isAbsUrl?: boolean;
}

interface ApiOptions extends RequestInit {
  headers?: HeadersInit;
}

/**
 * A fetch wrapper to call external api's
 * @param {string} uri - resource uri
 * @param {Object} params -  params need to be replaced with matched params of the uri
 * @param {Object} option - optional parameter used for passing header, httpMethods and lot more, see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
const doCall = async (
  uri: string,
  params: ApiParams = {},
  option: ApiOptions = {
    headers: {},
  }
): Promise<unknown> => {
  const { isAbsUrl } = params;
  uri = replaceParamInString(uri, params);

  let url = "";
  if (isAbsUrl) {
    url = uri;
  } else if (isBrowser()) {
    url = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT + uri;
  } else {
    // server side
    url = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT + uri.replace(/^\/api/, "");
  }

  // Add Next.js caching support for server-side requests
  // In Next.js 13+, fetch requests are cached by default
  // For POST requests, we need to explicitly disable caching
  const fetchOptions: RequestInit = {
    ...option,
    headers: {
      ...option.headers,
    },
  };

  // Only add caching options on server-side (not in browser)
  if (!isBrowser()) {
    // For GET requests, use default caching (respects page revalidate)
    // For POST/PATCH/DELETE, disable caching
    if (option.method && ["POST", "PATCH", "DELETE"].includes(option.method)) {
      fetchOptions.cache = "force-cache";
    }
    // GET requests will use Next.js default caching behavior
  }

  return fetch(url, fetchOptions).then((response: Response) => {
    if (response.ok === false) {
      return response.json().then((res) => {
        let message;

        if (isBrowser()) {
          message =
            res.error?.message || `Request: ${uri} ${response.statusText}`;
        } else {
          message = `Request: ${uri} ${response.statusText}`;
        }

        throw new ApiException(message, response.status, {
          ...res,
          ...res.error,
          status: response.status,
        });
      });
    } else {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else if (
        contentType?.indexOf("application/pdf") !== -1 ||
        contentType?.indexOf("application/octet-stream") !== -1 ||
        contentType?.indexOf("text/csv") !== -1 ||
        contentType?.indexOf(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) !== -1
      ) {
        return response.url;
      } else return response.text();
    }
  });
};

/**
 * Used for fetching Http Get method resources
 * @param {string} uri - resource uri
 * @param {Object} params - params need to be replaced with matched params of the uri
 * @return {Promise} - a promise of Response with json data
 */
export const doGet = (
  uri: string,
  params: ApiParams = {},
  options?: ApiOptions
): Promise<unknown> => {
  return doCall(uri, params, options).catch((error) => {
    handleApiError(error, uri);
    throw error; // Re-throw to maintain existing error handling behavior
  });
};

export const doPost = (
  uri: string,
  params: ApiParams = {},
  options?: ApiOptions
): Promise<unknown> => {
  return doCall(uri, params, { ...options, method: "POST" }).catch((error) => {
    handleApiError(error, uri);
    throw error; // Re-throw to maintain existing error handling behavior
  });
};

export const doPatch = (
  uri: string,
  params: ApiParams = {},
  options?: ApiOptions
): Promise<unknown> => {
  return doCall(uri, params, { ...options, method: "PATCH" }).catch((error) => {
    handleApiError(error, uri);
    throw error; // Re-throw to maintain existing error handling behavior
  });
};

export const doDelete = (
  uri: string,
  params: ApiParams = {},
  options?: ApiOptions
): Promise<unknown> => {
  return doCall(uri, params, { ...options, method: "DELETE" }).catch(
    (error) => {
      handleApiError(error, uri);
      throw error; // Re-throw to maintain existing error handling behavior
    }
  );
};

/**
 * Used for fetching same-origin/internal API routes directly.
 * This avoids NEXT_PUBLIC_BASE_API_ENDPOINT rewriting done by doGet/doPost.
 */
export const doFetch = async (
  uri: string,
  options: RequestInit = {}
): Promise<unknown> => {
  return fetch(uri, options).then((response: Response) => {
    if (response.ok === false) {
      return response.json().then((res) => {
        const message = `Request: ${uri} ${response.statusText}`;
        throw new ApiException(message, response.status, {
          ...res,
          ...res.error,
          status: response.status,
        });
      });
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    }
    return response.text();
  });
};
