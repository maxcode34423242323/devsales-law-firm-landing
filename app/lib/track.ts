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

export function normalizeUsPhone(rawPhone: string) {
  const trimmed = rawPhone.trim();
  return trimmed.startsWith("+1") ? trimmed : `+1 ${trimmed}`;
}
