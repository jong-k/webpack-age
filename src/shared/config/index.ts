export const ROUTES = {
  HOME: "/",
  TURNSTILE: "/turnstile",
  RECAPTCHA: "/recaptcha",
  "FLIGHT-GENERATOR": "/flight-generator",
} as const;

export const TURNSTILE_SITEKEY = {
  dev: "1x00000000000000000000AA",
  prod: "0x4AAAAAAB2igh-1uc7G0a6x",
} as const;

export const RECAPTCHA_SITEKEY = {
  dev: "6LcIedgrAAAAAOSnuJ4a4LiRxheIfrccuhmE1M-2",
  prod: "6LdGetgrAAAAAKBIR5oIEJQa82TNgrSkP9GfkfPy",
};

export const DEFAULT_BOT_PERCENT = 0.5;
