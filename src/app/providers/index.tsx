import RecaptchaProvider from "./recaptcha";
import ThemeProvider from "./theme";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <RecaptchaProvider>{children}</RecaptchaProvider>
    </ThemeProvider>
  );
}
