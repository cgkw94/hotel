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

app.get("/usersseed", async (req, res) => {
  await Users.deleteMany();
  await Users.create(usersseed);
  const checkUsers = await Users.find();
  res.json(checkUsers);
});

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

  //for some reason cant update DB using this syntax but express can receive post
  Hotel.updateOne(
    //query
    { hotelId: 1 },
    //update
    {
      $push: {
        feedback: newFeedback,
      },
    }
  );
});

////////////////////////////////////
// PUT transaction for room
////////////////////////////////////

app.put("/hotel/:id", async (req, res) => {

  let id = parseInt(req.params.id)
  let inDate = req.body.inDate
  let outDate = req.body.outDate
  let userName = req.body.userName
  let roomType = req.body.roomType

  const hotelDetails = await Hotel.findOne({
    hotelId: `${req.params.id}`,
  });

  hotelDetails.userStayed.push(userName)
  hotelDetails.rooms.push({inDate: inDate, outDate: outDate, roomType: roomType})

  Hotel.updateOne({hotelId: id}, hotelDetails, function(err, res) {
    if (err) {
      console.log(err)
      res.status(500)
      res.json({})
    } else {
      console.log(res)
    }
  })
  res.status(200)
  res.json(hotelDetails)
})

////////////////////////////////////
// GET list of available hotels
////////////////////////////////////

app.get("/hotel/", async (req, res) => {

  let inDate = req.query.inDate
  let outDate = req.query.outDate
  let inDateUnix = Date(inDate)
  let outDateUnix = Date(outDate)
  let roomType = req.query.roomType
  let allHotels = await Hotel.find()
  // for each hotel, go through all the bookings and check if there is a clash in booking. If clash, return false in filter.
  allHotels = allHotels.filter(singleHotel => {
    // get all bookings for this roomType (rooms are the bookings of this particular hotel)
    let bookings = singleHotel.rooms.filter(room => room.roomType === roomType);

    // for each of the existing booking, check if every booking doesn't overlap with user's booking
    return bookings.every(booking => {
      // to make a fair comparison of date strings, convert to unix time
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
      let bookingStart = Date.parse(booking.inDate)
      let bookingEnd = Date.parse(booking.outDate)
      // the only two conditions to check to ensure no overlap
      return outDateUnix < bookingStart || inDateUnix > bookingEnd
    })
  })
  
  // at this point, Hotels that's not available are filtered out already
  res.json(allHotels)
})

////////////////////////////////////
// Login to obtain Users Data
////////////////////////////////////
// remember that username is case-sensitive

app.listen(5005);
