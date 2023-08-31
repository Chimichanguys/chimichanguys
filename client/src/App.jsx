import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Register from "./components/Register";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import DeliveryDetails from "./components/deliveryDetails";
import LoadingPage from "./components/loadingPage";
import OrderHistory from "./components/OrderHistory";
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
        <Route path="/delivery" element={<DeliveryDetails />} />
        <Route path="/loadingPage" element={<LoadingPage />} />
        <Route path="/loadingPage/:choice" element={<LoadingPage />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
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
