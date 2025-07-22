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

  return (
    <div>
      <div>
        {departments.map((dept) => {
          const deptProfessors = professors.filter(
            (prof) => prof.department_id === dept.id
          );

          return (
            <div key={dept.id}>
              <h3>
                <Link to={`/departments/${dept.id}`}>{dept.name}</Link>
              </h3>

              {deptProfessors.length > 0 ? (
                <div>
                  {deptProfessors.map((prof) => (
                    <div key={prof.id}>
                      <img src={prof.profile_img} alt={prof.name} />
                      <p>{prof.name}</p>
                      <p>{prof.email}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No professors yet in this department.</p>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <h2>Add a New Department</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Department Name", name: "name" },
            { label: "Desccription", name: "description" },
          ].map((field) => (
            <div key={field.name}>
              <label>{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={newDept[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div>
            <button type="submit">Add Department</button>
          </div>
        </form>
      </div>
    </div>
  );
}
