const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    accountType: { type: String, default: "Customer" },
    hotelStayed: [{ type: Number }],
    isDeleted: { type: Boolean, default: false }, // when displaying feedback, if user is Deleted, should show a PseudoUsername
  },
  { collection: "hotelusers" }
);

const Users = mongoose.model("UsersModel", UsersSchema);

module.exports = Users;
