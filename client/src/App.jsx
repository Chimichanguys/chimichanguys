import { Routes, Route } from "react-router-dom";
import Login from "./components/login";

import Register from "./components/Register";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import DeliveryDetails from "./components/deliveryDetails";
import LoadingPage from "./components/loadingPage";
import OrderHistory from "./components/OrderHistory";
import NavBar from "./components/NavBar";
import { useState } from 'react';
import "./App.css";

const App = () => {
  const [token, setToken] = useState('');
  return (
    <>
      <h1>Chimichanguys</h1>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/delivery" element={<DeliveryDetails />} />
        <Route path="/loadingPage" element={<LoadingPage />} />
        <Route path="/loadingPage/:choice" element={<LoadingPage />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route 
          path="/ingredients/*" 
          element={
            <AuthenticatedRoute token={token} />
           } 
           
        />
      </Routes>
    </>
  );
};

export default App;
