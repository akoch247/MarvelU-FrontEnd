import React from 'react';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Error404 from './Error404.jsx';
import Login from "./login/Login.jsx";
import AllFaculty from "./faculty/AllFaculty";
import SingleFaculty from './faculty/SingleFaculty.jsx';
import Register from './login/Register.jsx';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
          <Route index element={<Login />} />
          <Route path="/Faculty" element={<AllFaculty />} />
          <Route path="/SingleFaculty" element={<SingleFaculty />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  )
}

export default App
