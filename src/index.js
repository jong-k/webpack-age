// id 가 root인 div를 찾아서 그안에 h2 created by index.js 넣고 폰트 이탤릭으로 지정
window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (!root) return;

  const h2 = document.createElement("h2");
  h2.textContent = "created by index.js";
  h2.style.fontStyle = "italic";

  root.appendChild(h2);
});
