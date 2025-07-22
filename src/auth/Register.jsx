import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Particles from "../particles/Particles";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const tryRegister = async (credentials) => {
    try {
      await register(credentials);
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    tryRegister(formData);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
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
          onSubmit={handleSubmit}
          style={{
            maxWidth: "350px",
            width: "100%",
            padding: "2rem",
            borderRadius: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            fontSize: "0.9rem",
          }}
        >
          <h5 className="mb-3 text-center" style={{ color: "white" }}>
            Register For An Account
          </h5>
          <label htmlFor="username" style={{ color: "white", fontSize: "0.9rem" }}>
            Username
          </label>
          <input
            type="text"
            name="username"
            className="form-control form-control-sm mb-4"
            placeholder="Username"
            required
            style={{ backgroundColor: "#222", color: "white", borderColor: "#555" }}
          />
          <label htmlFor="password" style={{ color: "white", fontSize: "0.9rem" }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control form-control-sm mb-4"
            placeholder="Password"
            required
            style={{ backgroundColor: "#222", color: "white", borderColor: "#555" }}
          />
          {error && (
            <div className="text-danger text-center small mb-4">{error}</div>
          )}
          <button type="submit" className="btn btn-dark w-100 mb-4">
            Register
          </button>
          <div className="text-center">
            <Link to="/login" style={{ color: "#ccc", fontSize: "0.85rem" }}>
              Already have an account? Log in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
