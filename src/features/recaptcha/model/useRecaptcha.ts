import { useEffect, useState } from "react";
import { RECAPTCHA_TOKEN_KEY } from "../../../shared/config";

export type RecaptchaVerifiedResult = "UNKNOWN" | "HUMAN" | "BOT";

export const useRecaptcha = () => {
  const [recaptchaVerified, setRecaptchaVerified] = useState<RecaptchaVerifiedResult>("UNKNOWN");

  const saveRecaptchaToken = (token: string) => {
    if (token) {
      setRecaptchaVerified("HUMAN");
      sessionStorage.setItem(RECAPTCHA_TOKEN_KEY, token);
    } else {
      setRecaptchaVerified("BOT");
      sessionStorage.removeItem(RECAPTCHA_TOKEN_KEY);
    }
  };

  useEffect(() => {
    const recaptchaToken = sessionStorage.getItem(RECAPTCHA_TOKEN_KEY);
    if (recaptchaToken) setRecaptchaVerified("HUMAN");
    else setRecaptchaVerified("UNKNOWN");
  }, []);

  return {
    recaptchaVerified,
    saveRecaptchaToken,
  };
};
