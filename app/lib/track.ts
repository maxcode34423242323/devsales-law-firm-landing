declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}

export function splitName(fullName: string) {
  const [firstName, ...rest] = fullName.trim().split(/\s+/);
  return { firstName: firstName || "", lastName: rest.join(" ") };
}
