import type { FlightRuntimeData } from "../../../entities/flight/model";

export const FLIGHT_PLACEHOLDER: FlightRuntimeData = {
  airlineName: "ACME AIR",
  flightNumber: "AC1234",
  departureAirportName: "Seoul (ICN)",
  arrivalAirportName: "Tokyo (NRT)",
  passId: "ZX9Q2K",
  seatNumber: "12A",
  departureTime: "09:30",
  arrivalTime: "12:10",
  passenger: "John Doe",
};

export async function loadFlightData(): Promise<FlightRuntimeData> {
  if (process.env.NODE_ENV !== "production") {
    const { faker } = await import("@faker-js/faker");
    const airline = faker.airline.airline();
    const airlineName = airline.name;
    const flightNumber = `${airline.iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`;
    const departureAirport = faker.airline.airport();
    const arrivalAirport = faker.airline.airport();
    const passId = faker.airline.recordLocator({ allowNumerics: true, allowVisuallySimilarCharacters: true });
    const seatNumber = faker.airline.seat();
    const departureTime = `${faker.date.anytime().toTimeString().slice(0, 5)}`;
    const arrivalTime = `${faker.date.anytime().toTimeString().slice(0, 5)}`;
    const passenger = faker.person.fullName();

    return {
      airlineName,
      flightNumber,
      departureAirportName: departureAirport.name,
      arrivalAirportName: arrivalAirport.name,
      passId,
      seatNumber,
      departureTime,
      arrivalTime,
      passenger,
    };
  }

  return FLIGHT_PLACEHOLDER;
}
