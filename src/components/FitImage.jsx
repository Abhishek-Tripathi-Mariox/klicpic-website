import React from "react";

/**
 * A photo shown whole — never cropped — in a box of any shape.
 *
 * Catalogue photos come in every shape (tall gowns, wide backdrops, square
 * product shots), so no single crop suits them. The photo is fitted inside
 * the box (object-contain) and a blurred, faded copy of itself fills whatever
 * space is left, so the box still looks full rather than letterboxed.
 *
 *   <FitImage src={url} alt="…" className="h-[320px] w-full rounded-2xl" />
 *
 * `className` sizes and shapes the box (it is `relative` and clips its fill);
 * anything passed as children is layered on top — badges, a caption scrim.
 * `fill="none"` drops the blurred copy for photos on a plain background, and
 * `tone` sets the colour behind it all ("light" or "dark").
 */
export default function FitImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  fill = "blur",
  tone = "light",
  loading = "lazy",
  children,
  ...rest
}) {
  const ground = tone === "dark" ? "bg-[#1f2937]" : "bg-[#f3f4f6]";

  return (
    <span className={`relative block overflow-hidden ${ground} ${className}`} {...rest}>
      {src && fill === "blur" && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading={loading}
          className="pointer-events-none absolute inset-0 size-full scale-125 object-cover opacity-60 blur-2xl"
        />
      )}
      {src && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={`pointer-events-none absolute inset-0 size-full object-contain ${imgClassName}`}
        />
      )}
      {children}
    </span>
  );
}
