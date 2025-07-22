import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const tryLogin = async (credentials) => {
    try {
      await login(credentials);
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData);
    tryLogin(credentials);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        className="w-100 p-5 rounded bg-white border"
        style={{ maxWidth: "350px", fontSize: "0.9rem" }}
        onSubmit={handleSubmit}
      >
        <h5 className="mb-3 text-center">Login</h5>
        <input
          type="text"
          name="username"
          className="form-control form-control-sm mb-5"
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          className="form-control form-control-sm mb-5"
          placeholder="Password"
          required
        />
        {error && (
          <div className="text-danger text-center small mb-5">{error}</div>
        )}
        <button type="submit" className="btn btn-dark w-100 mb-5">
          Sign In
        </button>
        <div className="text-center">
          <Link to="/register" className="text-muted small">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}
