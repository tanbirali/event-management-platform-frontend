import React from "react";
import "../styles/register.css";
const Register = () => {
  return (
    <div className="register-container">
      <div className="input-container">
        <h1>Register</h1>
        <label htmlFor="Name">Name</label>
        <input type="name" id="name" />
        <label htmlFor="Email">Email</label>
        <input type="email" id="Email" />
        <label htmlFor="Password">Password</label>
        <input type="password" id="Password" />
        <button className="register-btn">Login</button>

        <div className="login-redirection">
          <p>Already have an account </p>
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
