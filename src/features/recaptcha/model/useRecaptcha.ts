import { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { RECAPTCHA_ACTION } from "../../../shared/config";
import { END_POINTS } from "../../../shared/config";
import { getRecaptchaSiteKey } from "../../../shared/lib";

interface RecaptchaTokenInfo {
  valid: boolean | undefined;
  invalidReason: string;
}

const SITE_KEY = getRecaptchaSiteKey();

export const useRecaptcha = () => {
  const [isPending, setIsPending] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<RecaptchaTokenInfo>({
    valid: undefined,
    invalidReason: "",
  });
  const [isHumanPercent, setIsHumanPercent] = useState<number>(0.5);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const runRecaptcha = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    setIsPending(true);
    try {
      const token = await executeRecaptcha(RECAPTCHA_ACTION);
      const res = await fetch(`${END_POINTS.recaptcha}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: {
            token,
            expectedAction: RECAPTCHA_ACTION,
            siteKey: SITE_KEY,
          },
        }),
      });
      const { tokenProperties, riskAnalysis } = await res.json();
      setTokenInfo({
        valid: tokenProperties.valid as boolean,
        invalidReason: (tokenProperties.invalidReason || "") as string,
      });
      const score = riskAnalysis.score as number;
      if (score > 0) setIsHumanPercent(score);
    } catch (err) {
      console.error("reCAPTCHA 실행 실패", err);
    } finally {
      setIsPending(false);
    }
  }, [executeRecaptcha]);

  return {
    recaptchaTokenInfo: tokenInfo,
    isPendingRecaptcha: isPending,
    isHumanPercentByRecaptcha: isHumanPercent,
    runRecaptcha,
  };
};
