import { faker } from "@faker-js/faker";
import type { TicketDate } from "./TicketContainer";
import barcodeImg from "../../assets/images/barcode.png";

interface BoardingPassProps {
  ticketDate: TicketDate;
}

const AIRLINE = faker.airline.airline();
const AIRLINE_NAME = AIRLINE.name;
const FLIGHT_NUMBER = `${AIRLINE.iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`;
const DEPARTURE_AIRPORT = faker.airline.airport();
const ARRIVAL_AIRPORT = faker.airline.airport();
const PASS_ID = faker.airline.recordLocator({ allowNumerics: true, allowVisuallySimilarCharacters: true });
const SEAT_NUMBER = faker.airline.seat();

const DEPARTURE_TIME = `${faker.date.anytime().toTimeString().slice(0, 5)}`;
const ARRIVAL_TIME = `${faker.date.anytime().toTimeString().slice(0, 5)}`;

const PASSENGER = faker.person.fullName();

export default function BoardingPass({ ticketDate }: BoardingPassProps) {
  const arrivalDate = ticketDate.arrival?.toDateString();
  return (
    <div className="w-full shadow-lg">
      <div className="grid w-full grid-cols-3 rounded-t-xl bg-blue-900 text-xl font-semibold text-white">
        <div className="col-span-2 py-2 pl-4">{AIRLINE_NAME}</div>
        <div className="col-span-1 border-l-2 border-dashed py-2 text-center">BOARDING PASS</div>
      </div>
      <div className="grid w-full grid-cols-3 rounded-b-lg">
        <div className="col-span-2 grid grid-cols-3 gap-4 p-4">
          <div className="col-span-2 flex flex-col gap-4">
            <div>
              <div className="text-sm italic">From</div>
              <div className="font-semibold">{DEPARTURE_AIRPORT.name}</div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex">
                <div className="flex-1">
                  <div className="text-center text-sm italic">Flight</div>
                  <div className="font-semibold">{FLIGHT_NUMBER}</div>
                </div>
                <div className="flex-1">
                  <div className="text-center text-sm italic">Date</div>
                  <div className="font-semibold">{arrivalDate}</div>
                </div>
                <div className="flex-1">
                  <div className="text-center text-sm italic">Departure Time</div>
                  <div className="font-semibold">{DEPARTURE_TIME}</div>
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <div className="text-center text-sm italic">Gate</div>
                  <div className="font-semibold">{Math.ceil(Math.random() * 10)}</div>
                </div>
                <div className="flex-1">
                  <div className="text-center text-sm italic">Boarding Till</div>
                  <div className="font-semibold">{DEPARTURE_TIME}</div>
                </div>
                <div className="flex-1">
                  <div className="text-center text-sm italic">Seat</div>
                  <div className="font-semibold">{SEAT_NUMBER}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <div>
              <div className="text-sm italic">To</div>
              <div className="font-semibold">{ARRIVAL_AIRPORT.name}</div>
            </div>
            <div>
              <div className="text-sm italic">Arrival Time</div>
              <div className="font-semibold">{ARRIVAL_TIME}</div>
            </div>
            <div>
              <div className="text-sm italic">Terminal</div>
              <div className="font-semibold">{Math.ceil(Math.random() * 10)}</div>
            </div>
          </div>
        </div>
        <div className="col-span-1 border-l-2 border-dashed p-4">
          <div className="pl-2">
            <div className="text-sm italic">Passenger</div>
            <div className="font-semibold">{PASSENGER}</div>
          </div>
          <div>
            <img className="w-full" src={barcodeImg} alt="barcode" />
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-3 rounded-b-lg bg-blue-900 font-mono text-sm text-white">
        <div className="col-span-2 grid grid-cols-5 py-2 pl-4">
          <div className="col-span-1">{PASS_ID}</div>
          <div className="col-span-4 text-center">PLEASE BE AT THE BOARDING TIME</div>
        </div>
        <div className="col-span-1 border-l-2 border-dashed py-2 text-center">{PASS_ID}</div>
      </div>
    </div>
  );
}
