import { useEffect, useRef, useState } from "react";

/**
 * Fetches once on mount (and whenever `deps` change) and hands back the result.
 *
 * `fallback` is what renders until the request lands — and what stays on screen
 * if it fails. The marketing site ships its own copy of every catalogue, so a
 * backend that is slow, down, or not yet reachable degrades to the bundled
 * content rather than to an empty page.
 */
export function useApi(fetcher, fallback, deps = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep the newest fetcher without making it a dependency — an inline arrow
  // would otherwise re-run this effect on every render.
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError(null);

    Promise.resolve(fetcherRef.current({ signal: controller.signal }))
      .then((result) => {
        if (!active) return;
        setData(result);
      })
      .catch((cause) => {
        if (!active || controller.signal.aborted) return;
        // Keep the fallback on screen; the page stays usable either way.
        setError(cause);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
