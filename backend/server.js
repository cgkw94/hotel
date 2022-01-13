// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Hotel = require("./models/hotel");
const seedData = require("./models/Seed");
const connectDB = require("./models/db");

const mongoURI = "mongodb://127.0.0.1:27017/hotel";
connectDB(mongoURI);

// Connect to Mongo
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("The connection with mongod is established");
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/seed", async (req, res) => {
  await Hotel.deleteMany({});
  await Hotel.create(seedData);
  const hotelResults = await Hotel.find({});
  res.json(hotelResults);
});

// ignore first
// app.post("/feedback", (req, res) => {
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`
//   );
// });

app.listen(5005);
