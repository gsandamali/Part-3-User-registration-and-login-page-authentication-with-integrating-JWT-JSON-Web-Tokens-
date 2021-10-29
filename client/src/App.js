import React, { useEffect, useState } from "react";
import Axios from 'axios';
import './App.css';

function App() {

  const [usernameReg, setUernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState ("");

  const [username, setUername] = useState("");
  const [password, setPassword] = useState ("");

  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;
  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus( false);
      } else {
        console.log(response.data);
        localStorage.setItem("token", response.data.token)
        setLoginStatus (true);
      }
    });
  };

  const userAuthenticeted = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input 
          type="text" 
          onChange={(e) => {
            setUernameReg(e.target.value);
          }}
        /><br/>
        <label>password</label>
        <input 
          type="text"
          onChange={(e) =>{
            setPasswordReg(e.target.value);
          }} 
        /> <br />
        <button onClick={register}> Register</button>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input 
          type="text" 
          placeholder="Username..." 
          onChange = { (e) => {
            setUername (e.target.value);
          }}
        /> <br/>
        <input 
          type="password" 
          placeholder="Password..."
          onChange = { (e) => {
            setPassword (e.target.value);
          }}
        />
        <button onClick={login}>Login</button>
      </div>

      {loginStatus && (
        <button onClick={userAuthenticeted}>Check if authenticated</button>
      )}
    </div>
  );
}

export default App;
