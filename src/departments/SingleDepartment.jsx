import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../api/ApiContext";

export default function SingleDepartment() {
  const { departmentId } = useParams();
  const [department, setDepartment] = useState(null);
  const [profsInDepartment, setProfsInDepartment] = useState([]);
  const [error, setError] = useState(null);
  const { request } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptData = await request(`/departments/${departmentId}`);
        const allProfsData = await request("/professors");

        setDepartment(deptData);
        setProfsInDepartment(
          allProfsData.filter((prof) => prof.department_id === deptData.id)
        );
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [departmentId, request]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!department) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{department.department}</h2>
      <p>{department.description}</p>
      <hr />
      <h4>Professors</h4>
      <div className="row">
        {profsInDepartment.length > 0 ? (
          profsInDepartment.map((prof) => (
            <div key={prof.id} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={prof.profile_image_url}
                  alt={`${prof.name}'s picture`}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{prof.name}</h5>
                  <p className="card-text small">
                    <strong>Email:</strong> {prof.email}
                  </p>
                  <p className="card-text small">
                    <strong>Date of Hire:</strong>{" "}
                    {new Date(prof.date_of_hire).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No professors yet in this department.</p>
        )}
      </div>
    </div>
  );
}
