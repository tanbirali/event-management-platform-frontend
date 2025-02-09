import { createContext, useReducer, useEffect, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const socket = io("http://localhost:5000"); // Adjust backend URL if needed

// Create Context
export const EventContext = createContext();

// Reducer function for managing event state
const eventReducer = (state, action) => {
  switch (action.type) {
    case "SET_EVENTS":
      return { ...state, events: action.payload };
    case "ADD_EVENT":
      return { ...state, events: [action.payload, ...state.events] };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  events: [],
};

// Event Provider Component
export const EventProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(eventReducer, initialState);

  // Fetch events when component mounts
  useEffect(() => {
    if (user) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/event/", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          dispatch({ type: "SET_EVENTS", payload: response.data });
        })
        .catch((error) => console.error("Error fetching events:", error));
    }
  }, [user]);

  // Listen for real-time event updates
  useEffect(() => {
    socket.on("eventCreated", (event) => {
      dispatch({ type: "ADD_EVENT", payload: event });
    });

    socket.on("eventUpdated", (event) => {
      dispatch({ type: "UPDATE_EVENT", payload: event });
    });

    socket.on("eventDeleted", (eventId) => {
      dispatch({ type: "DELETE_EVENT", payload: eventId });
    });

    return () => {
      socket.off("eventCreated");
      socket.off("eventUpdated");
      socket.off("eventDeleted");
    };
  }, []);

  return (
    <EventContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};
