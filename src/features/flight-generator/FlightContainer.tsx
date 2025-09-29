import { useState } from "react";
import FlightForm from "./FlightForm";
import FlightModal from "./FlightModal";
import type { FlightDate } from "../../entities/flight/model";

export default function FlightContainer() {
  const [flightDate, setFlightDate] = useState<FlightDate>({
    departure: null,
    arrival: null,
  });
  const flightDateSetter = (date: FlightDate) => setFlightDate(date);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className="flex w-full items-center justify-center"
      // TODO: 하드코딩된 92px 처리하기
      style={{
        minHeight: "calc(100dvh - 92px)",
      }}
    >
      <div className="m-4 w-full max-w-xl min-w-xs rounded-lg bg-white/50 p-8 shadow-lg md:m-8">
        <FlightForm openModal={openModal} flightDateSetter={flightDateSetter} />
      </div>
      <FlightModal isOpen={isModalOpen} closeModal={closeModal} fligtDate={flightDate} />
    </div>
  );
}
