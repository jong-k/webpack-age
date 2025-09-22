import fieldImg from "./assets/images/field.jpg";

// import TicketContainer from "./features/ticket/TicketContainer";

export default function Ticket() {
  return (
    <div className="w-full overflow-x-hidden">
      <div
        className="min-h-dvh w-full min-w-xs"
        style={{
          backgroundImage: `url(${fieldImg})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="cf-turnstile" data-sitekey="0x4AAAAAAB2igh-1uc7G0a6x"></div>
        {/* <TicketContainer /> */}
      </div>
    </div>
  );
}
