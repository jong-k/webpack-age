import { Link } from "react-router";

export default function App() {
  return (
    <div>
      <h2>Webpack 실험실</h2>
      <ul>
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
