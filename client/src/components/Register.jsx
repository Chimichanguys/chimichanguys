import { useState } from "react";

const Register = () => {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({username, email, password});
    console.log(`New User Registered!!
      ${JSON.stringify(body)}
    `);
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body
    });
    const result = await response.json();
    console.log(result);
  }

  return (
    <>
      <h1>Register as a Chimichanguy!!</h1>
      <form onSubmit={submitHandler}>
        <label>
          Username: 
          <input type="text" onChange={(e) => {setUsername(e.target.value)}} />
        </label>
        <label>
          Email: 
          <input type="email" onChange={(e) => {setEmail(e.target.value)}} />
        </label>
        <label>
          Password: 
          <input type="password" onChange={(e) => {setPassword(e.target.value)}} />
        </label>
        <button>Register</button>
      </form>
    </>
  )
}

export default Register;