import { useEffect, useMemo, useState } from "react";
import { fetchOffers } from "./endpoints";
import { useApi } from "./useApi";

/**
 * Live offers from the CRM's Settings → Website Offers tab.
 *
 * Only real records are ever shown. There used to be a bundled set of offers
 * behind this — so a backend hiccup advertised "₹3,000 OFF" the studio may
 * have retired, with Claim buttons that led nowhere — and a record without
 * artwork borrowed the photo of whichever bundled offer sat in the same
 * position, putting the wrong picture on three of four live cards. Neither is
 * worth a filled-looking strip: with nothing live, the section hides itself.
 *
 * An offer that runs out while the page is open drops out on the next tick,
 * so its Claim button cannot outlive it.
 */
export function useOffers() {
  const { data } = useApi(fetchOffers, null, []);
  const [now, setNow] = useState(() => Date.now());

  const live = Array.isArray(data?.offers) ? data.offers : [];
  const timed = live.some((offer) => offer.endsAt);

  useEffect(() => {
    if (!timed) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, [timed]);

  return useMemo(() => {
    const running = live.filter((offer) => !offer.endsAt || new Date(offer.endsAt).getTime() > now);
    if (running.length === 0) return { offers: [], endsAt: null, live: false };

    const soonest = running
      .map((offer) => offer.endsAt)
      .filter(Boolean)
      .sort()[0];

    return { offers: running, endsAt: soonest || null, live: true };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, now]);
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
