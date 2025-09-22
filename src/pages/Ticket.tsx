import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import TicketContainer from "../features/ticket/TicketContainer";
import { TURNSTILE_SITEKEY } from "../shared/config";
import { sleep } from "../shared/lib";

const siteKey = process.env.NODE_ENV === "development" ? TURNSTILE_SITEKEY.dev : TURNSTILE_SITEKEY.prod;

export default function Ticket() {
  const [turnstilePassed, setTurnstilePassed] = useState(false);

  const handleSuccess = async () => {
    await sleep(1000);
    setTurnstilePassed(true);
  };

  return (
    <div>
      {!turnstilePassed && <Turnstile siteKey={siteKey} onSuccess={handleSuccess} />}
      {turnstilePassed && <TicketContainer />}
    </div>
  );
}
