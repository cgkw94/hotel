import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FeedbackForm from "./FeedbackForm";
import HotelHeader from "./HotelHeader";
import ReviewsCard from "./ReviewsCard";
import RoomsCard from "./RoomsCard";
import Cookies from "universal-cookie";

function HotelDetails(props) {
  const params = useParams();

  const cookies = new Cookies();

  const [loggedUsername, setLoggedUsername] = useState(null);
  const [hotelStayed, setHotelStayed] = useState(
    cookies.get("hotelStayedCookie")
  );
  const [booked, setBooked] = useState(false);
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
      setFeedback((prevState) => {
        return { ...prevState, username: username };
      });
    } else {
      setLoggedIn(false);
    }

    setLoading(true);
    fetchHotelDetails(`/hotel/${params.hotelId}`);
    setLoading(false);
  }, []);

  const roomSearchData = {
    inDate: props.inDateSearch,
    outDate: props.outDateSearch,
    roomType: props.roomTypeSearch,
    username: loggedUsername,
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

  const bookSubmit = () => {
    const lastStay = cookies.get("hotelStayedCookie");

    if (!lastStay.includes(parseInt(params.hotelId))) {
      fetch(`/hotel/${params.hotelId}`, {
        method: "PUT",
        body: JSON.stringify({ roomSearchData }),
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        console.log("booked");

        lastStay.push(parseInt(params.hotelId));
        setHotelStayed(lastStay);
        cookies.set("hotelStayedCookie", lastStay, {
          path: "/",
          maxAge: 2 * 60 * 60,
        });
        setBooked(true);
        window.location.href = `/hotel/${params.hotelId}`;
      });
    } else {
      setBooked(true);
    }
  };
  console.log(hotelStayed);
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
        {data.roomType === props.roomTypeSearch ? (
          <RoomsCard
            src={data.roomImg}
            roomType={data.roomType}
            price={data.price}
            maxPax={data.maxPax}
            size={data.size}
            onClick={bookSubmit}
          />
        ) : null}
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

  const displayFeedbackForm = hotelStayed.map((data) => {
    return (
      <>
        {data == `${params.hotelId}` ? (
          <FeedbackForm
            handleSubmit={handleSubmit}
            handleFeedbackChange={handleFeedbackChange}
            handleRatingChange={handleRatingChange}
            username={feedback.username}
            userRating={feedback.userRating}
            userFeedback={feedback.userFeedback}
            loggedIn={loggedIn}
            loggedUsername={loggedUsername}
          />
        ) : null}
      </>
    );
  });

  return (
    <div>
      <HotelHeader
        src={hotelDetails.hotelImg}
        hotelName={hotelDetails.hotelName}
      />
      {booked ? "hotel" : null}
      <div>{displayRooms}</div>
      <div className="feedback-container">{displayFeedback}</div>
      <div>{displayFeedbackForm}</div>
    </div>
  );
}

export default HotelDetails;
