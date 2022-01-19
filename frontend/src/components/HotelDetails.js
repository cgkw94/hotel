import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FeedbackForm from "./FeedbackForm";
import HotelHeader from "./HotelHeader";
import ReviewsCard from "./ReviewsCard";
import RoomsCard from "./RoomsCard";

function HotelDetails(props) {
  const params = useParams();

  const [loggedUsername, setLoggedUsername] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hotelDetails, setHotelDetails] = useState([]);
  const [feedbackDetails, setFeedbackDetails] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    username: "",
    userRating: 0,
    userFeedback: "",
  });

  const fetchHotelDetails = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setHotelDetails(data);
    setRoomDetails(data.roomsGeneral);
    setFeedbackDetails(data.feedback);
  };

  useEffect(() => {
    const username = props.userInfo.username;

    if (username !== undefined) {
      setLoggedIn(true);
      setLoggedUsername(username);
    } else {
      setLoggedIn(false);
    }

    setLoading(true);
    fetchHotelDetails(`/hotel/${params.hotelId}`);
    setLoading(false);
  }, []);

  const handleUsernameChange = (event) => {
    setFeedback((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  };

  const handleFeedbackChange = (event) => {
    setFeedback((prevState) => {
      return { ...prevState, userFeedback: event.target.value };
    });
  };

  const handleRatingChange = (event) => {
    setFeedback((prevState) => {
      return { ...prevState, userRating: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/hotel/${params.hotelId}/feedback/create`, {
      method: "POST",
      body: JSON.stringify({ feedback }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("new feedback added");
    });
    window.location.reload(false);
  };

  const displayRooms = roomDetails.map((data, index) => {
    return (
      <>
        <RoomsCard
          src={data.roomImg}
          roomType={data.roomType}
          price={data.price}
          maxPax={data.maxPax}
          size={data.size}
        />
      </>
    );
  });

  const displayFeedback = feedbackDetails.map((data, index) => {
    const handleDelete = () => {
      fetch(`/hotel/${params.hotelId}/feedback/delete/${data._id}`, {
        method: "DELETE",
      }).then(() => {
        console.log("feedback deleted");
      });

      window.location.reload(false);
    };

    return (
      <>
        <ReviewsCard
          username={data.username}
          userRating={data.userRating}
          userFeedback={data.userFeedback}
          onClick={handleDelete}
          loggedIn={loggedIn}
          loggedUsername={loggedUsername}
        />
      </>
    );
  });

  return (
    <div>
      <HotelHeader
        src={hotelDetails.hotelImg}
        hotelName={hotelDetails.hotelName}
      />
      <div>{displayRooms}</div>
      <div className="feedback-container">{displayFeedback}</div>
      <FeedbackForm
        handleSubmit={handleSubmit}
        handleUsernameChange={handleUsernameChange}
        handleFeedbackChange={handleFeedbackChange}
        handleRatingChange={handleRatingChange}
        username={feedback.username}
        userRating={feedback.userRating}
        userFeedback={feedback.userFeedback}
        loggedIn={loggedIn}
      />
    </div>
  );
}

export default HotelDetails;
