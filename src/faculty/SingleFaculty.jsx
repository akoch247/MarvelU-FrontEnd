import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Particles from "../particles/Particles";
import { professors as dummyProfessors } from "../data/DummyData";

export default function SingleFaculty() {
  const { id } = useParams();
  const [professors] = useState(dummyProfessors);
  const prof = professors.find((p) => p.id === parseInt(id));

  if (!prof) return <p className="text-center mt-4 text-white">Professor not found</p>;

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Particle Background */}
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

      {/* Foreground Content */}
      <div style={{ position: "relative", zIndex: 1, color: "white" }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <img
              src={prof.profile_img}
              alt="Profile"
              className="rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h2>{prof.name}</h2>
            <p>Department: {prof.department}</p>
            <p>Date of Hire: {prof.dateOfHire}</p>
            <p>
              Email: <a href={`mailto:${prof.email}`} className="text-white">{prof.email}</a>
            </p>
            <button className="btn btn-danger mt-3">Delete Professor</button>
          </div>

          <div
            className="border p-4 shadow rounded bg-light mx-auto"
            style={{ maxWidth: "400px", color: "black" }}
          >
            <h5 className="mb-4 text-center">Edit Professor Information</h5>
            <form>
              {[
                { id: "name", label: "Full Name", type: "text", value: prof.name },
                { id: "email", label: "Email Address", type: "email", value: prof.email },
                { id: "department", label: "Department", type: "text", value: prof.department },
                { id: "dateOfHire", label: "Date of Hire", type: "date", value: prof.dateOfHire },
                { id: "profile_img", label: "Profile Image URL", type: "text", value: prof.profile_img },
              ].map(({ id, label, type, value }) => (
                <div className="mb-3" key={id}>
                  <label htmlFor={id} className="form-label small">{label}</label>
                  <input
                    type={type}
                    className="form-control form-control-sm"
                    id={id}
                    defaultValue={value}
                    placeholder={type === "date" ? "" : label}
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-primary btn-sm w-100">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
