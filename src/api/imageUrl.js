const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/v1/api").replace(/\/$/, "");

/**
 * Routes a remote catalogue image through the backend's resizing proxy.
 *
 * The CRM stores originals — several megabytes each — and the cards render them
 * a few hundred pixels wide. Asking the proxy for the size actually needed
 * turns a ~7 MB download into ~11 KB.
 *
 * Anything that isn't a remote http(s) image is returned untouched: images
 * bundled with this build are already the right size and are served from the
 * same origin, so proxying them would only add a round trip.
 */
export function imageUrl(src, width = 480) {
  if (typeof src !== "string" || !src) return src;
  if (!/^https?:\/\//i.test(src)) return src;

  return `${BASE_URL}/website/image?url=${encodeURIComponent(src)}&w=${width}`;
}
