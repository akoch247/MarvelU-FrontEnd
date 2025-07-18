import React from "react";
import "./Faculty.css";
import { professors } from "../data/DummyData";
import { Link } from "react-router-dom";
3
export default function AllFaculty() {
    return (
        <div>
          {professors.map((prof) => (
            <div key={prof.id}>
              <Link to={`/faculty/${prof.id}`}>
                <h2>{prof.name}</h2>
              </Link>
              <img src={prof.profile_img} alt={prof.name} />
              <p>{prof.email}</p>
            </div>
          ))}
        </div>
      );
}
