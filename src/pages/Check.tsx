import { Turnstile } from "@marsidev/react-turnstile";
import { TURNSTILE_SITEKEY } from "../shared/config";

const siteKey = process.env.NODE_ENV === "production" ? TURNSTILE_SITEKEY.prod : TURNSTILE_SITEKEY.dev;

export default function Check() {
  return (
    <div>
      <Turnstile siteKey={siteKey} />
    </div>
  );
}
