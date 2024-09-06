import React, { useState } from "react";

import "../../../assets/css/admin/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API}/getadmindata`);
      const userDataList = res.data;

      const userData = userDataList.find(
        (user) => user.admin === email && user.password === password
      );

      if (userData && password === userData.password) {
        localStorage.setItem("id", userData.admin);
        navigate("/dashboard");
      } else {
        window.alert("Please enter valid email and password");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      window.alert("Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}

export default Login;
