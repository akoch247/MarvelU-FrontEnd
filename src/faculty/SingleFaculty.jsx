import React from "react";
import "./Faculty.css";

export default function SingleFaculty() {
    return (
        <div id="professor">
        <figure>
          <img src={professor.profile_img} alt={`Profile Picture`} />
        </figure>
        <section>
          <h1>{professor.name}</h1>
        </section>
      </div>
    )
}