import React from "react";

const Login = () => {
  return (
    <div>
      <div>
        Login
        <br />
        <form>
          <input placeholder="email"></input>
          <input placeholder="password"></input>
          <button type="submit">Submit</button>
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
