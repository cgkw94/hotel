import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";

function App() {
  // eslint-disable-next-line -- this is to "get rid" of the compilation warning that the state was assigned but never used.
  const [userFeedback, setUserFeedback] = useState("");
  // eslint-disable-next-line
  const [userInfo, setUserInfo] = useState({ username: "" });
  // eslint-disable-next-line
  const [loggedIn, setLoggedIn] = useState(false);
  const handleSubmit = () => {};
  return (
    <>
      <Route exact path="/">
        <a href="/login">
          <button>Login / Sign Up</button>
        </a>
        <form onSubmit={handleSubmit}>
          <div>Feedback</div>
          <input
            type="text"
            name="feedback"
            onChange={(e) => setUserFeedback(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </Route>
      <Route path="/login">
        <Login
          setUserInfo={setUserInfo}
          setLoggedIn={setLoggedIn}
          username={userInfo.username}
        />
      </Route>
    </>
  );
}

export default App;
