const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    hotelName: { type: String, required: true },
    hotelImg: { type: String },
    location: { type: String },
    address: { type: String },
    geolocation: { longitude: Number, latitude: Number },
    hotelRating: { type: Number, max: 5 },
    vacancies: { type: Boolean },
    feedback: [
      {
        fbId: Number,
        username: String,
        userRating: Number, // max:10
        userFeedback: String,
      },
    ],
    amenities: [{ type: String }],
    userStayed: [{ type: String }],
    roomsGeneral: [
      {
        roomType: String,
        maxPax: { type: Number, max: 4 },
        price: Number,
        roomImg: [{ type: String }], // const imgURL = "https://imgur.com"  /xxxxxx
        size: String,
        amenities: [{ type: String }], // coffee maker, safe deposit box, couch, Netflix, bathtub
      },
    ],
    rooms: [
      {
        datesBooked: [{ date: String, occupied: Boolean }], //array filters}
        roomNumber: Number,
        roomType: String,
      },
    ],
  },
  { timestamps: true },
  { collection: "hotels" }
);

const HotelModel = mongoose.model("HotelModel", HotelSchema);

module.exports = HotelModel;
