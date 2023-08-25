import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login =(props)=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate('/signup');
    };
    const submitHandler = (e) => {
      e.preventDefault(); 
      props.handleLogin(username, password);
    };
  
    return (
      <div>
        <h1>Login</h1>
        {props.error && <div>{props.error}</div>}
        <form onSubmit={submitHandler}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        <button onClick={goToSignUp}>Sign Up</button>
      </div>
    );
  }
export default Login;
