import React, { useState } from "react";
import Axios from "axios";

function HotelDetails(props) {
  const [feedback, setFeedback] = useState({ username: "", feedback: "" });

  const handleUsernameChange = (event) => {
    setFeedback((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  };

  const handleFeedbackChange = (event) => {
    setFeedback((prevState) => {
      return { ...prevState, feedback: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5005/feedback/create", {
      method: "POST",
      body: JSON.stringify({ feedback }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("new feedback added");
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleUsernameChange}
          placeholder="username"
          type="text"
        ></input>
        <input
          onChange={handleFeedbackChange}
          placeholder="feedback"
          type="text"
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default HotelDetails;
