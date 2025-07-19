import React from "react";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { professors } from "../data/DummyData";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SingleFaculty() {

  //Grab the id from the URL parameters, then find and compare the prof id to the id from params
  const { id } = useParams();
  const prof = professors.find((p) => p.id === parseInt(id));

  const {
    data: professor,
    loading,
    error,
  } = useQuery(`/faculty/${id}`, ["faculty", id]);

  const {
    mutate: deleteProfessor,
    loading: deleteloading,
    error: deleteError,
  } = useMutation("DELETE", `/faculty/${id}`, ["faculty"]);

  const handleDelete = async () => {
    try {
      await deleteProfessor();
      navigate("/faculty");
    } catch (err) {
      console.error("Deletion failed", err);
    }
  };

  if (!prof) return <p className="text-center mt-4">Professor not found</p>;
    return (
        <div className="container mt-5">
          <div className="text-center">
            <img 
              src={prof.profile_img}
              alt="Profile picture"
              className="rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h2>{prof.name}</h2>
            <p>Department: {prof.department}</p>
            <p>Superpower: {prof.superpower}</p>
            <p>Date of Hire: {prof.dateOfHire}</p>
            <p>Email: <a href={`mailto:${prof.email}`}>{prof.email}</a></p>
            <button className="btn btn-danger mt-3">Delete Professor</button>
          </div>
        </div>
    );
}