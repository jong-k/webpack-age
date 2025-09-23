import { TURNSTILE_SITEKEY } from "../config";

export const getTurnstileSiteKey = () => {
  const isProd = process.env.NODE_ENV === "production";
  return isProd ? TURNSTILE_SITEKEY.prod : TURNSTILE_SITEKEY.dev;
};
