import { useEffect, useState } from "react";
import { loadFlightData } from "./lib/flightData";
import { FLIGHT_PLACEHOLDER } from "./lib/flightData";
import barcodeImg from "../../assets/images/barcode.png";
import type { FlightDate, FlightRuntimeData } from "../../entities/flight/model";

interface BoardingPassProps {
  fligtDate: FlightDate;
}

const PROD_PLACEHOLDER = process.env.NODE_ENV === "production" ? FLIGHT_PLACEHOLDER : null;

export default function BoardingPass({ fligtDate }: BoardingPassProps) {
  const [ticketData, setTicketData] = useState<FlightRuntimeData | null>(PROD_PLACEHOLDER);
  const departureDate = fligtDate.departure?.toDateString();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    let active = true;
    loadFlightData().then(d => {
      if (active) setTicketData(d);
    });

    return () => {
      active = false;
    };
  }, []);

  if (!ticketData) return null;

  return (
    <div className="w-full shadow-lg">
      <div className="grid w-full grid-cols-3 rounded-t-xl bg-blue-900 text-xl font-semibold text-white">
        <div className="col-span-2 py-2 pl-4">{ticketData.airlineName}</div>
        <div className="col-span-1 border-l-2 border-dashed py-2 text-center">BOARDING PASS</div>
      </div>
      <div className="grid w-full grid-cols-3 rounded-b-lg">
        <div className="col-span-2 grid grid-cols-3 gap-4 p-4">
          <div className="col-span-2 flex flex-col gap-4">
            <div>
              <div className="text-sm italic">From</div>
              <div className="font-semibold">{ticketData.departureAirportName}</div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex">
                <div className="flex-1">
                  <div className="text-center text-sm italic">Flight</div>
                  <div className="font-semibold">{ticketData.flightNumber}</div>
                </div>
                <div className="flex-1">
                  <div className="text-center text-sm italic">Date</div>
                  <div className="font-semibold">{departureDate}</div>
                </div>
                <div className="flex-1">
                  <div className="text-center text-sm italic">Departure Time</div>
                  <div className="font-semibold">{ticketData.departureTime}</div>
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <div className="text-center text-sm italic">Gate</div>
                  <div className="font-semibold">{Math.ceil(Math.random() * 10)}</div>
                </div>
                <div className="flex-1">
                  <div className="text-center text-sm italic">Boarding Till</div>
                  <div className="font-semibold">{ticketData.departureTime}</div>
                </div>
                <div className="flex-1">
                  <div className="text-center text-sm italic">Seat</div>
                  <div className="font-semibold">{ticketData.seatNumber}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <div>
              <div className="text-sm italic">To</div>
              <div className="font-semibold">{ticketData.arrivalAirportName}</div>
            </div>
            <div>
              <div className="text-sm italic">Arrival Time</div>
              <div className="font-semibold">{ticketData.arrivalTime}</div>
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
            <div className="font-semibold">{ticketData.passenger}</div>
          </div>
          <div>
            <img className="w-full" src={barcodeImg} alt="barcode" />
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-3 rounded-b-lg bg-blue-900 font-mono text-sm text-white">
        <div className="col-span-2 grid grid-cols-5 py-2 pl-4">
          <div className="col-span-1">{ticketData.passId}</div>
          <div className="col-span-4 text-center">PLEASE BE AT THE BOARDING TIME</div>
        </div>
        <div className="col-span-1 border-l-2 border-dashed py-2 text-center">{ticketData.passId}</div>
      </div>
    </div>
  );
}
