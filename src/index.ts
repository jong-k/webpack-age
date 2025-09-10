import { consoleText } from "./console";

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (!root) return;

  const h2 = document.createElement("h2");
  h2.textContent = "created by index.js";
  h2.style.fontStyle = "italic";

  root.appendChild(h2);
  consoleText("import한 모듈 호출해서 콘솔 찍어보기");
});
