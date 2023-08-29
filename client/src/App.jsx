import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Register from "./components/Register";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { useState } from 'react';
import "./App.css";

const App = () => {
  const [token, setToken] = useState('');
  return (
    <>
      <h1>Chimichanguys</h1>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} /> 
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard/*" 
          element={
            <AuthenticatedRoute token={token}>
              <Dashboard />
            </AuthenticatedRoute>
          } 
        />
      </Routes>
    </>
  );
};

export default App;
