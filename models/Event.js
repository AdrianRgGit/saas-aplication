const mongoose = require("mongoose");
const UserSchema = mongoose.UserSchema;

const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    userId: { type: UserSchema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
