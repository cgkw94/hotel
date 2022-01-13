module.exports = [
  {
    hotelId: 1,
    hotelName: "Conrad Centennial Singapore",
    hotelImg: "",
    location: "Marina Bay",
    address: "Two Temasek Boulevard, Marina Bay, 038982 Singapore",
    geolocation: { longitude: 103.8587261, latitude: 1.2934379 },
    hotelRating: 4.9,
    vacancies: true,
    feedback: [
      {
        username: "Jasmine",
        userRating: 9.6,
        userFeedback: "Good staycation option",
      },
      {
        username: "Nicolaas",
        userRating: 10,
        userFeedback: "Excellent staycation weekend !",
      },
      {
        username: "Swee",
        userRating: 9.0,
        userFeedback:
          "Fantastic service and experience, although slightly pricey",
      },
      {
        username: "Patrick",
        userRating: 10,
        userFeedback: "have a wonderful stay in a luxurious hotel",
      },
      {
        username: "Rajan",
        userRating: 10,
        userFeedback:
          "Fantastic service and experience, although slightly pricey",
      },
      {
        username: "Norman",
        userRating: 8.0,
        userFeedback: "we had enjoyable time staying at Conrad",
      },
      {
        username: "Lee",
        userRating: 8.0,
        userFeedback: "Very good",
      },
      {
        username: "Cheryl",
        userRating: 8.0,
        userFeedback: "Is an enjoyable stay in Conrad",
      },
    ],
    amenities: [
      "Swimming Pool",
      "Free Wifi",
      "Non-Smoking Rooms",
      "Free Parking",
      "Bar",
      "Gym",
    ],
    userStayed: [
      "Jasmin",
      "Cheryl",
      "Lee",
      "Rajan",
      "Patrick",
      "Swee",
      "Nicolaas",
    ],
    roomsGeneral: [
      {
        roomType: "Deluxe",
        maxPax: 2,
        price: 450,
        roomImg: "",
        size: "40 sqf",
        amenities: ["Minibar", "Safe Deposit Box", "Closet"],
      },
      {
        roomType: "Grand Deluxe",
        maxPax: 3,
        price: 600,
        roomImg: "",
        size: "55sqf",
        amenities: [
          "Minibar",
          "Safe Deposit Box",
          "Closet",
          "Bathtub",
          "Coffee Machine",
        ],
      },
      {
        roomType: "Suite",
        maxPax: 4,
        price: 1000,
        roomImg: "",
        size: "55sqf",
        amenities: [
          "Minibar",
          "Safe Deposit Box",
          "Closet",
          "Bathtub",
          "Coffee Machine",
          "Wake up service/Alarm clock",
          "Butler Service",
        ],
      },
    ],
    // rooms: [
    //   {
    //     datesBooked: [{ date: String, occupied: Boolean }], //array filters}
    //     roomNumber: Number,
    //     roomType: String,
    //   },
    // ],
  },
  // {
  //   hotelId: 2,
  //   hotelName: "lyf Farrer Park Singapore by Ascott",
  //   hotelImg: "",
  //   location: "Farrer Park",
  //   address: "15 Stamford Road , City Hall, 178906 Singapore",
  //   geolocation: { longitude: 103.851299277575, latitude: 1.29390281870928 },
  //   hotelRating: 4.4,
  //   vacancies: true,
  //   feedback: [
  //     {
  //       username: "Kah",
  //       userRating: 9.0,
  //       userFeedback: "Amazin",
  //     },
  //     {
  //       username: "Kevin",
  //       userRating: 9,
  //       userFeedback: "Overall and enjoyable stay in a centralized location",
  //     },
  //     {
  //       username: "Gerald",
  //       userRating: 10,
  //       userFeedback:
  //         "We did a staycation for New Year’s Eve. The hotel is well appointed, luxurious, and stuff work hard to make you happy.",
  //     },
  //     {
  //       username: "Maria",
  //       userRating: 9.0,
  //       userFeedback:
  //         "will definitely want to stay again but this time to explore and enjoy the amenities",
  //     },
  //     {
  //       username: "Shirley",
  //       userRating: 10,
  //       userFeedback: "It was a good break. Great discovery - 15 Stamford",
  //     },
  //     {
  //       username: "Jocelyn",
  //       userRating: 8.6,
  //       userFeedback: "Excellent service and good location",
  //     },
  //     {
  //       username: "Anna",
  //       userRating: 9.2,
  //       userFeedback:
  //         "Perfect Place for a Quiet Staycation. Excellent Service.",
  //     },
  //     {
  //       username: "Salim",
  //       userRating: 8.8,
  //       userFeedback: "I’ll be back",
  //     },
  //   ],
  //   amenities: [
  //     "Swimming Pool",
  //     "Free Wifi",
  //     "Non-Smoking Rooms",
  //     "Free Parking",
  //     "Bar",
  //     "Gym",
  //     "Spa and wellness centre",
  //     "Restaurant",
  //   ],
  //   userStayed: [
  //     "Kah",
  //     "Kevin",
  //     "Gerald",
  //     "Maria",
  //     "Shirley",
  //     "Jocelyn",
  //     "Anna",
  //     "Salim",
  //   ],
  //   roomsGeneral: [
  //     {
  //       roomType: "Deluxe",
  //       maxPax: 2,
  //       price: 450,
  //       roomImg: "",
  //       size: "43 sqf",
  //       amenities: ["Minibar", "Safe Deposit Box", "Closet"],
  //     },
  //     {
  //       roomType: "Grand Deluxe",
  //       maxPax: 3,
  //       price: 730,
  //       roomImg: "",
  //       size: "52 sqf",
  //       amenities: [
  //         "Minibar",
  //         "Safe Deposit Box",
  //         "Closet",
  //         "Bathtub",
  //         "Coffee Machine",
  //       ],
  //     },
  //     {
  //       roomType: "Suite",
  //       maxPax: 4,
  //       price: 1250,
  //       roomImg: "",
  //       size: "58 sqf",
  //       amenities: [
  //         "Minibar",
  //         "Safe Deposit Box",
  //         "Closet",
  //         "Bathtub",
  //         "Coffee Machine",
  //         "Wake up service/Alarm clock",
  //         "Butler Service",
  //       ],
  //     },
  //   ],
  //   // rooms: [
  //   //   {
  //   //     datesBooked: [{ date: String, occupied: Boolean }], //array filters}
  //   //     roomNumber: Number,
  //   //     roomType: String,
  //   //   },
  //   // ],
  // },
  // {
  //   hotelId: 2,
  //   hotelName: "lyf Farrer Park Singapore by Ascott",
  //   hotelImg: "",
  //   location: "Farrer Park",
  //   address: "15 Stamford Road , City Hall, 178906 Singapore",
  //   geolocation: { longitude: 103.851299277575, latitude: 1.29390281870928 },
  //   hotelRating: 4.4,
  //   vacancies: true,
  //   feedback: [
  //     {
  //       username: "Kah",
  //       userRating: 9.0,
  //       userFeedback: "Amazin",
  //     },
  //     {
  //       username: "Kevin",
  //       userRating: 9,
  //       userFeedback: "Overall and enjoyable stay in a centralized location",
  //     },
  //     {
  //       username: "Gerald",
  //       userRating: 10,
  //       userFeedback:
  //         "We did a staycation for New Year’s Eve. The hotel is well appointed, luxurious, and stuff work hard to make you happy.",
  //     },
  //     {
  //       username: "Maria",
  //       userRating: 9.0,
  //       userFeedback:
  //         "will definitely want to stay again but this time to explore and enjoy the amenities",
  //     },
  //     {
  //       username: "Shirley",
  //       userRating: 10,
  //       userFeedback: "It was a good break. Great discovery - 15 Stamford",
  //     },
  //     {
  //       username: "Jocelyn",
  //       userRating: 8.6,
  //       userFeedback: "Excellent service and good location",
  //     },
  //     {
  //       username: "Anna",
  //       userRating: 9.2,
  //       userFeedback:
  //         "Perfect Place for a Quiet Staycation. Excellent Service.",
  //     },
  //     {
  //       username: "Salim",
  //       userRating: 8.8,
  //       userFeedback: "I’ll be back",
  //     },
  //   ],
  //   amenities: [
  //     "Swimming Pool",
  //     "Free Wifi",
  //     "Non-Smoking Rooms",
  //     "Free Parking",
  //     "Bar",
  //     "Gym",
  //     "Spa and wellness centre",
  //     "Restaurant",
  //   ],
  //   userStayed: [
  //     "Kah",
  //     "Kevin",
  //     "Gerald",
  //     "Maria",
  //     "Shirley",
  //     "Jocelyn",
  //     "Anna",
  //     "Salim",
  //   ],
  //   roomsGeneral: [
  //     {
  //       roomType: "Deluxe",
  //       maxPax: 2,
  //       price: 450,
  //       roomImg: "",
  //       size: "43 sqf",
  //       amenities: ["Minibar", "Safe Deposit Box", "Closet"],
  //     },
  //     {
  //       roomType: "Grand Deluxe",
  //       maxPax: 3,
  //       price: 730,
  //       roomImg: "",
  //       size: "52 sqf",
  //       amenities: [
  //         "Minibar",
  //         "Safe Deposit Box",
  //         "Closet",
  //         "Bathtub",
  //         "Coffee Machine",
  //       ],
  //     },
  //     {
  //       roomType: "Suite",
  //       maxPax: 4,
  //       price: 1250,
  //       roomImg: "",
  //       size: "58 sqf",
  //       amenities: [
  //         "Minibar",
  //         "Safe Deposit Box",
  //         "Closet",
  //         "Bathtub",
  //         "Coffee Machine",
  //         "Wake up service/Alarm clock",
  //         "Butler Service",
  //       ],
  //     },
  //   ],
  //   // rooms: [
  //   //   {
  //   //     datesBooked: [{ date: String, occupied: Boolean }], //array filters}
  //   //     roomNumber: Number,
  //   //     roomType: String,
  //   //   },
  //   // ],
  // },
];
