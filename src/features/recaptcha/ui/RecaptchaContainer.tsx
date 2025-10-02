import { RECAPTCHA_DEFAULT_SCORE } from "../../../shared/config";
import { Button } from "../../../shared/ui";
import { useRecaptcha } from "../model";

export function RecaptchaContainer() {
  const { recaptchaTokenInfo, isPendingRecaptcha, recaptchaScore, runRecaptcha } = useRecaptcha();

  return (
    <div>
      <h2 className="text-2xl font-semibold">Google reCAPTCHA 테스트</h2>
      <h3 className="mt-2 text-xl">아래 버튼을 클릭하여 테스트를 시작하세요</h3>
      <div className="py-6 text-xl">
        {recaptchaTokenInfo.valid !== undefined ? (
          recaptchaTokenInfo.valid === false ? (
            <div className="h-8">
              <p>토큰이 유효하지 않습니다</p>
              <p>{recaptchaTokenInfo.invalidReason}</p>
            </div>
          ) : (
            <div className="h-8">
              <p>사람일 확률: {recaptchaScore * 100}%</p>
            </div>
          )
        ) : recaptchaScore !== RECAPTCHA_DEFAULT_SCORE ? (
          <div className="h-8">
            <p>사람일 확률: {recaptchaScore * 100}%</p>
          </div>
        ) : (
          <div className="h-8"></div>
        )}
      </div>

      <Button onClick={runRecaptcha} title="사람인지 확인" isPending={isPendingRecaptcha} />
    </div>
  );
}
