import { useEffect } from "react";
import { consoleText } from "./console";

export default function App() {
  useEffect(() => {
    consoleText("import한 모듈 호출해서 콘솔 찍어보기");
  }, []);

  return (
    <div>
      <h2 style={{ fontStyle: "italic" }}>created by App.tsx</h2>
    </div>
  );
}
