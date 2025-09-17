import type { TicketDate } from "./TicketContainer";
import { Modal } from "../../shared/ui";

interface TicketModalProps {
  isOpen: boolean;
  closeModal: () => void;
  ticketDate: TicketDate;
}

export default function TicketModal({ isOpen, closeModal, ticketDate }: TicketModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div>가는 날짜와 오는 날짜</div>
      <pre>{JSON.stringify(ticketDate)}</pre>
    </Modal>
  );
}
