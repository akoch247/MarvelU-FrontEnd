import React from 'react';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Error404 from './Error404.jsx';
import Login from "./login/Login.jsx";
import Register from './login/Register.jsx';
import FacultyPage from './faculty/FacultyPage.jsx';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
          <Route index element={<Login />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  )
}

export default App
