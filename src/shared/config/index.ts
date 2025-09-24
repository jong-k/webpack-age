export const ROUTES = {
  HOME: "/",
  CHECK: "/check",
  TICKET: "/ticket",
  TURNSTILE: "/turnstile",
} as const;

export const TURNSTILE_SITEKEY = {
  dev: "1x00000000000000000000AA",
  prod: "0x4AAAAAAB2igh-1uc7G0a6x",
} as const;

export const DEFAULT_BOT_PERCENT = 0.5;
