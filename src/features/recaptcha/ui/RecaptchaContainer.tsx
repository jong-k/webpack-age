import { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { END_POINTS, RECAPTCHA_ACTION } from "../../../shared/config";
import { getRecaptchaSiteKey } from "../../../shared/lib";
import { Button } from "../../../shared/ui";
import { useRecaptcha } from "../model";

const siteKey = getRecaptchaSiteKey();

export function RecaptchaContainer() {
  const [isPending, setIsPending] = useState(false);
  const { recaptchaVerified, saveRecaptchaToken } = useRecaptcha();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleRecaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    setIsPending(true);
    try {
      const token = await executeRecaptcha(RECAPTCHA_ACTION);
      const res = await fetch(`${END_POINTS.recaptcha}${siteKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: {
            token,
            expectedAction: RECAPTCHA_ACTION,
            siteKey,
          },
        }),
      });
      console.log(res);

      if (!res.ok) {
        throw new Error(`reCAPTCHA verify request failed: ${res.status}`);
      }

      const data = await res.json();
      const isValid = Boolean(data?.tokenProperties?.valid);
      const actionMatches = data?.tokenProperties?.action === RECAPTCHA_ACTION;

      if (isValid && actionMatches) {
        saveRecaptchaToken(token);
      } else {
        saveRecaptchaToken("");
      }
    } catch (err) {
      console.error("reCAPTCHA 실행 실패", err);
    } finally {
      setIsPending(false);
    }
  }, [executeRecaptcha]);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Google reCAPTCHA 테스트</h2>
      <h3 className="mt-2 text-xl">아래 버튼을 클릭하여 테스트를 시작하세요</h3>
      <div className="py-6 text-xl">
        {!isPending && recaptchaVerified !== "UNKNOWN" ? (
          <div className="h-8">{recaptchaVerified === "HUMAN" ? "사람입니다 🧑" : "사람이 아닙니다 🤖"}</div>
        ) : (
          <div className="h-8"></div>
        )}
      </div>

      <Button onClick={handleRecaptchaVerify} title="사람인지 확인" isPending={isPending} />
    </div>
  );
}
