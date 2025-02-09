import { createContext, useReducer, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Reducer function for managing auth state
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Store user data in localStorage
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  // Login function
  const login = (userData) => {
    dispatch({ type: "LOGIN", payload: userData });
  };

  // Logout function
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
