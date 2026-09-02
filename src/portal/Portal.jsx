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
  const { user } = usePortal();
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
