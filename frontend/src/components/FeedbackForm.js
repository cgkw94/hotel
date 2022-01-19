import React from "react";

const FeedbackForm = (props) => {
  const loggedIn = props.loggedIn;
  const loggedUsername = props.loggedUsername;

  console.log(loggedUsername);
  return (
    <>
      {loggedIn ? (
        <form onSubmit={props.handleSubmit}>
          <input
            onChange={props.handleUsernameChange}
            placeholder="username"
            type="text"
            name="username"
            value={props.loggedUsername}
            disabled="disabled"
          />
          <select onChange={props.handleRatingChange} value={props.userRating}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <input
            onChange={props.handleFeedbackChange}
            placeholder="feedback"
            type="text"
            name="feedback"
            value={props.userFeedback}
          ></input>
          <button>Submit</button>
        </form>
      ) : null}
    </>
  );
};

export default FeedbackForm;
