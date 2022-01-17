import React, { useState } from "react";

const Login = (props) => {
  const [error, setError] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [newUser, setNewUser] = useState({ username: "", email: "" });

  const fetchData = async (input) => {
    try {
      props.setUserInfo({ username: "" });
      props.setLoggedIn(false);
      const res = await fetch("http://localhost:5005/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ username: input }),
      });
      const data = await res.json();
      if (data.length > 0) {
        console.log(data[0]);
        // props.setUsername(data[0].username);
        // props.setHotelsStayed(data[0].HotelStayed);
        props.setUserInfo(data[0]);
        props.setLoggedIn(true);
        setError("");
      } else setError("Username/Password not found");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginUsername = (e) => {
    setUsernameInput(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetchData(usernameInput);
    setUsernameInput("");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    props.setUserInfo("");
    props.setLoggedIn(false);
  };

  const createUser = async (input) => {
    try {
      props.setUserInfo({ username: "" });
      props.setLoggedIn(false);
      console.log("hi");
      const res = await fetch("http://localhost:5005/users/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ input }),
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
    console.log(newUser);
    createUser(newUser);
    //need to clear forms
  };

  // useEffect(() => {
  //   const url = "http://localhost:5005/users";
  //   fetchData(url);
  // }, []);

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
          <input placeholder="password"></input>
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
            placeholder="email"
            type="email"
            value={newUser.email}
            onChange={handleEmail}
          ></input>
          <input placeholder="password" type="password"></input>
          <button type="submit" onClick={handleNew}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
