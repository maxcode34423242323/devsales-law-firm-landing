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

function extractUsPhoneDigits(rawPhone: string) {
  const digits = rawPhone.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
}

export function isValidUsPhone(rawPhone: string) {
  return extractUsPhoneDigits(rawPhone).length === 10;
}

export function normalizeUsPhone(rawPhone: string) {
  return `+1 ${extractUsPhoneDigits(rawPhone)}`;
}
