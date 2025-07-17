import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Error404 from './Error404.jsx';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
