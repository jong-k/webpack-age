export const ROUTES = {
  HOME: "/",
  TURNSTILE: "/turnstile",
  RECAPTCHA: "/recaptcha",
  "FLIGHT-GENERATOR": "/flight-generator",
} as const;

export const END_POINTS = {
  recaptcha: `https://recaptchaenterprise.googleapis.com/v1/projects/webpack-age/assessments?key=${process.env.PUBLIC_GOOGLE_CLOUD_API_KEY}`,
};

export const TURNSTILE_SITEKEY = {
  dev: "1x00000000000000000000AA",
  prod: "0x4AAAAAAB2igh-1uc7G0a6x",
} as const;

export const RECAPTCHA_SITEKEY = {
  dev: "6LcIedgrAAAAAOSnuJ4a4LiRxheIfrccuhmE1M-2",
  prod: "6LdGetgrAAAAAKBIR5oIEJQa82TNgrSkP9GfkfPy",
};
export const RECAPTCHA_SCORE_KEY = "recaptcha-score";
export const RECAPTCHA_ACTION = "WEBPACK_AGE";
export const RECAPTCHA_DEFAULT_SCORE = 0.5;

export const DEFAULT_BOT_PERCENT = 0.5;
