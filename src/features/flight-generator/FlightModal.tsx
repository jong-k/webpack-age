import BoardingPass from "./BoardingPass";
import type { FlightDate } from "../../entities/flight/model";
import { Modal } from "../../shared/ui";

interface FlightModalProps {
  isOpen: boolean;
  closeModal: () => void;
  fligtDate: FlightDate;
}

export default function FlightModal({ isOpen, closeModal, fligtDate }: FlightModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <BoardingPass fligtDate={fligtDate} />
    </Modal>
  );
}
