import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Register from "./components/Register";
import "./App.css";

const App = () => {
  return (
    <>
      <h1>Chimichanguys</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;

