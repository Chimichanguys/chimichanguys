import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
//import Register from './components/Register'
import Login from './components/login';
import Dashboard from './components/dashboard';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;