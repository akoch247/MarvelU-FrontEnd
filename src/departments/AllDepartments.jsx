import React, { useState } from "react";
import {
  departments as dummyDepartments,
  professors as dummyProfessors,
} from "../data/DummyData";
import { div, p } from "framer-motion/client";
import { Link } from "react-router-dom";

export function AllDepartments() {
  const [departments, setDepartments] = useState(dummyDepartments);
  const [professors, setProfessors] = useState(dummyProfessors);
  const [newDept, setNewDept] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewDept({ ...newDept, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      ...newDept,
      id: departments.length ? departments[departments.length - 1].id + 1 : 1,
    };
    setDepartments([...departments, newEntry]);
    setNewDept({ name: "", description: "" });
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
    setProfessors(
      professors.map((prof) =>
        prof.department_id === id ? { ...prof, department_id: null } : prof
      )
    );
  };

  return (
    <div className="py-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="row justify-content-center">
        {departments.map((dept) => {
          const deptProfessors = professors.filter(
            (prof) => prof.department_id === dept.id
          );

          return (
            <div
              key={dept.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <h3>
                <Link
                  to={`/departments/${dept.id}`}
                  className="text-decoration-none text-white"
                >
                  {dept.name}
                </Link>
              </h3>

              {deptProfessors.length > 0 ? (
                <div className="d-flex flex-wrap gap-3">
                  {deptProfessors.map((prof) => (
                    <div
                      key={prof.id}
                      className="d-flex flex-column align-items"
                      style={{ width: "150px" }}
                    >
                      <img
                        src={prof.profile_img}
                        alt={prof.name}
                        className="rounded-circle m-2"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <p>
                        <strong>{prof.name}</strong>
                      </p>
                      <p>{prof.email}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No professors yet in this department</p>
              )}

              <button
                onClick={() => handleDelete(dept.id)}
                className="btn btn-danger btn-sm mt-2"
              >
                Delete Department
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <h2 className="mb-3">Add a New Department</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          {[
            { label: "Department Name", name: "name" },
            { label: "Banner Image URL", name: "banner_img" },
          ].map((field) => (
            <div key={field.name} className="col-md-6">
              <label className="form-label">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={newDept[field.name]}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          ))}
          <div className="col-12">
            <button type="submit" className="btn btn-primary mt-2">
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}