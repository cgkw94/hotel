import React, { useState } from "react";

const Login = (props) => {
  const [error, setError] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    rpassword: "",
    email: "",
  });

  const fetchData = async (username, password) => {
    props.setUserInfo({ username: "" });
    props.setLoggedIn(false);
    const res = await fetch("http://localhost:5005/users/login", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await res.json();
    if (data.msg === undefined) {
      setError("");
      props.setUserInfo(data);
    } else {
      setError(data.msg);
    }
  };

  const handleLoginUsername = (e) => {
    setUsernameInput(e.target.value);
  };

  const handleLoginPassword = (e) => {
    setPasswordInput(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetchData(usernameInput, passwordInput);
    setUsernameInput("");
    setPasswordInput("");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    props.setUserInfo("");
    props.setLoggedIn(false);
  };

  const createUser = async (username, password, email) => {
    const res = await fetch("http://localhost:5005/users/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ username, password, email }),
    });
    const data = await res.json();
    if (data.msg === undefined) {
      setError("");
      props.setUserInfo(data);
      setNewUser({ username: "", password: "", rpassword: "", email: "" });
    } else {
      setError(data.msg);
    }
  };

  const handleUsername = (e) => {
    setNewUser((prevState) => {
      return { ...prevState, username: e.target.value };
    });
  };

  const handleEmail = (e) => {
    setNewUser((prevState) => {
      return { ...prevState, email: e.target.value };
    });
  };

  const handlePassword = (e) => {
    setNewUser((prevState) => {
      return { ...prevState, password: e.target.value };
    });
  };

  const handleRPassword = (e) => {
    setNewUser((prevState) => {
      return { ...prevState, rpassword: e.target.value };
    });
  };

  const handleNew = (e) => {
    e.preventDefault();
    props.setUserInfo({ username: "" });
    props.setLoggedIn(false);
    if (newUser.password !== newUser.rpassword) {
      setError("Passwords do not match.");
    } else {
      createUser(newUser.username, newUser.password, newUser.email);
    }
  };

  return (
    <div>
      {props.userInfo.username}
      {error}
      <div>
        Login
        <br />
        <form>
          <input
            placeholder="username"
            value={usernameInput}
            onChange={handleLoginUsername}
          ></input>
          <input
            placeholder="password"
            type="password"
            value={passwordInput}
            onChange={handleLoginPassword}
          ></input>
          <button type="submit" onClick={handleLoginSubmit}>
            Submit
          </button>
          <button onClick={handleLogout}>Log Out?</button>
        </form>
      </div>
      <div>
        Sign Up
        <br />
        <form>
          <input
            placeholder="username"
            value={newUser.username}
            onChange={handleUsername}
          ></input>
          <input
            placeholder="password"
            type="password"
            value={newUser.password}
            onChange={handlePassword}
          ></input>
          <input
            placeholder="retype password"
            type="password"
            value={newUser.rpassword}
            onChange={handleRPassword}
          ></input>
          <input
            placeholder="email"
            type="email"
            value={newUser.email}
            onChange={handleEmail}
          ></input>
          <input type="radio" defaultChecked></input>
          <label>Customer</label>
          <input type="radio" /> <label> Hotel Manager</label>
          <button type="submit" onClick={handleNew}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
