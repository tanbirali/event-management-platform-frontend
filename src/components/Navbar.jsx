import React, { useContext, useState } from "react";
import "../styles/navbar.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <a href="/" className="logo">
        EVENTS
      </a>

      {/* Mobile Menu Button */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Navbar Links */}
      <div className={`nav-links-container ${menuOpen ? "open" : ""}`}>
        {user ? (
          <>
            <button className="nav-link-btn" onClick={() => navigate("/")}>
              Home
            </button>
            <button
              className="nav-link-btn"
              onClick={() => navigate("/events")}
            >
              Events
            </button>
            <button
              className="nav-link-btn"
              onClick={() => navigate("/event/create")}
            >
              Create
            </button>
          </>
        ) : null}

        {user ? (
          <button className="nav-link-btn">Logout</button>
        ) : (
          <button
            className="nav-link-btn"
            onClick={() =>
              navigate(
                location.pathname === "/register" ? "/login" : "/register"
              )
            }
          >
            {location.pathname === "/register" ? "Login" : "Register"}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
