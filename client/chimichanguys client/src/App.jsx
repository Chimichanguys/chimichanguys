import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const signInAPI = async (username, password) => {
    const response = await fetch('http://localhost:8000/auth/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to login');
    }

    return data;
  };

  const handleLogin = async (username, password) => {
    try {
      const data = await signInAPI(username, password);
      if (data.success) { // assuming the response has a `success` field
        setIsLoggedIn(true);
        setError(null); // Clear any previous errors
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const renderRoutes = () => {
    if (isLoggedIn) {
        return (
            <Routes>
                <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/signup" element={<div>SignUp Placeholder</div>} />
                <Route path="/*" element={<Login handleLogin={handleLogin} error={error} />} />
            </Routes>
        );
    }
};

return renderRoutes();
};


export default App;