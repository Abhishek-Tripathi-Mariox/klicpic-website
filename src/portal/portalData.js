/**
 * Figma: Customer Portal dashboard (1615:10258 / 10956) and its tabs.
 * All copy and values are taken from the frames.
 */
export const ACCOUNT = {
  name: "mithu",
  bookingId: "KLP-527669",
  status: "Quotation Pending",
};

export const TABS = [
  { id: "overview", label: "Overview" },
  { id: "payments", label: "Payments" },
  { id: "selections", label: "Selections" },
  { id: "deliverables", label: "Deliverables" },
  { id: "messages", label: "Messages", badge: 1 },
  { id: "profile", label: "Profile" },
];

export const MY_BOOKINGS = [
  { title: "Maternity Shoot", meta: "KP-2026-0012 · 22 Jul 2026", status: "Active" },
  { title: "Birthday Shoot", meta: "KP-2026-0007 · 14 Mar 2026", status: "Completed" },
  { title: "Family Shoot", meta: "KP-2025-0091 · 05 Dec 2025", status: "Completed" },
];

export const SAVED_JOURNEY = {
  title: "My Saved Journey",
  progressId: "Progress ID: KP-2026-1180",
  label: "Booking journey",
  progress: "7/7 steps done",
  steps: ["Shoot Type", "Vibe", "Theme", "Gown", "Extras", "Package", "Date & Time"],
};

export const BOOKING_DETAILS = {
  reference: "KP-2026-0012",
  rows: [
    { label: "Shoot Type", value: "Maternity" },
    { label: "Shoot Date", value: "22 Jul 2026" },
    { label: "Vibe", value: "Soft & Dreamy" },
    { label: "Theme", value: "Floral Garden" },
    { label: "Location", value: "Studio" },
    { label: "Gown", value: "White Drape" },
    { label: "Package", value: "Signature" },
    { label: "Photographer", value: "Ravi Sharma" },
  ],
};

export const REQUEST_CHIPS = [
  "Add gown change",
  "Outdoor location",
  "Extra props",
  "Partner in shoot",
  "Specific timing",
];

export const RECENT_MESSAGES = [
  {
    from: "Klicpic Team",
    initial: "K",
    time: "Just now",
    body: "Hi mithu! We've received your booking request. Our team will share your quotation shortly.",
  },
];

/** state: done | current | pending; `action` marks the YOU / ACTION stages. */
export const TIMELINE = [
  { label: "Request Submitted", state: "done" },
  { label: "Quotation Shared", state: "current", note: "In Progress" },
  { label: "Quotation Approved", state: "pending", action: true, note: "Your action needed — approve or request changes" },
  { label: "Advance Paid", state: "pending", action: true, note: "Complete payment to lock your date" },
  { label: "Booking Confirmed", state: "pending" },
  { label: "Shoot Scheduled", state: "pending" },
  { label: "Shoot Completed", state: "pending" },
  { label: "Editing", state: "pending" },
  { label: "Album Approval", state: "pending", action: true, note: "You review & approve final selections before print" },
  { label: "Printing", state: "pending" },
  { label: "Dispatched", state: "pending" },
  { label: "Delivered", state: "pending" },
];
