import { useTicket } from "../context/TicketContext";
import "../App.css";

export default function Summary() {
  const { state } = useTicket();

  return (
    <ul lassName="ticket-list">
      {state.map((item) => (
        <li key={item.id} className="ticket-item">
          <strong className="ticket-name">{item.name}</strong>
          <div className="ticket-details">
            {item.date} @ {item.location}
          </div>
          <div className="ticket-count">Tickets: {item.tickets}</div>
        </li>
      ))}
    </ul>
  );
}
