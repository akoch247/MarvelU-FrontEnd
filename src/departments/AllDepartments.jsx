import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../api/ApiContext"; // ✅ Added API context
import { useAuth } from "../auth/AuthContext"; // ✅ Added Auth context

export function AllDepartments() {
  const [departments, setDepartments] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [error, setError] = useState(null);
  const { request } = useApi();
  const { token } = useAuth();
  const [refetch, setRefetch] = useState(false);

  // ✅ State now matches the database columns
  const [newDept, setNewDept] = useState({
    department: "",
    banner_image_url: "",
    description: "",
  });

  // ✅ Fetch real data from the backend
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
  }, [request, refetch]);

  const handleChange = (e) => {
    setNewDept({ ...newDept, [e.target.name]: e.target.value });
  };

  // ✅ Make the form submission talk to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request("/departments", {
        method: "POST",
        body: JSON.stringify(newDept),
      });
      setRefetch((prev) => !prev); // Refetch data to show the new department
      setNewDept({ department: "", banner_image_url: "", description: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Make the delete button talk to the API
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure? This will delete the department and reassign its professors."
      )
    ) {
      try {
        await request(`/departments/${id}`, { method: "DELETE" });
        setRefetch((prev) => !prev); // Refetch data to remove the department
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

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
              className="col-12 mb-4 p-3 border rounded text-white"
              style={{ backgroundColor: "#1e1e1e" }}
            >
              <h3>
                <Link
                  to={`/departments/${dept.id}`}
                  className="text-decoration-none text-white"
                >
                  {dept.department}
                </Link>
              </h3>

              {deptProfessors.length > 0 ? (
                <div className="d-flex flex-wrap gap-3">
                  {deptProfessors.map((prof) => (
                    <div
                      key={prof.id}
                      className="d-flex flex-column align-items-center"
                      style={{ width: "150px" }}
                    >
                      <img
                        src={prof.profile_image_url} // ✅ FIX: Use correct property name
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
                    </div>
                  ))}
                </div>
              ) : (
                <p>No professors yet in this department</p>
              )}

              {/* ✅ Only show Delete button if logged in */}
              {token && (
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="btn btn-danger btn-sm mt-2"
                >
                  Delete Department
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* ✅ Only show Add Department form if logged in */}
      {token && (
        <div className="mt-5 text-white">
          <h2 className="mb-3">Add a New Department</h2>
          <form onSubmit={handleSubmit} className="row g-3">
            {[
              // ✅ FIX: Use correct property names from the database
              { label: "Department Name", name: "department" },
              { label: "Description", name: "description" },
              { label: "Banner Image URL", name: "banner_image_url" },
            ].map((field) => (
              <div key={field.name} className="col-md-6">
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
            <div className="col-12">
              <button type="submit" className="btn btn-primary mt-2">
                Add Department
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
