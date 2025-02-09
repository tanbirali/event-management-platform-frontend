import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/createEvent.css";
import axios from "axios";
const CreateEvents = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      alert("You need to login to create an event");
      setTimeout(() => {
        navigate("/login");
      }, 300);
    }
  }, [user, navigate]);

  const handleFileChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !venue || !date || !media) {
      return setMessage("All fields are required!");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("venue", venue);
    formData.append("date", date);
    formData.append("media", media);

    setLoading(true);
    try {
      const token = localStorage.getItem("user"); // Assuming user token is stored in localStorage

      // console.log(JSON.parse(token).token);
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/event/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${JSON.parse(token).token}`, // Send JWT token for authentication
          },
        }
      );

      setMessage("Event created successfully!");
      console.log("Event created:", response.data);
    } catch (error) {
      console.error("Error creating event:", error);
      setMessage("Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a event</h1>
      {message.length > 0 && <p>{message}</p>}
      <form className="form-container" encType="mutlipart/formData">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label htmlFor="location">Venue</label>
        <input
          type="text"
          id="location"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />
        <label htmlFor="category">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value={""}>Select</option>
          <option value="music">Music</option>
          <option value="science">Science</option>
          <option value="business">Business</option>
          <option value="festival">Festival</option>
          <option value="sports">Sports</option>
          <option value="food">Food & Drinks</option>
        </select>
        <label htmlFor="image">Media</label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <button
          className="create-event-btn"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvents;
