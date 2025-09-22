import { Turnstile } from "@marsidev/react-turnstile";
import { TURNSTILE_SITEKEY } from "../shared/config";

const siteKey = process.env.NODE_ENV === "development" ? TURNSTILE_SITEKEY.dev : TURNSTILE_SITEKEY.prod;

export default function Check() {
  return (
    <div>
      <Turnstile siteKey={siteKey} />
    </div>
  );
}
