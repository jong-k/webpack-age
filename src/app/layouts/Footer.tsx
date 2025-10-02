import { ResponsiveBox } from "../../shared/ui";

export default function Footer() {
  return (
    <footer className="w-full bg-black/50 py-4">
      <ResponsiveBox className="flex gap-4">
        <div>Cloudflare Turnstile 상태 (준비중)</div>
        <div>Google reCAPTCHA 상태 (준비중)</div>
      </ResponsiveBox>
    </footer>
  );
}
