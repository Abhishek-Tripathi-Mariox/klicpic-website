import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  fetchPortalProfile,
  portalLogout,
  sendPortalOtp,
  verifyPortalOtp,
} from "../api/endpoints";
import { getPortalToken } from "../api/client";

/**
 * Session for the Klicpic customer portal.
 * Figma: login 1615:9755 / 10008, dashboard 1615:10258.
 *
 * The token lives in localStorage, so a returning visitor lands straight on
 * their dashboard instead of re-entering a code. On mount we ask the backend
 * who that token belongs to — if it has expired or been revoked, the request
 * fails and we fall back to the login screen.
 */
const PortalContext = createContext(null);

export function PortalProvider({ children }) {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  // Distinguishes "checking a stored token" from "definitely logged out", so
  // the login screen doesn't flash before a valid session resolves.
  const [restoring, setRestoring] = useState(() => Boolean(getPortalToken()));

  useEffect(() => {
    if (!getPortalToken()) return undefined;

    let active = true;
    fetchPortalProfile()
      .then((profile) => {
        if (!active) return;
        setUser(profile);
        setPhone(profile.mobile || "");
      })
      .catch(() => {
        // Expired or revoked — client.js has already cleared the token.
      })
      .finally(() => {
        if (active) setRestoring(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const requestOtp = useCallback(async (mobile) => sendPortalOtp(mobile), []);

  const verifyOtp = useCallback(async (mobile, otp) => {
    const { customer } = await verifyPortalOtp(mobile, otp);
    setUser(customer);
    setPhone(customer.mobile || mobile);
    return customer;
  }, []);

  const logout = useCallback(() => {
    portalLogout();
    setUser(null);
    setPhone("");
  }, []);

  const value = useMemo(
    () => ({ phone, setPhone, user, restoring, requestOtp, verifyOtp, logout }),
    [phone, user, restoring, requestOtp, verifyOtp, logout]
  );

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) throw new Error("usePortal must be used inside PortalProvider");
  return context;
}
