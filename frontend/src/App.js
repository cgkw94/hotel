import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import "./App.css";
import HotelDetails from "./components/HotelDetails";
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
          <Button colorScheme="teal" variant="outline">
            Login/Sign Up
          </Button>
        </a>
      </Route>
      <Route path="/login">
        <Login
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          setLoggedIn={setLoggedIn}
        />
      </Route>
      <Route path="/hoteldetails">
        <HotelDetails />
      </Route>
    </>
  );
}

export default App;
