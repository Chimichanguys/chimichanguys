import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Register from "./components/Register";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import DeliveryDetails from "./components/deliveryDetails";
import LoadingPage from "./components/loadingPage";
import { useState } from 'react';
import "./App.css";

const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState();

  //GET User when token is updated
   useEffect(() =>{
    //fetch user from /auth/me
    // Send token on authorization header
    // setUser(result.json())
   }, [token]);

  return (
    <>
      <h1>Chimichanguys</h1>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/delivery" element={<DeliveryDetails />} />
        <Route path="/loadingPage" element={<LoadingPage />} />
        <Route path="/loadingPage/:choice" element={<LoadingPage />} />
        <Route 
          path="/dashboard/*" 
          element={
            <AuthenticatedRoute token={token}>
              <Dashboard  />
            </AuthenticatedRoute>
          } 
        />
      </Routes>
    </>
  );
};

export default App;
