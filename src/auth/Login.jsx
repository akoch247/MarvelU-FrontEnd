import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Particles from "../particles/Particles";

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
    tryLogin(formData);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#000" }}>
      <Particles
        particleColors={["#ffffff", "#cccccc"]}
        particleCount={150}
        particleSpread={15}
        speed={0.2}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          className="w-100 rounded border"
          style={{
            maxWidth: "350px",
            padding: "2rem",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "white",
            boxShadow: "0 0 15px rgba(255,255,255,0.1)",
            fontSize: "0.9rem",
          }}
          onSubmit={handleSubmit}
        >
          <h5 className="mb-3 text-center text-white">Login</h5>

          <label htmlFor="username" style={{ color: "white" }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            className="form-control form-control-sm mb-4"
            placeholder="Username"
            required
            style={{
              backgroundColor: "#1a1a1a",
              color: "white",
              borderColor: "#444",
              fontSize: "0.9rem",
            }}
          />

          <label htmlFor="password" style={{ color: "white" }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control form-control-sm mb-4"
            placeholder="Password"
            required
            style={{
              backgroundColor: "#1a1a1a",
              color: "white",
              borderColor: "#444",
              fontSize: "0.9rem",
            }}
          />

          {error && (
            <div className="text-danger text-center small mb-3">{error}</div>
          )}

          <button type="submit" className="btn btn-light w-100 mb-3">
            Sign In
          </button>

          <div className="text-center">
            <Link to="/register" style={{ color: "#aaa", fontSize: "0.85rem" }}>
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
