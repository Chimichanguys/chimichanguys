import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signInAPI = async (username, password) => {
    const response = await fetch('http://localhost:8000/auth/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response;
 
    if (!response.ok) {
      throw new Error(data.message || 'Failed to login');
    }

    return data;
  };
  

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
        const response = await signInAPI(username, password);
        console.log("Server response:", `username: ${username}`); //message
        if (response.ok) { 
            console.log("Navigating to dashboard...");
            navigate('/dashboard'); 
        } else {
            setError(response.message || 'Failed to login');
        }
    } catch (error) {
        setError(error.message);
    }
};

  return (
    <div>
      <h1>Login</h1>
      {error && <div>{error}</div>}
      
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div>
        <button type="button" onClick={handleLogin}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;