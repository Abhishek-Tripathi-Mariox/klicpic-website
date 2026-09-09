import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ThemeLibrary from "./pages/ThemeLibrary/ThemeLibrary";
import PhotoshootCatalog from "./pages/PhotoshootCatalog/PhotoshootCatalog";
import Offers from "./pages/Offers/Offers";
import About from "./pages/About/About";
import BookingFlow from "./booking/BookingFlow";
import Portal from "./portal/Portal";
import Contact from "./pages/Contact/Contact";
import Blog from "./pages/Blog/Blog";
import BlogPost from "./pages/Blog/BlogPost";
import NotFound from "./pages/NotFound";
import PropsCatalog from "./pages/PropsCatalog/PropsCatalog";
import Packages from "./pages/Packages/Packages";
import StudioGallery from "./pages/StudioGallery/StudioGallery";
import StudioLocations from "./pages/StudioLocations/StudioLocations";
import Careers from "./pages/Careers/Careers";
import FAQPage from "./pages/FAQ/FAQ";
import Privacy from "./pages/Legal/Privacy";
import Terms from "./pages/Legal/Terms";
import Refund from "./pages/Legal/Refund";

/**
 * Klicpic marketing site.
 * Figma: https://www.figma.com/design/0Risw5IFyKj8GlViCAo7pe/Klicpic
 *
 * Route → Figma frame
 *   /             Home            1550:2022
 *   /photoshoots  Photoshoot Catalog 1616:18859
 *   /photoshoots/themes  Theme Library 1550:5078 (Photoshoots active)
 *   /themes       Theme Library   1550:3598  (Themes active)
 *   /props        Props Catalog   1550:6558
 *   /packages     Packages        1550:7831
 *   /gallery      Studio Gallery  1550:8378
 *   /careers      Careers         1550:9954 / 10438 / 10988 (3 states)
 *   /offers       Exclusive Offers 1550:9145
 *   /about        About Klicpic   1550:9523
 *   /book         Booking wizard  1550:11454 · 11817 · 12236 · 13236 · 14898 · 15939 · 1561:1996
 *   /portal       Customer Portal 1615:9755 · 10008 · 10258
 *   /contact      Contact         (no Figma frame — linked from nav/footer)
 *   /blog         Blog            (no Figma frame — linked from nav/footer)
 *   *             404             catch-all
 *   /faq          FAQ             1616:20695
 *   /privacy      Privacy Policy  1616:21184
 *   /terms        Terms           1616:21799
 *   /refund       Refund Policy   1616:22448
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photoshoots" element={<PhotoshootCatalog />} />
        <Route
          path="/photoshoots/themes"
          element={<ThemeLibrary variant="photoshoots" activeNav="Photoshoots" />}
        />
        <Route
          path="/themes"
          element={<ThemeLibrary variant="themes" activeNav="Themes" />}
        />
        <Route path="/props" element={<PropsCatalog />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/gallery" element={<StudioGallery />} />
        <Route path="/studios" element={<StudioLocations />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<BookingFlow />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
