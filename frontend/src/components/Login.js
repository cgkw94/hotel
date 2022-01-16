import React, { useState } from "react";

const Login = (props) => {
  const [error, setError] = useState("");
  const fetchData = async (e) => {
    e.preventDefault();
    try {
      console.log("hi");
      const res = await fetch("http://localhost:5005/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ username: "James" }),
      });
      const data = await res.json();
      if (data.length > 0) {
        props.setUserInfo(data);
        props.setLoggedIn(true);
      } else setError("Username/Password not found");
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   const url = "http://localhost:5005/users";
  //   fetchData(url);
  // }, []);

  return (
    <div>
      {props.username}
      {error}
      <div>
        Login
        <br />
        <form>
          <input placeholder="username"></input>
          <input placeholder="password"></input>
          <button type="submit" onClick={fetchData}>
            Submit
          </button>
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
