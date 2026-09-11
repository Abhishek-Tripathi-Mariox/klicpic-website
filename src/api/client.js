/**
 * Thin fetch wrapper for the Klicpic backend.
 *
 * The API answers with { code, message, data } on every route — code 1 is
 * success, anything else is a failure carrying a human-readable message. This
 * unwraps that envelope so callers only ever see `data` or an Error.
 */
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/v1/api").replace(/\/$/, "");

/** Where the portal keeps its session between visits. */
const TOKEN_KEY = "klicpic:portal-token";

export function getPortalToken() {
  try {
    return window.localStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

export function setPortalToken(token) {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* private browsing — the session simply won't survive a reload */
  }
}

export class ApiError extends Error {
  constructor(message, { code, status } = {}) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

async function request(path, { method = "GET", body, auth = false, signal } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = getPortalToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    throw new ApiError("The server sent a response we couldn't read.", {
      status: response.status,
    });
  }

  // A 401 means the portal session is gone; clear it so the UI shows the login.
  if (response.status === 401 && auth) setPortalToken("");

  if (payload?.code !== 1) {
    throw new ApiError(payload?.message || "Something went wrong. Please try again.", {
      code: payload?.code,
      status: response.status,
    });
  }

  return payload.data;
}

export const api = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  put: (path, body, options) => request(path, { ...options, method: "PUT", body }),
};
