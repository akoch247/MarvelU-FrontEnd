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
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 className="fw-bold text-center my-4">Departments</h1>
        <AllDepartments />
      </div>
    </div>
  );
}
