import React, { useState } from "react";

const Login = (props) => {
  const [error, setError] = useState("");
  const [usernameInput, setUsernameInput] = useState("");

  const fetchData = async (input) => {
    try {
      props.setUserInfo({ username: "" });
      props.setLoggedIn(false);
      console.log("hi");
      const res = await fetch("http://localhost:5005/users", {
        method: "POST",
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
          <input placeholder="username"></input>
          <input placeholder="email" type="email"></input>
          <input placeholder="password" type="password"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
