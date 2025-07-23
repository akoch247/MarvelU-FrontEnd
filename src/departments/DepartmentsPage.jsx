import React from "react";
import { AllDepartments } from "./AllDepartments";
import Particles from "../particles/Particles";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DepartmentsPage() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={400}
        particleSpread={2}
        speed={0.4}
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

      <div style={{ position: "relative", zIndex: 1, paddingBottom: "2rem"}}>
        <h1 className="fw-bold text-center my-4">Departments</h1>
        <AllDepartments />
      </div>
    </div>
  );
}
