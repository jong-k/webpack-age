import fieldImg from "./assets/images/field.jpg";
import TicketModal from "./features/ticket/TicketModal";

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
        <TicketModal />
      </div>
    </div>
  );
}
