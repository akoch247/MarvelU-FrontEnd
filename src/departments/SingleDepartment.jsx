import React from "react";
import { useParams } from "react-router-dom";
import { departments, professors } from "../data/DummyData";
import { div } from "framer-motion/client";

export default function SingleDepartment() {
    const { departmentId } = useParams();
    const deptIdNum = parseInt(departmentId);

    const department = departments.find((dept) => dept.id === deptIdNum);
    const profsInDepartment = professors.filter(
        (prof) => prof.department_id === deptIdNum
    );

    if (!department) {
        return <div>Department does not exist.</div>
    }

    return (
        <div>
            <h2>{department.name}</h2>
            <div>
                {profsInDepartment.map((prof) => (
                    <div key={prof.id}>
                        <img src={prof.profile_img} alt={`${prof.name}'s picture`} />
                        <h3>{prof.name}</h3>
                        <p><strong>Email:</strong> {prof.email}</p>
                        <p><strong>Date of Hire:</strong> {prof.dateOfHire}</p>
                        <p><strong>Department:</strong> {department.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}