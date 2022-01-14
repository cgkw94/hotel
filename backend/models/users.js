const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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
        roomImg: { type: String }, // const imgURL = "https://imgur.com"  /xxxxxx
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

const Hotel = mongoose.model("HotelModel", HotelSchema);

module.exports = Hotel;
