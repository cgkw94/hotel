import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Cookies from "universal-cookie";

import "./App.css";
import HotelDetails from "./components/HotelDetails";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";

function App() {
  const cookies = new Cookies();

  //search input useStates
  const [location, setLocation] = useState("");
  const [inDate, setInDate] = useState("");
  const [outDate, setOutDate] = useState("");
  const [roomType, setRoomType] = useState("");

  // eslint-disable-next-line -- this is to "get rid" of the compilation warning that the state was assigned but never used.
  const [userFeedback, setUserFeedback] = useState("");
  // eslint-disable-next-line
  const [userInfo, setUserInfo] = useState({
    username: cookies.get("usernameCookie"),
    hotelStayed: cookies.get("hotelStayedCookie"),
  });
  // removed loggedIn state. to check if logged in or not, check "if (userInfo.username!== undefined)" >> this means user is logged in.

  const handleSubmit = () => {};

  return (
    <>
      <Route exact path="/">
        <LandingPage
          setLocation={setLocation}
          setInDate={setInDate}
          setOutDate={setOutDate}
          setRoomType={setRoomType}
          userInfo={userInfo}
        />
      </Route>
      <Route path="/login">
        <Login setUserInfo={setUserInfo} userInfo={userInfo} />
      </Route>
      <Route path="/search">
        <Header userInfo={userInfo} />
        this is the results page
      </Route>
      <Route exact path="/hotel/:hotelId">
        <HotelDetails />
      </Route>
    </>
  );
}

export default App;
