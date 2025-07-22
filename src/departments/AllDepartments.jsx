import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../api/ApiContext";

export function AllDepartments() {
  const [departments, setDepartments] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [error, setError] = useState(null);
  const { request } = useApi();

  const [newDept, setNewDept] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptsData = await request("/departments");
        const profsData = await request("/professors");
        setDepartments(deptsData);
        setProfessors(profsData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [request]);

  const handleChange = (e) => {
    setNewDept({ ...newDept, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdDept = await request("/departments", {
        method: "POST",
        body: JSON.stringify(newDept),
      });
      setDepartments([...departments, createdDept]);
      setNewDept({ name: "", description: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div>
        {departments.map((dept) => {
          const deptProfessors = professors.filter(
            (prof) => prof.department_id === dept.id
          );

          return (
            <div key={dept.id} className="mb-4 p-3 border rounded">
              <h3>
                <Link to={`/departments/${dept.id}`}>{dept.department}</Link>
              </h3>
              {deptProfessors.length > 0 ? (
                <div className="d-flex flex-wrap">
                  {deptProfessors.map((prof) => (
                    <div key={prof.id} className="text-center me-3">
                      <img
                        src={prof.profile_image_url}
                        alt={prof.name}
                        className="rounded-circle"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                      <p className="small mt-1">{prof.name}</p>
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

      <div className="mt-5">
        <h2>Add a New Department</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Department Name", name: "department" },
            { label: "Description", name: "description" },
          ].map((field) => (
            <div key={field.name} className="mb-3">
              <label className="form-label">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={newDept[field.name]}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          ))}
          <div>
            <button type="submit" className="btn btn-primary">
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
