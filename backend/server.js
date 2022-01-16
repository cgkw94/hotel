////////////////////////////////////
// Dependencies
////////////////////////////////////

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./models/db");
const cors = require("cors");

////////////////////////////////////
// Models
////////////////////////////////////

const Hotel = require("./models/hotel");
const seedData = require("./models/Seed");
const Users = require("./models/users");
const usersseed = require("./models/usersseed");

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
// Hotel Room Details
////////////////////////////////////

////////////////////////////////////
// Login to obtain Users Data
////////////////////////////////////
// remember that username is case-sensitive
app.post("/users", async (req, res) => {
  const checkUsers = await Users.find(
    { username: req.body.username },
    { username: 1, hotelStayed: 1, _id: 0 }
  );
  if (checkUsers === []) {
    res.json({ msg: "no users found" });
  } else {
    res.json(checkUsers);
  }
});

app.listen(5005);
