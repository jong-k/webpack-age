import { useEffect, useState } from "react";
import fieldImg from "./assets/images/field.jpg";
import { consoleText } from "./console";

export default function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    consoleText("import한 모듈 호출해서 콘솔 찍어보기");
  }, []);

  return (
    <div>
      <h2 className="italic text-2xl">앱 전역에 프리텐다드 글꼴 잘 적용되었는지 확인하기</h2>
      <h2 className="my-4">개발서버 실행 후 {count} 초 경과</h2>
      <img src={fieldImg} alt="field" />
    </div>
  );
}
