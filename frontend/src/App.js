import React, { useState } from "react";
import { Route } from "react-router-dom";
import Cookies from "universal-cookie";

import "./App.css";
import HotelDetails from "./components/HotelDetails";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import DisplayPage from "./components/DisplayPage";

function App() {
  const cookies = new Cookies();

  //search input useStates
  const [location, setLocation] = useState("");
  const [inDate, setInDate] = useState("");
  const [outDate, setOutDate] = useState("");
  const [roomType, setRoomType] = useState("");

  const [fetchedResults, setFetchedResults] = useState(false);

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
        <Header userInfo={userInfo} />
        <LandingPage
          setLocation={setLocation}
          setInDate={setInDate}
          setOutDate={setOutDate}
          setRoomType={setRoomType}
          userInfo={userInfo}
          setFetchedResults={setFetchedResults}
        />
      </Route>
      <Route exact path="/login">
        <Header userInfo={userInfo} hide="true" />
        <Login setUserInfo={setUserInfo} userInfo={userInfo} />
      </Route>
      <Route exact path="/search">
        <Header userInfo={userInfo} />
        <DisplayPage
          location={location}
          inDate={inDate}
          outDate={outDate}
          roomType={roomType}
          fetchedResults={fetchedResults}
          setFetchedResults={setFetchedResults}
          setLocation={setLocation}
          setInDate={setInDate}
          setOutDate={setOutDate}
          setRoomType={setRoomType}
        />
      </Route>
      <Route exact path="/hotel/:hotelId">
        <Header userInfo={userInfo} />
        <HotelDetails userInfo={userInfo} />
      </Route>
    </>
  );
}

export default App;
