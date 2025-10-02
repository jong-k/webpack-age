import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { END_POINTS, RECAPTCHA_ACTION, RECAPTCHA_SCORE_KEY } from "../../../shared/config";
import { getRecaptchaSiteKey } from "../../../shared/lib";

interface RecaptchaTokenInfo {
  valid: boolean | null;
  invalidReason: string;
}

const SITE_KEY = getRecaptchaSiteKey();

export const useRecaptcha = () => {
  const [isPending, setIsPending] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<RecaptchaTokenInfo>({
    valid: null, // token 발행 전 상태
    invalidReason: "",
  });
  const [recaptchaScore, setRecpatchaScore] = useState<number | null>(null); // null: score 측정 전 상태
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const score = sessionStorage.getItem(RECAPTCHA_SCORE_KEY);
    if (score !== null) setRecpatchaScore(Number(score));
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
      const isValidToken = !!tokenProperties.valid;
      setTokenInfo({
        valid: isValidToken,
        invalidReason: (tokenProperties.invalidReason || "") as string,
      });
      if (isValidToken) {
        const score = riskAnalysis.score as number;
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
