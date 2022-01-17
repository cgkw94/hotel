import React, { useState } from "react";

const Login = (props) => {
  const [error, setError] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [newUser, setNewUser] = useState({ username: "", email: "" });

  const fetchData = async (username, password) => {
    try {
      props.setUserInfo({ username: "" });
      props.setLoggedIn(false);
      const res = await fetch("http://localhost:5005/users/login", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await res.json();
      console.log(data);
      if (data.length > 0) {
        props.setUserInfo(data[0]);
        props.setLoggedIn(true);
        setError("");
      } else setError("Username/Password not found");
    } catch (err) {
      console.error(err);
      setError("errororor");
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

  const createUser = async (username, password) => {
    try {
      props.setUserInfo({ username: "" });
      props.setLoggedIn(false);
      console.log("hi");
      const res = await fetch("http://localhost:5005/users/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await res.json();
      res.send("user created");
    } catch (err) {
      console.error(err);
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

  const handleNew = (e) => {
    e.preventDefault();
    createUser(newUser);
    setError("");
    props.setUserInfo({ username: newUser.username, hotelStayed: [] });
    props.setLoggedIn(true);
    setNewUser({ username: "", email: "" });
  };

  return (
    <div>
      {props.userInfo.username}
      {props.userInfo.hotelStayed}
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
        <form onSubmit={handleNew}>
          <input
            placeholder="username"
            value={newUser.username}
            onChange={handleUsername}
          ></input>
          <input
            placeholder="email"
            type="email"
            value={newUser.email}
            onChange={handleEmail}
          ></input>
          <input placeholder="password" type="password"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
