import React, { useContext, useEffect, useState } from "react";
import "../styles/login.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please fill all the fields");
    }
    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/api/auth/login",
      {
        email,
        password,
      }
    );
    localStorage.setItem("user", res.data.token);
    const userData = res.data;
    login(userData);
  };
  return (
    <div className="login-container">
      <div className="input-container">
        <h1>Login</h1>
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          id="Email"
          name={"email"}
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="Password">Password</label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            id="Password"
            name="password"
            className="password-input"
            onChange={handleInputChange}
            value={password}
          />
          <button
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                style={{ margin: "auto" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ margin: "auto" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye-off"
              >
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                <path d="m2 2 20 20" />
              </svg>
            )}
          </button>
        </div>
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="register-redirection">
          <p>Don&apos;t have an account </p>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
