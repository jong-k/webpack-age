import fieldImg from "./assets/images/field.jpg";

export default function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${fieldImg})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "100dvh",
      }}
    ></div>
  );
}
