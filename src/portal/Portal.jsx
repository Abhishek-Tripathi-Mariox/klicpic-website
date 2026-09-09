import React from "react";
import SiteLayout from "../components/SiteLayout";
import { PortalProvider, usePortal } from "./PortalContext";
import PortalLogin from "./PortalLogin";
import PortalDashboard from "./PortalDashboard";

/**
 * Klicpic customer portal.
 * Figma: login 1615:9755 / 10008 · dashboard 1615:10258 / 10956.
 */
function PortalRoutes() {
  const { user, restoring } = usePortal();

  // A stored token is still being checked — showing the login here would make
  // a returning customer think they had been signed out.
  if (restoring) {
    return (
      <div className="flex w-full items-center justify-center px-6 py-32">
        <p className="text-[14px] leading-[20px] text-[#99a1af]">Signing you in…</p>
      </div>
    );
  }

  return user ? <PortalDashboard /> : <PortalLogin />;
}

export default function Portal() {
  return (
    <PortalProvider>
      <SiteLayout>
        <PortalRoutes />
      </SiteLayout>
    </PortalProvider>
  );
}
