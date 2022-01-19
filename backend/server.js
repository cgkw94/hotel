////////////////////////////////////
// Dependencies
////////////////////////////////////

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./models/db");
let cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bcrypt = require("bcrypt");
const auth = require("./middleware/auth");

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

const store = new MongoDBStore({
  uri: mongoURI,
  collection: "currentSessions",
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 1000,
    store: store,
  })
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

app.get("/seedusers", async (req, res) => {
  Users.deleteMany().then(Users.create(usersseed));
  const userDetails = await Users.find();
  res.json(userDetails);
});

////////////////////////////////////
// Hotel Details
////////////////////////////////////
app.get("/hotel/:id", async (req, res) => {
  const hotelDetails = await Hotel.findOne({
    hotelId: `${req.params.id}`,
  });
  res.json(hotelDetails);
});

////////////////////////////////////
// POST feedback form
////////////////////////////////////

app.post("/hotel/:id/feedback/create", async (req, res) => {
  const newFeedback = req.body.feedback;

  await Hotel.updateOne(
    { hotelId: `${req.params.id}` },
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
// DELETE feedback
////////////////////////////////////

app.delete("/hotel/:id/feedback/delete/:feedbackId", async (req, res) => {
  await Hotel.updateOne(
    { hotelId: `${req.params.id}` },
    {
      $pull: {
        feedback: { _id: `${req.params.feedbackId}` },
      },
    }
  );
});

////////////////////////////////////
// PUT transaction for room
////////////////////////////////////

app.put("/hotel/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let inDate = req.body.roomSearchData.inDate;
  let outDate = req.body.roomSearchData.outDate;
  let username = req.body.roomSearchData.username;
  let roomType = req.body.roomSearchData.roomType;

  console.log(req.body.roomSearchData.username);
  const hotelDetails = await Hotel.findOne({
    hotelId: `${req.params.id}`,
  });

  hotelDetails.userStayed.push(username);
  hotelDetails.rooms.push({
    inDate: inDate,
    outDate: outDate,
    roomType: roomType,
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

  await Users.updateOne(
    { username: username },
    { $push: { hotelStayed: `${req.params.id}` } }
  );

  res.status(200);
  res.json(hotelDetails);
});

////////////////////////////////////
// GET list of available hotels
////////////////////////////////////

app.get("/hotel/", async (req, res) => {
  let inDate = req.query.inDate;
  let outDate = req.query.outDate;
  let inDateUnix = Date.parse(inDate);
  let outDateUnix = Date.parse(outDate);
  let roomType = req.query.roomType;
  let allHotels = await Hotel.find();

  allHotels = allHotels.filter((singleHotel) => {
    let bookings = singleHotel.rooms.filter(
      (room) => room.roomType === roomType
    );
    // for each of the existing bookings, the logic below checks every booking to see if it overlaps with user's in and out dates
    return (
      bookings.every((booking) => {
        // Date.parse converts the in and out dates to unix for comparison

        console.log(`keyed in booking ${inDateUnix}}`);
        console.log(Date.parse(booking.outDate));

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
    { username: 1, passwordHash: 1, hotelStayed: 1, _id: 0 }
  );
  if (checkUsers.length === 0) {
    req.session.auth = false;
    res.json({ msg: "Username invalid." });
  } else {
    const valid = await bcrypt.compare(
      req.body.password,
      checkUsers[0].passwordHash
    );
    if (valid) {
      req.session.auth = true;
      res.json({
        username: checkUsers[0].username,
        hotelStayed: checkUsers[0].hotelStayed,
      });
    } else {
      req.session.auth = false;
      res.json({ msg: "Password invalid." });
    }
  }
});

////////////////////////////////////
// Create New User
////////////////////////////////////
// remember that username is case-sensitive
app.post("/users/new", async (req, res) => {
  const checkUsername = await Users.find(
    { username: req.body.username },
    { username: 1, _id: 0 }
  );
  if (checkUsername.length === 0) {
    const newPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await Users.create({
      username: req.body.username,
      email: req.body.email,
      passwordHash: newPassword,
    });
    req.session.auth = true;
    res.json({ username: newUser.username, hotelStayed: newUser.hotelStayed });
  } else {
    req.session.auth = false;
    res.json({
      msg: "Username already exists. Login or choose another username.",
    });
  }
});

app.get("/get-hash", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 12);
  res.json(hash);
});

app.listen(5005);
