import { useRef } from "react";
import type { FlightDate } from "../../entities/flight/model";

interface FlightFormProps {
  openModal: () => void;
  flightDateSetter: (date: FlightDate) => void;
}

export default function FlightForm({ openModal, flightDateSetter }: FlightFormProps) {
  const departureDateRef = useRef<HTMLInputElement | null>(null);
  const arrivalDateRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!departureDateRef.current?.value || !arrivalDateRef.current?.value) {
      window.alert("날짜를 입력해주세요");
      return;
    }
    const departureDate = new Date(departureDateRef.current?.value);
    const arrivalDate = new Date(arrivalDateRef.current?.value);

    if (departureDate > arrivalDate) {
      window.alert("오는 날짜는 가는 날짜보다 빠를 수 없습니다");
      return;
    }

    flightDateSetter({
      departure: departureDate,
      arrival: arrivalDate,
    });
    openModal();
  };

  return (
    <div className="w-full">
      <form className="flex flex-col items-center gap-10">
        <h2 className="text-2xl font-semibold">✈️ 여행을 떠나요 ✈️</h2>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="departure">
            가는 날짜
          </label>
          <input ref={departureDateRef} className="text-xl" type="date" name="departure" id="departure" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="arrival">
            오는 날짜
          </label>
          <input ref={arrivalDateRef} className="text-xl" type="date" name="arrival" id="arrival" />
        </div>
        <div className="flex w-full items-center justify-center gap-8 font-semibold">
          <button
            onClick={handleClick}
            type="button"
            className="w-[6rem] cursor-pointer rounded-md bg-green-300 py-2 shadow-md hover:bg-green-200"
          >
            티켓 생성
          </button>
          <button
            type="reset"
            className="w-[6rem] cursor-pointer rounded-md bg-red-300 py-2 shadow-md hover:bg-red-200"
          >
            초기화
          </button>
        </div>
      </form>
    </div>
  );
}
