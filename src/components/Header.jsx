import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import logo from "./assets/logo.png";

/**
 * Figma: Header — transparent over the hero on Home (1550:3428) and solid
 * black on inner pages (1550:5034), where the current section is gold.
 *
 * The frames are desktop only. Below 1024px the six links, More, Login and
 * Start Booking cannot fit on one line (they pushed every page to ~820px wide
 * on a phone), so there the bar keeps the logo, a compact Book button and a
 * menu button that opens every link in a panel below it.
 */
export const NAV_LINKS = [
  { label: "Photoshoots", to: "/photoshoots" },
  { label: "Themes", to: "/themes" },
  { label: "Props", to: "/props" },
  { label: "Packages", to: "/packages" },
  { label: "Gallery", to: "/gallery" },
  { label: "Offers", to: "/offers" },
];

/** The "More" menu, captured open in Figma frame 1616:18859. */
export const MORE_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Blog", to: "/blog" },
  { label: "Reviews", to: "/reviews" },
];

export default function Header({ variant = "overlay", active = null }) {
  const isSolid = variant === "solid";
  const [moreOpen, setMoreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const moreRef = useRef(null);
  const { pathname } = useLocation();

  // A link in the panel navigates; close it behind the new page.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!moreOpen) return undefined;
    const onPointerDown = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  return (
    <header
      className={`relative flex w-full flex-col items-center ${
        isSolid || menuOpen
          ? "bg-[rgba(0,0,0,0.95)] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]"
          : ""
      }`}
    >
      <div className="flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src={logo}
            alt="Klicpic"
            className="h-[39.994px] w-[40.563px] shrink-0 object-contain"
          />
        </Link>

        <nav className="hidden shrink-0 items-center gap-6 lg:flex">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={`text-[13px] leading-[19.5px] font-medium whitespace-nowrap transition-colors hover:text-[#f9a825] ${
                active === label ? "text-[#f9a825]" : "text-white"
              }`}
            >
              {label}
            </Link>
          ))}
          <div ref={moreRef} className="relative shrink-0">
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              onClick={() => setMoreOpen((open) => !open)}
              className={`flex h-[19.493px] cursor-pointer items-center gap-1 transition-colors hover:text-[#f9a825] ${
                moreOpen || MORE_LINKS.some((link) => link.label === active)
                  ? "text-[#f9a825]"
                  : "text-white"
              }`}
            >
              <span className="text-[13px] leading-[19.5px] font-medium whitespace-nowrap">
                More
              </span>
              <ChevronDown
                className={`size-[13.996px] transition-transform ${moreOpen ? "rotate-180" : ""}`}
                strokeWidth={1.16631}
              />
            </button>

            {moreOpen && (
              <div
                role="menu"
                className="absolute top-[calc(100%+16px)] left-1/2 z-30 flex w-[100px] -translate-x-1/2 flex-col items-start rounded-[12px] bg-[#1f2937] py-2 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.3),0px_4px_6px_-4px_rgba(0,0,0,0.3)]"
              >
                {MORE_LINKS.map(({ label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                    className={`w-full px-4 py-2 text-[13px] leading-[19.5px] font-medium whitespace-nowrap transition-colors hover:text-[#f9a825] ${
                      active === label ? "text-[#f9a825]" : "text-white"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <a
            href="tel:+919876543210"
            aria-label="Call us"
            className="hidden size-[35.986px] shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10 sm:flex"
          >
            <Phone className="size-[19.997px] text-white" strokeWidth={1.66642} />
          </a>
          <Link
            to="/portal"
            className="hidden shrink-0 items-center justify-center rounded-full px-4 py-2 transition-colors hover:bg-white/10 lg:flex"
          >
            <span className="text-[13px] leading-[19.5px] font-medium whitespace-nowrap text-white">
              Login
            </span>
          </Link>
          <Link
            to="/book"
            className="flex shrink-0 items-center justify-center rounded-full bg-[#f9a825] px-4 py-2 shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#e69a1f] sm:px-5 sm:py-[10px]"
          >
            <span className="text-[13px] leading-[19.5px] font-semibold whitespace-nowrap text-white">
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Start Booking</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="ml-1 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X className="size-6" strokeWidth={1.8} /> : <Menu className="size-6" strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="site-menu"
          className="absolute top-full left-0 z-40 w-full border-t border-white/10 bg-[#0b0b0b] px-4 pt-2 pb-5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.3)] sm:px-6 lg:hidden"
        >
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 sm:grid-cols-2 sm:gap-x-6">
            {[...NAV_LINKS, ...MORE_LINKS].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-white/10 py-3 text-[15px] leading-6 font-medium transition-colors hover:text-[#f9a825] ${
                  active === label ? "text-[#f9a825]" : "text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="mx-auto flex max-w-[1440px] flex-wrap gap-3 pt-4">
            <Link
              to="/portal"
              onClick={() => setMenuOpen(false)}
              className="flex flex-1 items-center justify-center rounded-full border border-white/25 px-4 py-2.5 text-[14px] font-semibold whitespace-nowrap text-white hover:bg-white/10"
            >
              Login
            </Link>
            <a
              href="tel:+919876543210"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-[14px] font-semibold whitespace-nowrap text-white hover:bg-white/10"
            >
              <Phone className="size-4" strokeWidth={1.8} /> Call us
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
