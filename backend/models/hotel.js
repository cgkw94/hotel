const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    hotelId: { type: Number },
    hotelName: { type: String, required: true },
    hotelImg: { type: String },
    location: { type: String },
    address: { type: String },
    geolocation: { longitude: Number, latitude: Number },
    hotelRating: { type: Number, max: 5 },
    vacancies: { type: Boolean },
    feedback: [{ username: String, userRating: Number, userFeedback: String }],
    amenities: [{ type: String }],
    userStayed: [{ type: String }],
    roomsGeneral: [
      {
        roomType: String,
        maxPax: { type: Number, max: 4 },
        price: Number,
        roomImg: { type: String },
        size: String,
        amenities: [{ type: String }],
      },
    ],
    rooms: [
      {
        inDate: String,
        outDate: String,
        roomType: String,
      },
    ],
  },
  { timestamps: true },
  { collection: "hotels" }
);

const Hotel = mongoose.model("HotelModel", HotelSchema);

module.exports = Hotel;
