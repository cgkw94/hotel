import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Button } from "@chakra-ui/react";

import "./App.css";
import HotelDetails from "./components/HotelDetails";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";

function App() {

  //search input useStates
  const [location, setLocation] = useState('')
  const [inDate, setInDate] = useState('')
  const [outDate, setOutDate] = useState('')
  const [roomType, setRoomType] = useState('')

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
      <Route exact path="/">
        <LandingPage setLocation={setLocation} setInDate={setInDate} setOutDate={setOutDate} setRoomType={setRoomType} />
      </Route>
      <Route exact path="/hotel/:hotelId">
        <HotelDetails />
      </Route>
    </>
  );
}

export default App;
