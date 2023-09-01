import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import { CartProvider } from './components/useCart';
import Register from "./components/Register";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import DeliveryDetails from "./components/deliveryDetails";
import LoadingPage from "./components/loadingPage";
import OrderHistory from "./components/OrderHistory";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import { useState } from 'react';
import "./App.css";
import  Ingredients  from './components/Ingredients'

const App = () => {
  const [token, setToken] = useState('');

  return (
      <>
          <h1>Chimichanguys</h1>
          <NavBar />
          <CartProvider>
              <Routes>
                  <Route path="/" element={<Login setToken={setToken} />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/delivery" element={<DeliveryDetails />} />
                  <Route path="/loadingPage" element={<LoadingPage />} />
                  <Route path="/loadingPage/:choice" element={<LoadingPage />} />
                  
                  {/* Routes that are nested inside AuthenticatedRoute!!!!!!! */}
                  <Route path="/ingredients/*" element={<AuthenticatedRoute token={token} />}>
                      <Route index element={<Ingredients token={token} />} />
                  </Route>
                  <Route path="/cart" element={<AuthenticatedRoute token={token} />}>
                      <Route index element={<Cart />} />
                  </Route>
                  <Route path="/orderhistory" element={<AuthenticatedRoute token={token} />}>
                      <Route index element={<OrderHistory />} />
                  </Route>
              </Routes>
          </CartProvider>
      </>
  );
};

export default App;
