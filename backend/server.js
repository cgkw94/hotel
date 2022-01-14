////////////////////////////////////
// Dependencies
////////////////////////////////////

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./models/db");

////////////////////////////////////
// Models
////////////////////////////////////

const Hotel = require("./models/hotel");
const seedData = require("./models/Seed");

////////////////////////////////////
// Config
////////////////////////////////////

const mongoURI = "mongodb://127.0.0.1:27017/hotel";
connectDB(mongoURI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

////////////////////////////////////
// Connect to Mongo
////////////////////////////////////

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("The connection with mongod is established");
  }
);

////////////////////////////////////
// DataBase
////////////////////////////////////

////////////////////////////////////
// Seed Data
////////////////////////////////////

app.get("/seed", async (req, res) => {
  await Hotel.deleteMany();
  await Hotel.create(seedData);
  const hotelResults = await Hotel.find();
  res.json(hotelResults);
});

////////////////////////////////////
// Hotel Detals
////////////////////////////////////
app.get("/hotel/:id", async (req, res) => {
  const hotelDetails = await Hotel.find({
    hotelId: `${req.params.id}`,
  });
  res.json(hotelDetails);
});

app.listen(5005);
