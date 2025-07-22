import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Error404 from "./Error404.jsx";
import Navbar from "./layout/Navbar.jsx";
import FacultyPage from "./faculty/FacultyPage.jsx";
import SingleFaculty from "./faculty/SingleFaculty.jsx";
import DepartmentsPage from "./departments/DepartmentsPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SingleDepartment from "./departments/SingleDepartment.jsx";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="faculty/:id" element={<SingleFaculty />} />
          <Route path="departments/:id" element={<SingleDepartment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
