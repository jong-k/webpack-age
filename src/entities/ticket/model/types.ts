export interface TicketDate {
  departure: Date | null;
  arrival: Date | null;
}

export interface TicketRuntimeData {
  airlineName: string;
  flightNumber: string;
  departureAirportName: string;
  arrivalAirportName: string;
  passId: string;
  seatNumber: string;
  departureTime: string;
  arrivalTime: string;
  passenger: string;
}
