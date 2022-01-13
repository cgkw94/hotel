// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Hotel = require("./models/hotel");
const seedData = require("./models/Seed");

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
  await Product.deleteMany({});
  await Product.create(seedData);
  res.send("Seed data created");
});

app.listen(5001);
