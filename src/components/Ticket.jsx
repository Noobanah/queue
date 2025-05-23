import { useTicket } from "../context/TicketContext";

export default function Ticket({ ticketitem, className }) {
  const { dispatch } = useTicket();

  return (
    <li className={className}>
      <h2>{ticketitem.date}</h2>
      <h3>{ticketitem.time}</h3>
      <h4>{ticketitem.location}</h4>
      <div className="ticket-actions">
        <button
          onClick={() => {
            dispatch({
              type: "ADD_TICKET",
              payload: {
                id: ticketitem.id,
                name: ticketitem.name,
                date: ticketitem.date,
                time: ticketitem.time,
                location: ticketitem.location,
              },
            });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            dispatch({ type: "REMOVE_TICKET", payload: { id: ticketitem.id } });
          }}
        >
          -
        </button>
      </div>
    </li>
  );
}
