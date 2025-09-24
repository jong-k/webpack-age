import { Turnstile } from "@marsidev/react-turnstile";
import { getTurnstileSiteKey } from "../../shared/lib/turnstile";

const siteKey = getTurnstileSiteKey();

export default function TurnstileContainer() {
  return (
    <div>
      <h2 className="mb-8 w-fit bg-blue-200 p-2 text-2xl font-bold shadow-md">Cloudflare Turnstile 테스트</h2>
      <Turnstile siteKey={siteKey} onSuccess={token => console.log(token)} />
    </div>
  );
}
