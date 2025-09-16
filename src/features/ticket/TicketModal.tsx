import TicketForm from "./TicketForm";

export default function TicketModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-4 w-full max-w-xl min-w-xs rounded-lg bg-white/50 p-8 shadow-lg md:m-8">
        <TicketForm />
      </div>
    </div>
  );
}
