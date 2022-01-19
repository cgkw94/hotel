import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

const DisplayPage = (props) => {
  let searchTitle = "";
  let hotelDisplay = <div></div>;

  //const [loading, setLoading] = useState(false);
  const [hotelData, setHotelData] = useState([]);
  const [fetchedAgain, setFetchedAgain] = useState(false);

  const fetchHotels = async (url) => {
    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        throw new Error("something went wrong");
      }

      const hotelResults = await res.json();

      console.log(hotelResults);
      setHotelData(hotelResults);
    } catch (err) {
      console.log(err);
    }

    setFetchedAgain(false);
    console.log("fetch done");
  };

  useEffect(() => {
    const url = `http://127.0.0.1:5005/hotel?location=${props.location}&inDate=${props.inDate}&outDate=${props.outDate}&roomType=${props.roomType}`;

    if (props.fetchedResults) {
      fetchHotels(url);
    }
  }, [props.fetchedResults]);

  useEffect(() => {
    const url = `http://127.0.0.1:5005/hotel?location=${props.location}&inDate=${props.inDate}&outDate=${props.outDate}&roomType=${props.roomType}`;

    console.log(props.location);
    if (fetchedAgain) {
      console.log("fetching again");
      fetchHotels(url);
    }
  }, [fetchedAgain]);

  if (props.fetchedResults || fetchedAgain) {
    searchTitle = <h4 id="search-title">Search Results</h4>;

    console.log(hotelData);
    hotelDisplay = hotelData?.map((hotel, index) => {
      return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Link
            className="link"
            to={{
              pathname: `/hotel/${hotel.hotelId}`,
            }}
          >
            <div key={index} id={hotel.hotelId}>
              {hotel.hotelName}
            </div>
            <img src={`${hotel.hotelImg}`} alt=""></img>
            <div>{hotel.address}</div>
            <div>{hotel.hotelRating}</div>
          </Link>
        </Box>
      );
    });
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    setFetchedAgain(true);
  };

  const handleLocationChange = (e) => {
    props.setLocation(e.target.value);
  };

  const handleInDateChange = (e) => {
    props.setInDate(e.target.value);
  };

  const handleOutDateChange = (e) => {
    props.setOutDate(e.target.value);
  };

  const handleRoomTypeChange = (e) => {
    props.setRoomType(e.target.value);
  };

  return (
    <>
      <div className="header">
        <h1 className="header-title">Welcome!</h1>
        <h2 className="header-title2">
          Have a warm and welcoming stay with us.
        </h2>

        <form>
          <select
            className="userInput"
            name="location"
            onChange={handleLocationChange}
            value={props.location}
          >
            <option value="Orchard">Orchard</option>
            <option value="Marina Bay">Marina Bay</option>
            <option value="Jurong East">Jurong East</option>
          </select>
          <input
            type="date"
            name="inDate"
            className="userInput"
            value={props.inDate}
            min="2022-01-20"
            max="2023-12-31"
            onChange={handleInDateChange}
          ></input>
          <input
            type="date"
            name="outDate"
            className="userInput"
            value={props.outDate}
            min="2022-01-20"
            max="2023-12-31"
            onChange={handleOutDateChange}
          ></input>
          <select
            className="userInput"
            name="roomType"
            value={props.roomType}
            onChange={handleRoomTypeChange}
          >
            <option value="Deluxe">Deluxe</option>
            <option value="Grand Deluxe">Grand Deluxe</option>
            <option value="Suite">Suite</option>
          </select>
          <Button onClick={handleOnClick}>Submit</Button>
        </form>
      </div>
      <div className="container">
        {searchTitle}
        <div className="container2">{hotelDisplay}</div>
      </div>
    </>
  );
};

export default DisplayPage;
