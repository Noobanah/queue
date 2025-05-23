import { createContext, useContext, useReducer } from "react";

const TicketContext = createContext();

function ticketReducer(state, action) {
  switch (action.type) {
    case "ADD_TICKET":
      const existingadd = state.find((item) => item.id === action.payload.id);
      if (existingadd) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, tickets: item.tickets + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, tickets: 1 }];
      }

    case "REMOVE_TICKET":
      const existingremove = state.find(
        (item) => item.id === action.payload.id
      );
      if (!existingremove) return state;

      if (existingremove.tickets === 1) {
        return state.filter((item) => item.id !== action.payload.id);
      } else {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, tickets: item.tickets - 1 }
            : item
        );
      }

    default:
      return state;
  }
}

export function TicketProvider({ children }) {
  const [state, dispatch] = useReducer(ticketReducer, []);

  return (
    <TicketContext.Provider value={{ state, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTicket() {
  return useContext(TicketContext);
}
