import React from "react";
import { MessageSquare } from "lucide-react";
import { CARD, PANEL } from "../portalStyles";

/**
 * Figma: Messages tab (1615:12408).
 *
 * Not built yet. The frame is designed, but the studio replies over WhatsApp
 * today — so rather than show a thread that only half works, the tab says so
 * and points the customer at the channel the team actually watches.
 */
const WHATSAPP_NUMBER = "919876543210";

export default function MessagesTab() {
  return (
    <div className={PANEL}>
      <div className={`${CARD} flex flex-col items-center px-6 py-16 text-center`}>
        <span className="flex size-14 items-center justify-center rounded-full bg-[#fff7ed]">
          <MessageSquare className="size-6 text-[#f9a825]" strokeWidth={1.666} />
        </span>

        <p className="pt-5 text-[18px] leading-7 font-bold text-[#1f2937]">Coming soon</p>
        <p className="max-w-[380px] pt-2 text-[14px] leading-[22px] text-[#6a7282]">
          In-portal messaging is on its way. Until then our team is quickest on
          WhatsApp — we usually reply within a couple of hours.
        </p>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex h-[46px] items-center justify-center rounded-[20px] bg-[#f9a825] px-6 text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#e69a1f]"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
