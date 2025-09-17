import BoardingPass from "./BoardingPass";
import type { TicketDate } from "../../entities/ticket/model";
import { Modal } from "../../shared/ui";

interface TicketModalProps {
  isOpen: boolean;
  closeModal: () => void;
  ticketDate: TicketDate;
}

export default function TicketModal({ isOpen, closeModal, ticketDate }: TicketModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <BoardingPass ticketDate={ticketDate} />
    </Modal>
  );
}
