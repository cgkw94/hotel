import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import HotelDetails from "./components/HotelDetails";
import Login from "./components/Login";

function App() {
  // eslint-disable-next-line -- this is to "get rid" of the compilation warning that the state was assigned but never used.
  const [userFeedback, setUserFeedback] = useState("");
  // eslint-disable-next-line
  const [userInfo, setUserInfo] = useState({ username: "" });
  // const [username, setUsername] = useState("");
  // const [hotelsStayed, setHotelsStayed] = useState("");
  // eslint-disable-next-line
  const [loggedIn, setLoggedIn] = useState(false);
  const handleSubmit = () => {};

  return (
    <>
      <Route exact path="/">
        <a href="/login">
          <button>Login / Sign Up</button>
        </a>
      </Route>
      <Route path="/login">
        <Login
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          // setUsername={setUsername}
          // setHotelsStayed={setHotelsStayed}
          setLoggedIn={setLoggedIn}
          // username={username}
          // hotelsStayed={hotelsStayed}
        />
      </Route>
      <Route path="/hoteldetails">
        <HotelDetails />
      </Route>
    </>
  );
}

export default App;
