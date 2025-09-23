import { Link } from "react-router";
import { ROUTES } from "../shared/config";

export default function Home() {
  return (
    <div>
      <ul className="space-y-5 text-xl font-semibold">
        <li>
          <Link to={ROUTES.TICKET}>티켓 생성</Link>
        </li>
        <li>
          <Link to={ROUTES.CHECK}>captcha 테스트</Link>
        </li>
      </ul>
    </div>
  );
}
