import React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
        <form
            className="w-100 p-5 rounded bg-white border"
            style={{ maxWidth: "350px", fontSize: "0.9rem" }}
            action={{tryRegister}}
        >
            <h5 className="mb-3 text-center">Register For An Account</h5>
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
                <div className="text-danger text-center small mb-5">
                    {error}
                </div>
            )}
            <button type="submit" className="btn btn-dark w-100 mb-5">
                Register
            </button>
            <div className="text-center">
                <Link to="/login" className="text-muted small">
                    Already have an account? Log in here
                </Link>
            </div>
        </form>
    </div>
  );
}    
