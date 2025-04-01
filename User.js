const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  accountActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", UserSchema);
