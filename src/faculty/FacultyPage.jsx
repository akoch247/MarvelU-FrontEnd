import React from "react";
import AllFaculty from "./AllFaculty";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FacultyPage() {
    return (
        <>
            <h1 className= "fw-bold text-center my-4">Faculty</h1>
            <AllFaculty />
        </>
    );
}