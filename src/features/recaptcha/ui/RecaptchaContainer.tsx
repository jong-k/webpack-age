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
