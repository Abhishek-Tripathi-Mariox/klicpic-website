import { useMemo } from "react";
import { fetchCareers } from "./endpoints";
import { useApi } from "./useApi";

/**
 * Open roles, live from the CRM's Settings → Careers tab.
 *
 * Falls back to what this build shipped, so the page never renders an empty
 * careers section if the request does not land.
 */
export function useCareers(fallback = []) {
  const { data, loading, error } = useApi(fetchCareers, null, []);

  return useMemo(() => {
    const live = data?.jobs;
    if (!Array.isArray(live) || live.length === 0) {
      return { jobs: fallback, departments: [], live: false };
    }

    return { jobs: live, departments: data.departments || [], live: true };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
}
