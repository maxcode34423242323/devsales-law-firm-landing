"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type ConsentState = "granted" | "denied";

const CONSENT_KEY = "ds_cookie_consent";
const UNKNOWN = "unknown";

function applyConsent(state: ConsentState) {
  window.gtag?.("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return localStorage.getItem(CONSENT_KEY) ?? "none";
}

function getServerSnapshot() {
  return UNKNOWN;
}

function saveConsent(state: ConsentState) {
  localStorage.setItem(CONSENT_KEY, state);
  listeners.forEach((listener) => listener());
}

export default function ConsentBanner() {
  const saved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (saved === "granted" || saved === "denied") {
      applyConsent(saved);
    }
  }, [saved]);

  function handleChoice(state: ConsentState) {
    applyConsent(state);
    saveConsent(state);
  }

  if (saved !== "none") return null;

  return (
    <div className="ds-consent-banner" role="dialog" aria-label="Cookie consent">
      <p>
        We use cookies to measure ad performance and improve your experience. See our{" "}
        <Link href="/privacy" target="_blank">Privacy Policy</Link>.
      </p>
      <div className="ds-consent-actions">
        <button type="button" className="ds-consent-reject" onClick={() => handleChoice("denied")}>Reject</button>
        <button type="button" className="ds-consent-accept" onClick={() => handleChoice("granted")}>Accept</button>
      </div>
    </div>
  );
}
