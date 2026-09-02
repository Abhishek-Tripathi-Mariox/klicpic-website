import React from "react";
import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SiteLayout from "../../components/SiteLayout";
import PolicyHero from "../../components/PolicyHero";

/**
 * NOTE: there is no Figma frame for /contact — the nav and footer both link to
 * it, so this page exists to stop those links dead-ending. Every detail below
 * is reused from designed frames (Footer 1550:3328, About 1550:9732) rather
 * than invented. Replace it when a Contact design lands.
 */
const CHANNELS = [
  {
    Icon: Phone,
    label: "Call us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with our team",
    href: "https://wa.me/919876543210",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "hello@klicpic.in",
    href: "mailto:hello@klicpic.in",
  },
];

export default function Contact() {
  return (
    <SiteLayout>
      <PolicyHero
        variant="legal"
        badge="Contact"
        title="Talk to us"
        meta="We reply within 2 hours during studio hours"
      />

      <section className="flex w-full flex-col items-center bg-white px-6 py-16">
        <div className="flex w-full max-w-[720px] flex-col items-start">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {CHANNELS.map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex flex-col items-start rounded-2xl border-[0.57px] border-solid border-[#f3f4f6] bg-white p-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] transition-colors hover:border-[#f9a825]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-[rgba(249,168,37,0.1)]">
                  <Icon className="size-5 text-[#f9a825]" strokeWidth={1.666} />
                </span>
                <span className="pt-3 text-[12px] leading-4 text-[#99a1af]">
                  {label}
                </span>
                <span className="text-[14px] leading-[20px] font-semibold text-[#1f2937]">
                  {value}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-6 w-full rounded-2xl border-[0.57px] border-solid border-[#f3f4f6] bg-[#f9fafb] p-6">
            <h2 className="flex items-center gap-2 text-[16px] leading-6 font-bold text-[#1f2937]">
              <MapPin className="size-4 shrink-0 text-[#f9a825]" strokeWidth={1.666} />
              Visit our studio
            </h2>
            <p className="pt-2 text-[14px] leading-[22px] text-[#6a7282]">
              Studio 12, 4th Floor, MG Road, Bangalore — 560001
            </p>
            <p className="flex items-center gap-2 pt-2 text-[13px] leading-5 text-[#99a1af]">
              <Clock className="size-[13px] shrink-0" strokeWidth={1.666} />
              Mon – Sat · 10 AM – 7 PM · By appointment preferred
            </p>
          </div>

          <div className="mt-8 flex w-full flex-wrap items-center gap-3">
            <Link
              to="/book"
              className="rounded-2xl bg-[#f9a825] px-6 py-3 text-center text-[14px] leading-[20px] font-bold text-white transition-colors hover:bg-[#e69a1f]"
            >
              Start Booking →
            </Link>
            <Link
              to="/faq"
              className="rounded-2xl border-[0.57px] border-solid border-[#e5e7eb] px-6 py-3 text-center text-[14px] leading-[20px] font-bold text-[#1f2937] transition-colors hover:border-[#f9a825]"
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
