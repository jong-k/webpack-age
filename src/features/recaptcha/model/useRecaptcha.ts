import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { END_POINTS, RECAPTCHA_ACTION, RECAPTCHA_DEFAULT_SCORE, RECAPTCHA_SCORE_KEY } from "../../../shared/config";
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
  const [recaptchaScore, setRecpatchaScore] = useState<number>(RECAPTCHA_DEFAULT_SCORE);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const score = sessionStorage.getItem(RECAPTCHA_SCORE_KEY);
    if (score !== null) setRecpatchaScore(JSON.parse(score));
  }, []);

  const runRecaptcha = useCallback(async () => {
    if (!executeRecaptcha) {
      console.error("reCAPTCHA 로딩 실패");
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
      if (score > 0) {
        setRecpatchaScore(score);
        sessionStorage.setItem(RECAPTCHA_SCORE_KEY, String(score));
      }
    } catch (err) {
      console.error("reCAPTCHA 실행 실패", err);
    } finally {
      setIsPending(false);
    }
  }, [executeRecaptcha]);

  return {
    recaptchaTokenInfo: tokenInfo,
    isPendingRecaptcha: isPending,
    recaptchaScore,
    runRecaptcha,
  };
};
