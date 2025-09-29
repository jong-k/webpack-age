import { Link } from "react-router";
import { ROUTES } from "../shared/config";

export default function Home() {
  return (
    <div>
      <ul className="space-y-5 text-xl font-semibold">
        <li>
          <Link to={ROUTES.TURNSTILE}>Cloudflare Turnstile 테스트</Link>
        </li>
        <li>
          <Link to={ROUTES.RECAPTCHA}>Google reCAPTCHA 테스트</Link>
        </li>
        <li>
          <Link to={ROUTES["FLIGHT-GENERATOR"]}>항공권 생성기(준비중)</Link>
        </li>
      </ul>
    </div>
  );
}
