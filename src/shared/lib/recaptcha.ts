import { RECAPTCHA_SITEKEY } from "../config";

export const getRecaptchaSiteKey = () => {
  const isProd = process.env.NODE_ENV === "production";
  return isProd ? RECAPTCHA_SITEKEY.prod : RECAPTCHA_SITEKEY.dev;
};
