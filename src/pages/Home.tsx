import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      <ul className="space-y-5 text-xl font-semibold">
        <li>
          <Link to="/ticket">티켓 생성</Link>
        </li>
        <li>
          <Link to="/check">captcha 테스트</Link>
        </li>
      </ul>
    </div>
  );
}
