import React from "react";
import { AllDepartments } from "./AllDepartments";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DepartmentsPage() {
  return (
    <div>
      <h1 className="fw-bold text-center my-4">Departments</h1>
      <AllDepartments />
    </div>
  );
}
