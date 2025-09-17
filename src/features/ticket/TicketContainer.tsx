import { useState } from "react";
import TicketForm from "./TicketForm";
import TicketModal from "./TicketModal";

export interface TicketDate {
  departure: Date | null;
  arrival: Date | null;
}

export default function TicketContainer() {
  const [ticketDate, setTicketDate] = useState<TicketDate>({
    departure: null,
    arrival: null,
  });
  const getTicketDate = (date: TicketDate) => setTicketDate(date);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50">
        <div className="m-4 w-full max-w-xl min-w-xs rounded-lg bg-white/50 p-8 shadow-lg md:m-8">
          <TicketForm openModal={openModal} getTicketDate={getTicketDate} />
        </div>
      </div>
      <TicketModal isOpen={isModalOpen} closeModal={closeModal} ticketDate={ticketDate} />
    </>
  );
}
