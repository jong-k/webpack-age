import { Turnstile } from "@marsidev/react-turnstile";
import { getTurnstileSiteKey } from "../shared/lib";

const siteKey = getTurnstileSiteKey();

export default function Check() {
  return (
    <div>
      <Turnstile siteKey={siteKey} />
    </div>
  );
}
