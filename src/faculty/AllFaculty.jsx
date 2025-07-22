import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../api/ApiContext";

export default function AllFaculty() {
  const [facultyList, setFacultyList] = useState([]);
  const [error, setError] = useState(null);
  const { request } = useApi();

  const [newProfessor, setNewProfessor] = useState({
    name: "",
    email: "",
    profile_img: "",
    department: "",
    dateOfHire: "",
  });

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const data = await request("/professors");
        setFacultyList(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFaculty();
  }, [request]);

  const handleChange = (e) => {
    setNewProfessor({ ...newProfessor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdProfessor = await request("/professors", {
        method: "POST",
        body: JSON.stringify(newProfessor),
      });
      setFacultyList([...facultyList, createdProfessor]);
      setNewProfessor({
        name: "",
        email: "",
        profile_img: "",
        department: "",
        dateOfHire: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row justify-content-center">
        {facultyList.map((prof) => (
          <div key={prof.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="border rounded p-3 text-center h-100">
              <img
                src={prof.profile_img}
                alt={prof.name}
                className="rounded-circle mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h5 className="mb-1">
                <Link
                  to={`/faculty/${prof.id}`}
                  className="text-decoration-none text-dark"
                >
                  {prof.name}
                </Link>
              </h5>
              <p className="text-muted small">{prof.email}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h2 className="mb-3">Add a New Professor</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Profile Image URL", name: "profile_img" },
            { label: "Department", name: "department" },
            { label: "Date of Hire", name: "dateOfHire", type: "date" },
          ].map((field) => (
            <div className="col-md-6" key={field.name}>
              <label className="form-label">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={newProfessor[field.name]}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          ))}
          <div className="col-12">
            <button type="submit" className="btn btn-primary mt-2">
              Add Professor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
