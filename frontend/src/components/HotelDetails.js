import React, { useState, useEffect } from "react";
import FeedbackForm from "./FeedbackForm";
import ReviewsCard from "./ReviewsCard";

function HotelDetails(props) {
  const [feedback, setFeedback] = useState({
    username: "",
    userRating: 0,
    userFeedback: "",
  });
  const [feedbackDetails, setFeedbackDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHotelDetails = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setFeedbackDetails(data[0].feedback);
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

  const displayFeedback = feedbackDetails.map((data, index) => {
    return (
      <>
        <ReviewsCard
          username={data.username}
          userRating={data.userRating}
          userFeedback={data.userFeedback}
        />
      </>
    );
  });

  return (
    <div>
      <div>{displayFeedback}</div>
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
