////////////////////////////////////
// Dependencies
////////////////////////////////////

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./models/db");
let cors = require("cors");

////////////////////////////////////
// Models
////////////////////////////////////

const Hotel = require("./models/hotel");
const seedData = require("./models/Seed");
const Users = require("./models/users");
const usersseed = require("./models/usersseed");
const { deleteMany, db } = require("./models/hotel");

const { json } = require("express");

////////////////////////////////////
// Config
////////////////////////////////////

const mongoURI = "mongodb://127.0.0.1:27017/hotel";
connectDB(mongoURI);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

////////////////////////////////////
// Connect to Mongo
////////////////////////////////////

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("The connection with mongodb is established");
  }
);

////////////////////////////////////
// DataBase
////////////////////////////////////

////////////////////////////////////
// Seed Hotel Data
////////////////////////////////////

app.get("/seed", async (req, res) => {
  await Hotel.deleteMany();
  await Hotel.create(seedData);
  const hotelResults = await Hotel.find();
  res.json(hotelResults);
});

////////////////////////////////////
// Seed Users Data
////////////////////////////////////

// app.get("/usersseed",  async (req, res) => {
Users.deleteMany().then(Users.create(usersseed));
// const checkUsers = await Users.find();
// res.json(checkUsers);
// }

////////////////////////////////////
// Hotel Details
////////////////////////////////////
app.get("/hotel/:id", async (req, res) => {
  const hotelDetails = await Hotel.find({
    hotelId: `${req.params.id}`,
  });
  res.json(hotelDetails);
});

////////////////////////////////////
// POST feedback form
////////////////////////////////////

app.post("/feedback/create", async (req, res) => {
  console.log(req.body.feedback);
  const newFeedback = req.body.feedback;

  await Hotel.updateOne(
    { hotelId: 1 },
    {
      $push: {
        feedback: {
          username: newFeedback.username,
          userRating: newFeedback.userRating,
          userFeedback: newFeedback.userFeedback,
        },
      },
    }
  );
});

////////////////////////////////////
// PUT transaction for room
////////////////////////////////////

app.put("/hotel/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let inDate = req.body.inDate;
  let outDate = req.body.outDate;
  let userName = req.body.userName;
  let roomType = req.body.roomType;
  let roomSize = req.body.roomSize;

  const hotelDetails = await Hotel.findOne({
    hotelId: `${req.params.id}`,
  });

  hotelDetails.userStayed.push(userName);
  hotelDetails.rooms.push({
    inDate: inDate,
    outDate: outDate,
    roomType: roomType,
    roomSize: roomSize,
  });

  Hotel.updateOne({ hotelId: id }, hotelDetails, function (err, res) {
    if (err) {
      console.log(err);
      res.status(500);
      res.json({});
    } else {
      console.log(res);
    }
  });
  res.status(200);
  res.json(hotelDetails);
});

////////////////////////////////////
// GET list of available hotels
////////////////////////////////////

app.get("/hotel/", async (req, res) => {
  let inDate = req.query.inDate;
  let outDate = req.query.outDate;
  let inDateUnix = Date(inDate);
  let outDateUnix = Date(outDate);
  let roomSize = req.query.roomSize;
  let allHotels = await Hotel.find();

  allHotels = allHotels.filter((singleHotel) => {
    let bookings = singleHotel.rooms.filter((room) => room.maxPax === roomSize);
    // for each of the existing bookings, the logic below checks every booking to see if it overlaps with user's in and out dates
    return (
      bookings.every((booking) => {
        // Date.parse converts the in and out dates to unix for comparison

        let bookingStart = Date.parse(booking.inDate);
        let bookingEnd = Date.parse(booking.outDate);

        return outDateUnix < bookingStart || inDateUnix > bookingEnd; //the conditions to make sure it doesn't overlap
      }) && singleHotel.location === req.query.location
    );
  });

  // at this point, Hotels that's not available are filtered out already
  res.json(allHotels);
});

////////////////////////////////////
// Login to obtain Users Data
////////////////////////////////////
// remember that username is case-sensitive
app.patch("/users/login", async (req, res) => {
  const checkUsers = await Users.find(
    { username: req.body.username },
    { username: 1, hotelStayed: 1, _id: 0 }
  );
  res.json(checkUsers);
});

////////////////////////////////////
// Create New User
////////////////////////////////////
// remember that username is case-sensitive
app.post("/users/new", async (req, res) => {
  const checkUsers = await Users.create({
    username: req.body.input.username,
    email: req.body.input.email,
    passwordHash: 123,
  });
  res.json(checkUsers);
});

app.listen(5005);
