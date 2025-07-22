import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../api/ApiContext";

export default function SingleFaculty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { request } = useApi();

  const [professor, setProfessor] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const data = await request(`/professors/${id}`);
        setProfessor(data);
        setFormData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProfessor();
  }, [id, request]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedProfessor = await request(`/professors/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      setProfessor(updatedProfessor);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this professor?")) {
      try {
        await request(`/professors/${id}`, { method: "DELETE" });
        navigate("/faculty");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!professor) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="text-center">
        <img
          src={professor.profile_img}
          alt="Profile picture"
          className="rounded-circle mb-3"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <h2>{professor.name}</h2>
        <p>Department: {professor.department}</p>
        <p>
          Date of Hire: {new Date(professor.dateOfHire).toLocaleDateString()}
        </p>
        <p>
          Email: <a href={`mailto:${professor.email}`}>{professor.email}</a>
        </p>
        <button onClick={handleDelete} className="btn btn-danger mt-3">
          Delete Professor
        </button>
      </div>

      <div
        className="border p-3 shadow rounded bg-light mx-auto mt-4"
        style={{ maxWidth: "350px", fontSize: "0.9rem" }}
      >
        <h5 className="mb-3 text-center">Edit Professor Information</h5>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label small">
              Full Name
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label small">
              Email Address
            </label>
            <input
              type="email"
              className="form-control form-control-sm"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="department" className="form-label small">
              Department
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="dateOfHire" className="form-label small">
              Date of Hire
            </label>
            <input
              type="date"
              className="form-control form-control-sm"
              id="dateOfHire"
              name="dateOfHire"
              value={formData.dateOfHire?.split("T")[0]}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="profile_img" className="form-label small">
              Profile Image URL
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="profile_img"
              name="profile_img"
              value={formData.profile_img}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm w-100">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
