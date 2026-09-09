import { useMemo } from "react";
import { fetchContent } from "./endpoints";
import { useApi } from "./useApi";

/** "royal-boho.jpg" — a bare filename, not something a browser can load. */
const isBareAssetName = (value) =>
  typeof value === "string" &&
  /\.(jpe?g|png|webp|svg|avif)$/i.test(value) &&
  !value.includes("/") &&
  !value.startsWith("data:");

/**
 * Overlays the API's content on the bundled copy.
 *
 * The content blocks were seeded from these very files, so the shapes match.
 * The one thing the database cannot carry is an image: Vite rewrites each
 * import into a hashed bundle URL at build time, and the seeder could only
 * store the original filename. Wherever the API hands back a bare filename we
 * therefore keep the bundled value, which is the same picture with a URL the
 * browser can actually fetch.
 *
 * Arrays are matched by position — both sides come from the same source file,
 * so order is the reliable key. Anything the API adds beyond the local copy is
 * taken as-is.
 */
function mergeContent(remote, local) {
  if (remote === undefined || remote === null) return local;

  if (isBareAssetName(remote) && typeof local === "string" && !isBareAssetName(local)) {
    return local;
  }

  if (Array.isArray(remote)) {
    if (!Array.isArray(local)) return remote;
    return remote.map((item, index) => mergeContent(item, local[index]));
  }

  if (remote && typeof remote === "object") {
    if (!local || typeof local !== "object" || Array.isArray(local)) return remote;
    return Object.fromEntries(
      Object.keys(remote).map((key) => [key, mergeContent(remote[key], local[key])])
    );
  }

  return remote;
}

/**
 * One editorial block, live from the backend, falling back to the copy this
 * build shipped with. `fallback` is what renders while the request is in
 * flight and if it never lands.
 */
export function useContent(key, fallback) {
  const { data, loading, error } = useApi(
    (options) => fetchContent(key, options),
    null,
    [key]
  );

  const content = useMemo(
    () => (data ? mergeContent(data, fallback) : fallback),
    // fallback is a module constant in every caller, so it is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return { content, loading, error };
}
