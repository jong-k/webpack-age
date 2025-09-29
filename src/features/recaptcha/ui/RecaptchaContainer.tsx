import { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Button } from "../../../shared/ui";
import { useRecaptcha } from "../model";

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

    const token = await executeRecaptcha("testAction");
    saveRecaptchaToken(token);
    setIsPending(false);
  }, [executeRecaptcha]);

  return (
    <div>
      <h2>Google reCAPTCHA 테스트</h2>
      {!isPending && recaptchaVerified !== "UNKNOWN" && (
        <div>{recaptchaVerified === "HUMAN" ? "사람입니다" : "사람이 아닙니다"}</div>
      )}
      <Button onClick={handleRecaptchaVerify} title="사람인지 확인" isPending={isPending} />
    </div>
  );
}
