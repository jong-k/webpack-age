import TicketForm from "./TicketForm";

export default function TicketModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-2 w-full rounded-lg bg-white p-8 shadow-lg sm:m-4 md:m-8">
        <TicketForm />
      </div>
    </div>
  );
}
