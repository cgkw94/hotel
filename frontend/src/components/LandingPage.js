import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const LandingPage = (props) => {
  const [locationInput, setLocationInput] = useState("");
  const [inDateInput, setInDateInput] = useState("");
  const [outDateInput, setOutDateInput] = useState("");
  const [roomTypeInput, setRoomTypeInput] = useState("");

  const handleOnClick = (event) => {
    event.preventDefault();

    props.setLocation(locationInput);
    props.setInDate(inDateInput);
    props.setOutDate(outDateInput);
    props.setRoomType(roomTypeInput);

    console.log("clicked");
    //props.setFetching(true)
  };

  // const handleOnChange = (event) => {
  //     setKeyword(event.target.value)
  // }

  return (
    <header>
      <div className="header">
        <h1 className="header-title">Welcome!</h1>
        <h2 className="header-title2">
          Have a warm and welcoming stay with us.
        </h2>

        <form>
          <select className="userInput" name="location">
            <option value="" selected>
              --Please choose a location--
            </option>
            <option value="Orchard">Orchard</option>
            <option value="Marina Bay">Marina Bay</option>
            <option value="Jurong East">Jurong East</option>
          </select>
          <input
            type="date"
            name="inDate"
            className="userInput"
            value="2022-01-20"
            min="2022-01-20"
            max="2023-12-31"
          ></input>
          <input
            type="date"
            name="outDate"
            className="userInput"
            value="2022-01-20"
            min="2022-01-20"
            max="2023-12-31"
          ></input>
          <select className="userInput" name="roomType">
            <option value="" selected>
              --Please choose a room type--
            </option>
            <option value="Deluxe">Deluxe</option>
            <option value="Grand Deluxe">Grand Deluxe</option>
            <option value="Suite">Suite</option>
          </select>
          <input
            type="submit"
            id="searchButton"
            onClick={handleOnClick}
          ></input>
        </form>
      </div>
    </header>
  );
};

export default LandingPage;
