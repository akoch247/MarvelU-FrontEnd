import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Error404 from './Error404.jsx';
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
          <Route index element={<Login />} />
          <Route path="/Faculty" element={<Faculty />} />
          <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  )
}

export default App
