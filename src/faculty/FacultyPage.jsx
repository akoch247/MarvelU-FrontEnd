import React from "react";
import AllFaculty from "./AllFaculty";
import Particles from "../particles/Particles";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FacultyPage() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={4}
        speed={0.2}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        style={{ 
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "200vh",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, paddingBottom: "2rem" }}>
        <h1 className="fw-bold text-center my-4 text-white">Faculty</h1>
        <AllFaculty />
      </div>
    </div>
  );
}
