import { useMemo } from "react";
import { fetchPortalBookings } from "./endpoints";
import { useApi } from "./useApi";

const DATE_FORMAT = { day: "2-digit", month: "short", year: "numeric" };

/**
 * The signed-in customer's real bookings, shaped for the dashboard's list.
 *
 * The backend returns the full record; the overview only shows a title, a
 * one-line reference and a status, so the mapping happens here rather than in
 * the component.
 *
 * There is deliberately no sample fallback. `data` is null while the request is
 * in flight and stays null if it fails, so both cases come back as an empty
 * list with `loading` or `error` set — the caller must say "loading" or "we
 * couldn't reach us", never show a stranger's shoots as this customer's.
 */
export function usePortalBookings() {
  const { data, loading, error } = useApi(fetchPortalBookings, null, []);

  const bookings = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.map((booking) => ({
      id: booking.id,
      title: booking.theme || booking.package || "Photoshoot",
      meta: [
        booking.bookingCode,
        booking.date
          ? new Date(booking.date).toLocaleDateString("en-GB", DATE_FORMAT)
          : "",
      ]
        .filter(Boolean)
        .join(" · "),
      status: booking.cancelled ? "Cancelled" : booking.status || "Pending",
      raw: booking,
    }));
  }, [data]);

  return { bookings, loading, error };
}
