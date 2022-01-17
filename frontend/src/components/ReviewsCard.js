import React from "react";

function ReviewsCard(props) {
  return (
    <div>
      <h4>{props.username}</h4>
      <p>{props.userRating}</p>
      <p>{props.userFeedback}</p>
    </div>
  );
}

export default ReviewsCard;
