import { useMemo } from "react";
import {
  fetchThemes,
  fetchProps,
  fetchPackages,
  fetchStudios,
  fetchShootTypes,
  fetchTimeSlots,
} from "./endpoints";
import { useApi } from "./useApi";

/**
 * Catalog lists, live from the CRM's own records.
 *
 * The CRM holds the facts — which themes exist, which props are in stock, what
 * a package costs. It does not hold the marketing dressing the designs call
 * for (ratings, "13 viewing", trending badges, CTA styling), because no such
 * column exists there.
 *
 * So each live record is overlaid on the bundled record of the same name: the
 * CRM wins on everything it actually knows, and the presentation fields it has
 * no opinion about keep the values this build shipped with. A record the CRM
 * has but the bundle does not still renders — just without the dressing.
 */

const byName = (items = []) =>
  new Map(items.map((item) => [String(item.name || "").trim().toLowerCase(), item]));

/** Live values win, except where they are empty and the bundle has something. */
const overlay = (live, local) => {
  if (!local) return live;

  const merged = { ...local };
  Object.entries(live).forEach(([key, value]) => {
    const isEmpty =
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);
    if (!isEmpty) merged[key] = value;
  });

  return merged;
};

function useCatalog(fetcher, listKey, filterKey, local) {
  const { data, loading, error } = useApi(fetcher, null, []);

  return useMemo(() => {
    const liveList = data?.[listKey];
    if (!Array.isArray(liveList) || liveList.length === 0) {
      return { items: local.items, filters: local.filters, live: false, loading, error };
    }

    const lookup = byName(local.items);
    const items = liveList.map((item) =>
      overlay(item, lookup.get(String(item.name || "").trim().toLowerCase()))
    );

    return {
      items,
      // Filters come from the live data — a pill with nothing behind it is the
      // bug we already fixed once in the gallery.
      filters: data[filterKey]?.length ? data[filterKey] : local.filters,
      live: true,
      loading,
      error,
    };
  }, [data, loading, error, listKey, filterKey, local]);
}

// useApi hands the fetcher an options object; these endpoints take (params,
// options), so bind the params slot rather than letting the signal land there.
export const useThemes = (local) =>
  useCatalog((options) => fetchThemes(undefined, options), "themes", "filters", local);

export const usePropsCatalog = (local) =>
  useCatalog((options) => fetchProps(undefined, options), "props", "filters", local);

export const usePackages = (local) =>
  useCatalog((options) => fetchPackages(undefined, options), "packages", "filters", local);

export const useStudios = (local) =>
  useCatalog((options) => fetchStudios(undefined, options), "studios", "cities", local);

/** The shoot types the studio actually runs. */
export function useShootTypes(fallback = []) {
  const { data } = useApi(fetchShootTypes, null, []);
  return Array.isArray(data) && data.length ? data : fallback;
}

/**
 * Time slots the studio actually offers.
 *
 * The CRM stores only the clock time, so the morning/afternoon/evening grouping
 * the design shows is derived here rather than invented per component.
 */
export function useTimeSlots(fallback = []) {
  const { data } = useApi(fetchTimeSlots, null, []);

  return useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return fallback;

    const periodFor = (time) => {
      const [, hh, mm, ap] = String(time).match(/(\d{1,2}):(\d{2})\s*([AP]M)/i) || [];
      if (!hh) return "";
      let hour = Number(hh) % 12;
      if (String(ap).toUpperCase() === "PM") hour += 12;
      if (hour < 12) return "Morning";
      return hour < 16 ? "Afternoon" : "Evening";
    };

    return data
      .filter((slot) => slot.time)
      .map((slot) => ({ id: slot.id, time: slot.time, period: periodFor(slot.time) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
}

/**
 * One page of a catalogue, counted and sliced by the backend.
 *
 * The catalogues hold hundreds; asking the browser to hold all of them so it
 * can show twelve was the whole reason /props used to hang.
 */
function usePagedCatalog(fetcher, listKey, { category = "All", page = 1, limit = 12, extra = "" } = {}) {
  const { data, loading, error } = useApi(
    (options) => fetcher({ category, page, limit, ...(extra ? { exclude: extra } : {}) }, options),
    null,
    [category, page, limit, extra]
  );

  return useMemo(
    () => ({
      items: Array.isArray(data?.[listKey]) ? data[listKey] : [],
      filters: data?.filters?.length ? data.filters : ["All"],
      total: Number(data?.total) || 0,
      pages: Number(data?.pages) || 1,
      page: Number(data?.page) || 1,
      loading,
      error,
    }),
    [data, loading, error, listKey]
  );
}

export const usePagedThemes = (options) =>
  usePagedCatalog(fetchThemes, "themes", options);

export const usePagedPackages = (options) =>
  usePagedCatalog(fetchPackages, "packages", options);

/**
 * One page of props, counted and sliced by the backend.
 *
 * The catalogue holds hundreds; asking the browser to hold all of them so it
 * can show ten was the whole reason /props used to hang. `exclude` drops
 * categories that have a page of their own — gowns, for one.
 */
export function usePagedProps({ category = "All", page = 1, limit = 10, exclude = "" } = {}) {
  const { data, loading, error } = useApi(
    (options) => fetchProps({ category, page, limit, exclude }, options),
    null,
    [category, page, limit, exclude]
  );

  return useMemo(
    () => ({
      items: Array.isArray(data?.props) ? data.props : [],
      filters: data?.filters?.length ? data.filters : ["All"],
      total: Number(data?.total) || 0,
      pages: Number(data?.pages) || 1,
      page: Number(data?.page) || 1,
      loading,
      error,
    }),
    [data, loading, error]
  );
}
