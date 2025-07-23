import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Particles from "../particles/Particles";

import BlurText from "../blurtext/BlurText";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData);

    try {
      await login(credentials);
      navigate("/faculty");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#000",
      }}
    >
      <Particles
        particleColors={["#ffffff", "#cccccc"]}
        particleCount={400}
        particleSpread={4}
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
          className="w-100 rounded "
          style={{
            maxWidth: "350px",
            padding: "2rem",
            boxShadow: "0 0 15px rgba(255,255,255,0.1)",
            fontSize: "1rem",
            margin: "0 auto",
          }}
          onSubmit={handleSubmit}
        >
          <div
            className="mb-4"
            style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: "2rem", width: "%100", marginBottom: "1.5rem" }}
          >

            <BlurText
              text="              Login"
              delay={20}
              animateBy="words"
              direction="top"
            
            />
          </div>

          <label htmlFor="email" style={{ color: "white" }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control form-control-sm mb-4"
            placeholder="Email"
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
              backgroundColor: "#1e1e1e",
              color: "white",
              borderColor: "#444",
              fontSize: "0.9rem",
            }}
          />

          {error && (
            <div className="text-danger text-center small mb-3">{error}</div>
          )}

          <button type="submit" className="btn btn-dark w-100 mb-3">
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
