import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FeedbackForm from "./FeedbackForm";
import ReviewsCard from "./ReviewsCard";

function HotelDetails(props) {
  const params = useParams();

  const [feedbackDetails, setFeedbackDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    username: "",
    userRating: 0,
    userFeedback: "",
  });

  const fetchHotelDetails = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setFeedbackDetails(data.feedback);
  };

  useEffect(() => {
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
  };

  const displayFeedback = feedbackDetails.map((data, index) => {
    const handleDelete = () => {
      fetch(`/hotel/${params.hotelId}/feedback/delete/${data._id}`, {
        method: "DELETE",
      }).then(() => {
        console.log("feedback deleted");
      });
    };
    return (
      <>
        <ReviewsCard
          username={data.username}
          userRating={data.userRating}
          userFeedback={data.userFeedback}
          onClick={handleDelete}
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
