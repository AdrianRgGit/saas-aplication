const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    login_token: {
      type: String,
      required: true,
    },

    user_id: {
      type: ObjectId,
      red: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;
