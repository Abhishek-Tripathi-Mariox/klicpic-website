import { api, setPortalToken } from "./client";

/**
 * One function per backend route, so components never build URLs themselves.
 * Paths mirror src/routes/WebsiteRoute.js on the backend.
 */

// ── Catalog ─────────────────────────────────────────────────────────────────

const query = (params = {}) => {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value && value !== "All")
  ).toString();
  return search ? `?${search}` : "";
};

export const fetchThemes = (params, options) =>
  api.get(`/website/themes${query(params)}`, options);

export const fetchProps = (params, options) =>
  api.get(`/website/props${query(params)}`, options);

export const fetchPackages = (params, options) =>
  api.get(`/website/packages${query(params)}`, options);

export const fetchStudios = (params, options) =>
  api.get(`/website/studios${query(params)}`, options);

export const fetchTimeSlots = (options) => api.get("/website/time-slots", options);

export const fetchCategories = (options) => api.get("/website/categories", options);

// ── Editorial content ───────────────────────────────────────────────────────

export const fetchContent = (key, options) => api.get(`/website/content/${key}`, options);

export const fetchAllContent = (options) => api.get("/website/content", options);

// ── Public forms ────────────────────────────────────────────────────────────

export const submitBookingRequest = (payload) =>
  api.post("/website/booking-request", payload);

export const submitContact = (payload) => api.post("/website/contact", payload);

export const submitCareerApplication = (payload) =>
  api.post("/website/career-application", payload);

// ── Customer portal ─────────────────────────────────────────────────────────

export const sendPortalOtp = (mobile) => api.post("/website/portal/send-otp", { mobile });

/** Stores the token on success, so later calls authenticate themselves. */
export const verifyPortalOtp = async (mobile, otp) => {
  const data = await api.post("/website/portal/verify-otp", { mobile, otp });
  setPortalToken(data.token);
  return data;
};

export const portalLogout = () => setPortalToken("");

export const fetchPortalProfile = (options) =>
  api.get("/website/portal/me", { ...options, auth: true });

export const fetchPortalBookings = (options) =>
  api.get("/website/portal/bookings", { ...options, auth: true });

export const fetchPortalBooking = (id, options) =>
  api.get(`/website/portal/bookings/${id}`, { ...options, auth: true });

export const fetchShootTypes = (options) => api.get("/website/shoot-types", options);

/** Gowns live in the CRM as props filed under the "gown" category. */
// ── Availability ────────────────────────────────────────────────────────────

export const fetchAvailability = (params, options) =>
  api.get(`/website/availability${query(params)}`, options);

// ── Reviews ─────────────────────────────────────────────────────────────────

export const fetchReviews = (params, options) =>
  api.get(`/website/reviews${query(params)}`, options);

export const fetchMyReview = (options) =>
  api.get("/website/portal/review", { ...options, auth: true });

export const saveMyReview = (payload) =>
  api.post("/website/portal/review", payload, { auth: true });

// ── Cancellation, refunds, activity ─────────────────────────────────────────

export const fetchCancellationQuote = (bookingId, options) =>
  api.get(`/website/portal/bookings/${bookingId}/cancellation-quote`, {
    ...options,
    auth: true,
  });

export const requestCancellation = (bookingId, payload) =>
  api.post(`/website/portal/bookings/${bookingId}/cancel`, payload, { auth: true });

export const fetchRefunds = (options) =>
  api.get("/website/portal/refunds", { ...options, auth: true });

export const fetchActivity = (options) =>
  api.get("/website/portal/activity", { ...options, auth: true });

/** Offer records — their own model now, not a content block. */
export const fetchOffers = (options) => api.get("/website/offers", options);

/** Resolves a coupon code (or offer id) a customer is redeeming. */
export const fetchOffer = (code, options) =>
  api.get(`/website/offers/${encodeURIComponent(code)}`, options);

/** Job postings — their own records now, not a content block. */
export const fetchCareers = (options) => api.get("/website/careers", options);

// ── About / Contact / FAQs — their own records now ──────────────────────────

export const fetchAbout = (options) => api.get("/website/about", options);
export const fetchContact = (options) => api.get("/website/contact", options);
export const fetchFaqs = (options) => api.get("/website/faqs", options);

/** Applying to a posting. Multipart so the CV travels with the form. */
export const applyForJob = async (careerId, fields, resumeFile) => {
  const form = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) form.append(key, value);
  });
  if (resumeFile) form.append("resume", resumeFile);

  const base = (import.meta.env.VITE_API_BASE_URL || "/v1/api").replace(/\/$/, "");
  const response = await fetch(`${base}/website/careers/${careerId}/apply`, {
    method: "POST",
    body: form,
  });

  const payload = await response.json();
  if (payload?.code !== 1) throw new Error(payload?.message || "We couldn't send your application");
  return payload.data;
};

// ── Blog ────────────────────────────────────────────────────────────────────

export const fetchBlogs = (params, options) =>
  api.get(`/website/blogs${query(params)}`, options);

export const fetchBlogPost = (slug, options) =>
  api.get(`/website/blogs/${encodeURIComponent(slug)}`, options);

