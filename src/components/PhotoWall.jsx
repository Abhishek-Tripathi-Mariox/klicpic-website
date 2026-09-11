import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { imageUrl } from "../api/imageUrl";

/**
 * The masonry wall shared by the home "Real Memories" section (Figma 1550:2576)
 * and the Studio Gallery page (1550:8378), plus the lightbox the home section
 * promises ("Click any photo to explore").
 *
 * Every photo keeps its own shape — nothing is cropped — so the columns are
 * true masonry. Photos are dealt left to right, which keeps the reading order
 * the lightbox pages through, and the column count follows the width the wall
 * actually has: one on a phone, up to four on a desktop.
 */
const MAX_COLUMNS = 4;
const MIN_COLUMN_WIDTH = 240;
const GAP = 16;

function packColumns(photos, count) {
  const columns = Array.from({ length: count }, () => []);
  photos.forEach((photo, index) => columns[index % count].push({ ...photo, index }));
  return columns;
}

/** How many columns of at least MIN_COLUMN_WIDTH fit in the element. */
function useColumnCount(ref) {
  const [count, setCount] = useState(1);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const measure = () => {
      const fit = Math.floor((element.clientWidth + GAP) / (MIN_COLUMN_WIDTH + GAP));
      setCount(Math.max(1, Math.min(MAX_COLUMNS, fit)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return count;
}

function Lightbox({ photos, index, onClose, onMove }) {
  const photo = photos[index];

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onMove(1);
      if (event.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, onMove]);

  if (!photo) return null;

  // The arrows sit beside the photo, never on it; a phone has no room beside
  // it, so there they drop below.
  const arrow =
    "absolute bottom-6 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-5 right-5 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
      >
        <X className="size-5" />
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              onMove(-1);
            }}
            className={`${arrow} left-4`}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              onMove(1);
            }}
            className={`${arrow} right-4`}
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      <figure
        className="flex max-h-full max-w-full flex-col items-center sm:max-w-[min(1100px,calc(100%-7rem))]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl(photo.image, 1280)}
          alt={photo.title}
          className="max-h-[68vh] w-auto max-w-full rounded-2xl object-contain sm:max-h-[80vh]"
        />
        <figcaption className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-12 pt-4 text-center">
          <span className="text-[16px] font-semibold text-white">{photo.title}</span>
          <span className="rounded-full bg-[#f9a825] px-3 py-[2px] text-[12px] font-bold text-[#0f1117]">
            {photo.category}
          </span>
          <span className="text-[12px] text-white/50">
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

export default function PhotoWall({ photos }) {
  const wallRef = useRef(null);
  const fit = useColumnCount(wallRef);
  const count = Math.min(fit, photos.length) || 1;
  const columns = useMemo(() => packColumns(photos, count), [photos, count]);
  const [open, setOpen] = useState(null);

  // A new page or filter is a new set — any open photo belongs to the old one.
  useEffect(() => setOpen(null), [photos]);

  const move = (step) =>
    setOpen((current) => (current === null ? null : (current + step + photos.length) % photos.length));

  return (
    <>
      <div ref={wallRef} className="flex w-full items-start justify-center gap-4">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex max-w-[336px] min-w-0 flex-1 flex-col items-stretch gap-4">
            {column.map((item) => (
              // The hover lift scales the whole card; zooming the photo inside
              // a clipped frame would trim its edges.
              <figure
                key={item.id}
                onClick={() => setOpen(item.index)}
                className="group relative w-full cursor-pointer overflow-hidden rounded-[20px] bg-[#f3f4f6] transition-transform duration-500 hover:scale-[1.02]"
              >
                <img
                  src={imageUrl(item.image, 640)}
                  alt={item.title}
                  loading="lazy"
                  className="pointer-events-none block h-auto w-full"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="truncate text-[14px] font-semibold text-white">{item.title}</span>
                  <span className="shrink-0 rounded-full bg-[#f9a825] px-2.5 py-[2px] text-[11px] font-bold text-[#0f1117]">
                    {item.category}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>

      {open !== null && (
        <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onMove={move} />
      )}
    </>
  );
}
