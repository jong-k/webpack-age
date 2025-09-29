import { useEffect, useState } from "react";
import { RECAPTCHA_TOKEN_KEY } from "../../../shared/config";

export const useRecaptcha = () => {
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  useEffect(() => {
    const recaptchaToken = sessionStorage.getItem(RECAPTCHA_TOKEN_KEY);
    setRecaptchaVerified(!!recaptchaToken);
  }, []);

  return {
    recaptchaVerified,
  };
};
