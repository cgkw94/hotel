import React, { useState, useEffect } from "react";
import FeedbackForm from "./FeedbackForm";

function HotelDetails(props) {
  const [hotelDetails, setHotelDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    username: "",
    userRating: 0,
    userFeedback: "",
  });

  const fetchHotelDetails = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setHotelDetails(data[0].feedback);
    console.log(hotelDetails);
  };

  useEffect(() => {
    setLoading(true);
    fetchHotelDetails("/hotel/1");
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
    fetch("/feedback/create", {
      method: "POST",
      body: JSON.stringify({ feedback }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("new feedback added");
    });
  };

  return (
    <div>
      <FeedbackForm
        handleSubmit={handleSubmit}
        handleUsernameChange={handleUsernameChange}
        handleFeedbackChange={handleFeedbackChange}
        handleRatingChange={handleRatingChange}
        username={feedback.username}
        userRating={feedback.userRating}
        userFeedback={feedback.userFeedback}
      />
    </div>
  );
}

export default HotelDetails;
