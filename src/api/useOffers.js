import { useEffect, useMemo, useState } from "react";
import { fetchOffers } from "./endpoints";
import { useApi } from "./useApi";

/**
 * Live offers from the CRM's Settings → Website Offers tab.
 *
 * Records carry their own uploaded artwork, so a card without one falls back to
 * the bundled photo in the same position rather than rendering an empty frame.
 */
export function useOffers(fallback = []) {
  const { data, loading, error } = useApi(fetchOffers, null, []);

  return useMemo(() => {
    const live = data?.offers;
    if (!Array.isArray(live) || live.length === 0) {
      return { offers: fallback, endsAt: null, live: false };
    }

    const offers = live.map((offer, index) => ({
      ...offer,
      image: offer.image || fallback[index % Math.max(fallback.length, 1)]?.image,
    }));

    return { offers, endsAt: data.endsAt, live: true };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
}

const pad = (value) => String(value).padStart(2, "0");

/**
 * Time left until an offer actually expires.
 *
 * The frames drew a fixed clock (13:49:02 on /offers, 2:13:44 on the home
 * page) and the code counted down from it on every load — so it read the same
 * on Monday as on Friday, and had nothing to do with any offer. This counts to
 * the real `endsAt` the admin set, and returns null when no live offer has one,
 * so the strip can hide rather than invent a deadline.
 */
export function useOfferCountdown(endsAt) {
  const deadline = useMemo(() => {
    const time = endsAt ? new Date(endsAt).getTime() : 0;
    return Number.isFinite(time) && time > 0 ? time : 0;
  }, [endsAt]);

  const left = () => Math.max(0, Math.floor((deadline - Date.now()) / 1000));
  const [remaining, setRemaining] = useState(left);

  useEffect(() => {
    if (!deadline) return undefined;
    setRemaining(left());
    // Read the clock each tick rather than decrementing, so a backgrounded tab
    // catches up instead of drifting.
    const timer = setInterval(() => setRemaining(left()), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline]);

  if (!deadline || remaining <= 0) return null;

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const clock = `${pad(days ? hours : Math.floor(remaining / 3600))}:${pad(
    Math.floor((remaining % 3600) / 60)
  )}:${pad(remaining % 60)}`;

  return days ? `${days}d ${clock}` : clock;
}
