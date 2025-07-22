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
    profile_image_url: "",
    department: "",
    date_of_hire: "",
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
        profile_image_url: "",
        department: "",
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
                src={prof.profile_img || prof.profile_image_url}
                alt={prof.name}
                className="rounded-circle mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h5 className="mb-1">
                <Link to={`/faculty/${prof.id}`} className="text-decoration-none text-white">
                  {prof.name}
                </Link>
              </h5>
              <p className="text-light small">{prof.email}</p>
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
            { label: "Profile Image URL", name: "profile_image_url" },
            { label: "Department", name: "department" },
            { label: "Date of Hire", name: "date_of_hire", type: "date" },
          ].map((field) => (
            <div className="col-md-6" key={field.name}>
              <label className="form-label">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={newProfessor[field.name]}
                onChange={handleChange}
                className="form-control text-white"
                style={{
                  backgroundColor: "#2c2c2c",
                  border: "1px solid #444",
                  color: "white",
                  "::placeholder": { color: "gray" },
                }}
                placeholder={field.label}
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

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}
