import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../api/ApiContext";
import { useAuth } from "../auth/AuthContext";

export default function AllFaculty() {
  const { token } = useAuth();
  const [facultyList, setFacultyList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const { request } = useApi();
  const [refetch, setRefetch] = useState(false);

  const [newProfessor, setNewProfessor] = useState({
    name: "",
    email: "",
    profile_image_url: "",
    department_id: "",
    date_of_hire: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profsData = await request("/professors");
        const deptsData = await request("/departments");
        setFacultyList(profsData);
        setDepartments(deptsData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [request, refetch]);

  const handleChange = (e) => {
    setNewProfessor({ ...newProfessor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request("/professors", {
        method: "POST",
        body: JSON.stringify(newProfessor),
      });
      setRefetch((prev) => !prev);
      setNewProfessor({
        name: "",
        email: "",
        profile_image_url: "",
        department_id: "",
        date_of_hire: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-4 text-white">
      <div className="row justify-content-center">
        {facultyList.map((prof) => (
          <div key={prof.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div
              className="shadow-sm rounded p-3 text-center h-100"
              style={{ backgroundColor: "#1e1e1e" }}
            >
              <img
                src={prof.profile_image_url}
                alt={prof.name}
                className="rounded-circle mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h5 className="mb-1">
                <Link
                  to={`/faculty/${prof.id}`}
                  className="text-decoration-none text-white"
                >
                  {prof.name}
                </Link>
              </h5>
              <p className="text-light small">{prof.email}</p>
            </div>
          </div>
        ))}
      </div>

      {token && (
        <div className="mt-5">
          <h2 className="mb-3">Add a New Professor</h2>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={newProfessor.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={newProfessor.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Profile Image URL</label>
              <input
                type="text"
                name="profile_image_url"
                value={newProfessor.profile_image_url}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date of Hire</label>
              <input
                type="date"
                name="date_of_hire"
                value={newProfessor.date_of_hire}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Department</label>
              <select
                name="department_id"
                value={newProfessor.department_id}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a department...</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.department}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary mt-2">
                Add Professor
              </button>
            </div>
          </form>
        </div>
      )}

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}
