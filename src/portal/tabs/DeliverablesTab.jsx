import React from "react";
import { Images, Play } from "lucide-react";
import { imageUrl } from "../../api/imageUrl";
import { CARD } from "../portalStyles";
import editedPhotos from "./assets/edited-photos.png";
import premiumAlbum from "./assets/premium-album.png";
import instagramReel from "./assets/instagram-reel.png";
import cinematicVideo from "./assets/cinematic-video.png";
import framedPrints from "./assets/framed-prints.png";

/**
 * Figma: Selections / Deliverables (1615:12026 → content 1615:12105).
 * Five cards — a photo strip with a stage badge and title, then a footer row
 * carrying a coloured dot, a one-line spec, and sometimes a sample button.
 *
 * The frame lists the studio's standard deliverables. Where the booking has
 * real deliverable rows, their status replaces the frame's stage label so the
 * customer sees where each one actually is.
 */
const DELIVERABLES = [
  {
    key: "edited_photos",
    image: editedPhotos,
    title: "Edited Photos",
    stage: "Pending Shoot",
    spec: "30–60 photos post colour grading",
    dot: "bg-[#7c3aed]",
    wide: false,
  },
  {
    key: "album",
    image: premiumAlbum,
    title: "Premium Album",
    stage: "After Editing",
    spec: "Hardbound album · Multiple sizes",
    dot: "bg-[#059669]",
    action: { label: "View Samples", className: "bg-[#059669]", icon: Images },
    wide: false,
  },
  {
    key: "reels",
    image: instagramReel,
    title: "Instagram Reel",
    stage: "After Shoot",
    spec: "60-sec edited reel with music",
    dot: "bg-[#dc2626]",
    action: {
      label: "See Sample",
      style: {
        backgroundImage:
          "linear-gradient(166.08deg, rgb(131,58,180) 0%, rgb(253,29,29) 100%)",
      },
      icon: Play,
    },
    wide: false,
  },
  {
    key: "cinematic_video",
    image: cinematicVideo,
    title: "Cinematic Video",
    stage: "Premium Only",
    spec: "3–10 min film · 4K quality",
    dot: "bg-[#d97706]",
    action: { label: "See Sample", className: "bg-[#1f2937]", icon: Play },
    playOverlay: true,
    wide: false,
  },
  {
    key: "frames",
    image: framedPrints,
    title: "Framed Prints",
    stage: "Post Delivery",
    note: "10×12 inch premium framed print",
    dot: "",
    wide: true,
  },
];

/** Shown behind the photo while it loads, and if a live image 404s. */
const STRIP_FALLBACK = "bg-gradient-to-br from-[#3f4550] to-[#1f2937]";

function DeliverableCard({ item, live }) {
  const Icon = item.action?.icon;
  const stage = live?.status
    ? live.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : item.stage;

  return (
    <article
      className={`${CARD} flex flex-col overflow-hidden ${item.wide ? "sm:col-span-2" : ""}`}
    >
      <div className={`relative h-[143.996px] w-full shrink-0 overflow-hidden ${STRIP_FALLBACK}`}>
        {/* The frame ships artwork for each deliverable; a booking that has a
            real photo for one overrides it. */}
        <img
          src={live?.image ? imageUrl(live.image, item.wide ? 1280 : 640) : item.image}
          alt={item.title}
          loading="lazy"
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
          }}
        />

        <span className="absolute top-3 right-3 rounded-full bg-[rgba(253,199,0,0.9)] px-3 py-1 text-[12px] leading-4 font-bold whitespace-nowrap text-[#1f2937]">
          {stage}
        </span>

        {item.playOverlay && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-10 items-center justify-center rounded-full border-[0.57px] border-solid border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.2)] backdrop-blur-[8px]">
              <Play className="size-5 text-white" strokeWidth={1.666} />
            </span>
          </span>
        )}

        <p className="absolute bottom-3 left-4 text-[16px] leading-6 font-bold text-white">
          {item.title}
        </p>
        {item.note && (
          <p className="absolute right-4 bottom-4 text-[12px] leading-4 text-[rgba(255,255,255,0.6)]">
            {item.note}
          </p>
        )}
      </div>

      {item.spec && (
        <div className="flex w-full items-center justify-between gap-2 px-4 py-3">
          <span className="flex items-center gap-2">
            <span className={`size-2 shrink-0 rounded-full ${item.dot}`} />
            <span className="text-[12px] leading-4 text-[#99a1af]">{item.spec}</span>
          </span>

          {item.action && (
            <button
              type="button"
              style={item.action.style}
              className={`flex shrink-0 cursor-pointer items-center gap-1 rounded-[20px] px-3 py-[6px] text-[12px] leading-4 font-bold text-white transition-opacity hover:opacity-90 ${item.action.className || ""}`}
            >
              <Icon className="size-3 shrink-0" strokeWidth={1.666} />
              {item.action.label}
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default function DeliverablesTab({ booking }) {
  const live = new Map(
    (booking?.deliverables || []).map((item) => [item.type, item])
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {DELIVERABLES.map((item) => (
          <DeliverableCard key={item.key} item={item} live={live.get(item.key)} />
        ))}
      </div>

      <div className="mt-5 rounded-2xl border-[0.57px] border-solid border-[#ffedd4] bg-[#fff7ed] p-5">
        <p className="text-[14px] leading-[20px] text-[#1f2937]">
          💡 Deliverables will be updated in real-time as your shoot progresses.
          You'll receive WhatsApp notifications at each stage.
        </p>
      </div>
    </div>
  );
}
