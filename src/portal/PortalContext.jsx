import React, { createContext, useContext, useMemo, useState } from "react";

/**
 * Session + data for the Klicpic customer portal.
 * Figma: Customer Portal login 1615:9755 / 10008, Dashboard 1615:10258.
 */
const PortalContext = createContext(null);

export function PortalProvider({ children }) {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);

  const value = useMemo(
    () => ({
      phone,
      setPhone,
      user,
      login: (name) => setUser({ name }),
      logout: () => {
        setUser(null);
        setPhone("");
      },
    }),
    [phone, user]
  );

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) throw new Error("usePortal must be used inside PortalProvider");
  return context;
}
