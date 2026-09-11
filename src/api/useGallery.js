import { useMemo } from "react";
import { fetchGallery } from "./endpoints";
import { useApi } from "./useApi";

/**
 * Portfolio photos from the admin's Media Library — the live ones only.
 *
 * There is no bundled fallback: the gallery shows the studio's real work or
 * nothing, never stock photography standing in for it.
 */
export function useGallery({ category = "All", page = 1, limit = 12 } = {}) {
  const { data, loading, error } = useApi(
    (options) => fetchGallery({ category, page, limit }, options),
    null,
    [category, page, limit]
  );

  return useMemo(
    () => ({
      photos: Array.isArray(data?.photos) ? data.photos : [],
      categories: Array.isArray(data?.categories) ? data.categories : [],
      total: Number(data?.total) || 0,
      matching: Number(data?.matching) || 0,
      pages: Number(data?.pages) || 1,
      loading,
      error,
    }),
    [data, loading, error]
  );
}
