import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  departments as dummyDepartments,
  professors as dummyProfessors,
} from "../data/DummyData";
import { div, p } from "framer-motion/client";

export default function SingleDepartment() {
  const { id } = useParams();
  const deptIdNum = parseInt(id);

  const [departments, setDepartments] = useState(dummyDepartments);
  const [professors, setProfessors] = useState(dummyProfessors);

  const department = departments.find((dept) => dept.id === deptIdNum);

  const [editForm, setEditForm] = useState({
    name: department?.name || "",
    banner_img: department?.banner_img || "",
  });

  const profsInDepartment = professors.filter(
    (prof) => prof.department_id === deptIdNum
  );
  const availableProfs = professors.filter(
    (prof) => prof.department_id !== deptIdNum
  );

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setDepartments(
      departments.map((dept) =>
        dept.id === deptIdNum ? { ...dept, ...editForm } : dept
      )
    );
  };

  const addProfessor = (profId) => {
    setProfessors(
      professors.map((prof) =>
        prof.id === profId ? { ...prof, department_id: deptIdNum } : prof
      )
    );
  };

  const removeProfessor = (profId) => {
    setProfessors(
      professors.map((prof) =>
        prof.id === profId ? { ...prof, department_id: null } : prof
      )
    );
  };

  if (!department) {
    return <div>Department does not exist.</div>;
  }

  return (
    <div className="py-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="text-center">
        <h2>{department.name}</h2>
        <img
          src={department.banner_img}
          alt="Department Banner"
          className="img-fluid mb-3"
          style={{ width: "500px", height: "150px", objectFit: "cover" }}
        />
      </div>

      <div>
        <h4 className="mt-4">Faculty of {department.name}</h4>
        {profsInDepartment.length > 0 ? (
          profsInDepartment.map((prof) => (
            <div key={prof.id} className="d-flex align-items-center mb-3">
              <img
                src={prof.profile_img}
                alt={`${prof.name}'s profile`}
                className="rounded-circle me-3"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <div>
                <h5>{prof.name}</h5>
                <p>
                  <strong>Email:</strong> {prof.email}
                </p>
                <p>
                  <strong>DOH:</strong> {prof.dateOfHire}
                </p>
              </div>
              <button onClick={() => removeProfessor(prof.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No professors assigned to this department.</p>
        )}

        <div className="mt-5">
          <h4>Edit Department</h4>
          <form onSubmit={handleEditSubmit} className="row g-3">
            {[
              { label: "Name", name: "name" },
              { label: "Banner Image URL", name: "banner_img" },
            ].map((field) => (
              <div key={field.name} className="col-md-4">
                <label className="form-label">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={editForm[field.name]}
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
            ))}
            <div className="col-12">
              <button type="submit" className="btn btn-danger">
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <h4 className="mt-5">
          Add Professors to the {department.name} Department
        </h4>
        {availableProfs.length > 0 ? (
          availableProfs.map((prof) => (
            <div key={prof.id} className="d-flex align-items-center mb-2">
              <img
                src={prof.profile_img}
                alt={`${prof.name}'s profile`}
                className="rounded-circle me-3"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <div>
                <h5>{prof.name}</h5>
                <p>{prof.email}</p>
              </div>
              <button
                className="btn btn-sm btn-outline-success ms-auto"
                onClick={() => addProfessor(prof.id)}
              >
                Add
              </button>
            </div>
          ))
        ) : (
          <p>No available professors to add.</p>
        )}
      </div>
    </div>
  );
}
