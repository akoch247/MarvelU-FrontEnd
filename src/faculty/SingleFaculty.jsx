import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Particles from "../particles/Particles";
import { professors as dummyProfessors } from "../data/DummyData";

export default function SingleFaculty() {
  const { id } = useParams();
  const [professors] = useState(dummyProfessors);
  const prof = professors.find((p) => p.id === parseInt(id));

  if (!prof) return <p className="text-center mt-4">Professor not found</p>;

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Particles background */}
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        className="particles-background"
      />

      {/* Foreground content */}
      <div style={{ position: "relative", zIndex: 1, color: "white" }}>
        <div className="container mt-5">
          <div className="text-center">
            <img
              src={prof.profile_img}
              alt="Profile picture"
              className="rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h2>{prof.name}</h2>
            <p>Department: {prof.department}</p>
            <p>Date of Hire: {prof.dateOfHire}</p>
            <p>
              Email: <a href={`mailto:${prof.email}`}>{prof.email}</a>
            </p>
            <button className="btn btn-danger mt-3">Delete Professor</button>
          </div>

          <div
            className="border p-3 shadow rounded bg-light mx-auto"
            style={{ maxWidth: "350px", fontSize: "0.9rem", color: "black"}}
          >
            <h5 className="mb-3 text-center" style={{color:"black"}}>Edit Professor Information</h5>
            <form>
              <div className="mb-2">
                <label htmlFor="name" className="form-label small">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="name"
                  placeholder="Professor Name"
                  defaultValue={prof.name}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="form-label small">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="email"
                  placeholder="email@example.edu"
                  defaultValue={prof.email}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="department" className="form-label small">
                  Department
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="department"
                  placeholder="Engineering"
                  defaultValue={prof.department}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="dateOfHire" className="form-label small">
                  Date of Hire
                </label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  id="dateOfHire"
                  defaultValue={prof.dateOfHire}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="profile_img" className="form-label small">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="profile_img"
                  placeholder="https://example.com/image.jpg"
                  defaultValue={prof.profile_img}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm w-100">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
