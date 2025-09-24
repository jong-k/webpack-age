import { TurnstileBox } from "../../../features/turnstile/ui";

export function TurnstileContainer() {
  return (
    <div>
      <h2>Cloudflare Turnstile 사용해보기</h2>
      <div>
        내용
        <TurnstileBox />
      </div>
    </div>
  );
}
