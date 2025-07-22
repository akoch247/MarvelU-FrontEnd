import React from "react";
import { useParams } from "react-router-dom";
import { departments, professors } from "../data/DummyData";
import { div } from "framer-motion/client";

export default function SingleDepartment() {
  const { id } = useParams();
  const deptIdNum = parseInt(id);

  const department = departments.find((dept) => dept.id === deptIdNum);
  const profsInDepartment = professors.filter(
    (prof) => prof.department_id === deptIdNum
  );

  if (!department) {
    return <div>Department does not exist.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2>{department.name}</h2>
        {profsInDepartment.map((prof) => (
          <div key={prof.id}>
            <img
              src={prof.profile_img}
              alt={`${prof.name}'s picture`}
              className="rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h2>{prof.name}</h2>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${prof.email}`}>{prof.email}</a>
            </p>
            <p>
              <strong>Date of Hire:</strong> {prof.dateOfHire}
            </p>
            <p>
              <strong>Department:</strong> {department.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
