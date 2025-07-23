import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../api/ApiContext";
import { useAuth } from "../auth/AuthContext";

export default function SingleDepartment() {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const { request } = useApi();
  const { token } = useAuth();

  const [department, setDepartment] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptData = await request(`/departments/${departmentId}`);
        const allProfsData = await request("/professors");
        setDepartment(deptData);
        setProfessors(allProfsData);
        setEditForm(deptData);
      } catch (err) {
        setError(err.message);
        setDepartment(false);
      }
    };
    fetchData();
  }, [departmentId, request, refetch]);

  const profsInDepartment = useMemo(() => {
    if (!department) return [];
    return professors.filter((prof) => prof.department_id === department.id);
  }, [professors, department]);

  const availableProfs = useMemo(() => {
    if (!department) return [];
    return professors.filter((prof) => prof.department_id !== department.id);
  }, [professors, department]);

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await request(`/departments/${departmentId}`, {
        method: "PUT",
        body: JSON.stringify(editForm),
      });
      setRefetch((prev) => !prev);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateProfessorDepartment = async (profId, newDeptId) => {
    try {
      await request(`/professors/${profId}`, {
        method: "PUT",
        body: JSON.stringify({ department_id: newDeptId }),
      });
      setRefetch((prev) => !prev);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (department === null) return <div>Loading...</div>;
  if (department === false) return <div>Department not found.</div>;

  return (
    <div
      className="py-4 text-white"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <div className="text-center">
        <h2>{department.department}</h2>
        <img
          src={department.banner_image_url}
          alt="Department Banner"
          className="img-fluid mb-3"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <p className="lead text-white-50">{department.description}</p>
      </div>

      <div>
        <h4 className="mt-4">Faculty of {department.department}</h4>
        {profsInDepartment.map((prof) => (
          <div key={prof.id} className="d-flex align-items-center mb-3">
            <img
              src={prof.profile_image_url}
              alt={prof.name}
              className="rounded-circle me-3"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div>
              <h5>{prof.name}</h5>
              <p className="mb-0">
                <strong>Email:</strong> {prof.email}
              </p>
            </div>
            {token && (
              <button
                onClick={() => updateProfessorDepartment(prof.id, null)}
                className="btn btn-sm btn-outline-warning ms-auto"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {profsInDepartment.length === 0 && <p>No professors assigned.</p>}
      </div>

      {token && (
        <>
          <div className="mt-5">
            <h4>Edit Department</h4>
            <form onSubmit={handleEditSubmit} className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="department"
                  value={editForm.department || ""}
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-8">
                <label className="form-label">Banner Image URL</label>
                <input
                  type="text"
                  name="banner_image_url"
                  value={editForm.banner_image_url || ""}
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="mt-5">
            <h4>Add Professors to {department.department}</h4>
            {availableProfs.map((prof) => (
              <div key={prof.id} className="d-flex align-items-center mb-2">
                <img
                  src={prof.profile_image_url}
                  alt={prof.name}
                  className="rounded-circle me-3"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div>
                  <h5>{prof.name}</h5>
                  <p className="mb-0">{prof.email}</p>
                </div>
                <button
                  className="btn btn-sm btn-outline-success ms-auto"
                  onClick={() =>
                    updateProfessorDepartment(prof.id, department.id)
                  }
                >
                  Add
                </button>
              </div>
            ))}
            {availableProfs.length === 0 && (
              <p>No available professors to add.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
