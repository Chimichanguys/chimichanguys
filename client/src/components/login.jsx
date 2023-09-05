import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setToken, setAdmin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/auth/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      console.log(data)

      if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('admin', data.isAdmin);
          console.log("Received token:", data.token);
          console.log("Received userId:", data.userId);
          console.log("Received admin status:", data.isAdmin);
          setToken(data.token);
          setAdmin(data.isAdmin)
          navigate('/ingredients'); 
          console.log("Navigating to dashboard...");
      } else {
          setError(data.message || 'Failed to login');
      }

    } catch (error) {
        setError("Something went wrong.");
    }
  }

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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;