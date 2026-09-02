import React from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import logo from "./assets/logo.png";

/**
 * Figma: Footer (1550:3328) — identical on every page.
 */
const CONTACTS = [
  { Icon: Phone, label: "+91 98765 43210", href: "tel:+919876543210" },
  { Icon: Mail, label: "hello@klicpic.in", href: "mailto:hello@klicpic.in" },
  { Icon: MapPin, label: "Studio 12, MG Road, Bangalore", href: null },
];

const LINK_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Experiences",
    links: [
      { label: "Photoshoots", to: "/photoshoots" },
      { label: "Themes", to: "/themes" },
      { label: "Props", to: "/props" },
      { label: "Gowns", to: "/gowns" },
      { label: "Packages", to: "/packages" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Refund Policy", to: "/refund" },
    ],
  },
];

const SOCIALS = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Camera, label: "Portfolio" },
];

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center bg-[#111827]">
      <div className="flex w-full max-w-[1440px] flex-col items-start px-6 py-16">
        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start">
            <img
              src={logo}
              alt="Klicpic"
              className="h-[35.997px] w-[36.511px] shrink-0 object-contain"
            />
            <p className="pt-4 text-[14px] leading-[22.75px] text-[rgba(255,255,255,0.4)]">
              Premium photography studio crafting memories that last a lifetime.
            </p>
            <div className="flex flex-col items-start gap-2 pt-5">
              {CONTACTS.map(({ Icon, label, href }) => {
                const content = (
                  <>
                    <Icon
                      className="size-4 shrink-0 text-[rgba(255,255,255,0.4)]"
                      strokeWidth={1.333}
                    />
                    <span className="text-[14px] leading-[20px] text-[rgba(255,255,255,0.4)]">
                      {label}
                    </span>
                  </>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2 transition-colors hover:text-[#f9a825]"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label} className="flex items-center gap-2">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          {LINK_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col items-start">
              <h4 className="text-[14px] leading-[20px] font-semibold whitespace-nowrap text-white">
                {column.title}
              </h4>
              <ul className="flex flex-col items-start gap-[10px] pt-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[14px] leading-[20px] whitespace-nowrap text-[rgba(255,255,255,0.4)] transition-colors hover:text-[#f9a825]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col items-center pt-12">
          <div className="flex w-full flex-col items-center justify-between gap-6 border-t-[0.701px] border-solid border-[rgba(255,255,255,0.08)] pt-8 md:flex-row">
            <p className="font-script text-[24px] leading-8 font-normal whitespace-nowrap text-[rgba(255,255,255,0.3)]">
              Crafting Memories Since 2015
            </p>

            <div className="flex items-start gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={label}
                  className="flex size-[35.997px] items-center justify-center rounded-full border-[0.701px] border-solid border-[rgba(249,168,37,0.2)] bg-[rgba(249,168,37,0.12)] transition-colors hover:bg-[rgba(249,168,37,0.25)]"
                >
                  <Icon className="size-4 text-[#f9a825]" strokeWidth={1.333} />
                </a>
              ))}
            </div>

            <p className="text-[12px] leading-4 whitespace-nowrap text-[rgba(255,255,255,0.25)]">
              © 2026 Klicpic. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
