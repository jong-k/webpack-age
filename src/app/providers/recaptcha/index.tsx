import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { getRecaptchaSiteKey } from "../../../shared/lib";

const siteKey = getRecaptchaSiteKey();

export default function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
