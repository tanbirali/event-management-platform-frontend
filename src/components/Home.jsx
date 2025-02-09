import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../styles/home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div>
      <div className="home-container">
        <div className="header-text">
          <h1 className="header-title">Connecting the World</h1>
          <p className="header-subtitle">Explore the events, around you </p>
        </div>
      </div>
      <h1>Upcoming Events</h1>

      <div></div>
      <h1>Want to create your event?</h1>
      <button>Create Event</button>

      <h1>Past Events</h1>
      <div></div>
    </div>
  );
};

export default Home;
