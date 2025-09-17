import fieldImg from "./assets/images/field.jpg";
import TicketContainer from "./features/ticket/TicketContainer";

export default function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <div
        className="min-h-dvh w-full min-w-xs"
        style={{
          backgroundImage: `url(${fieldImg})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <TicketContainer />
      </div>
    </div>
  );
}
