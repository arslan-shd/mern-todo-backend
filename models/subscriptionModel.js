const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  // user_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: false,
  //   ref: "User",
  // },
  user_id: {
    type: String,
    required: true,
  },
  endpoint: String,
  keys: {
    p256dh: String,
    auth: String,
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
