const express = require("express");
const Subscription = require("../models/subscriptionModel");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

// router.post("/", async (req, res) => {
//   try {
//     const subscription = new Subscription({
//       ...req.body,
//       user_id: req.user._id,
//     });

//     console.log("user Id", req.user._id);
//     await subscription.save();
//     res.status(201).json({ message: "Subscription saved." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to save subscription." });
//   }
// });

// Endpoint to check if the subscription already exists
router.post("/check", async (req, res) => {
  const { endpoint } = req.body;
  const subscriptionExists = await Subscription.exists({ endpoint });
  res.json({ exists: !!subscriptionExists });
});

// Endpoint to save new subscriptions
router.post("/", async (req, res) => {
  console.log("/Subscribe route run");
  const { endpoint, keys } = req.body;
  const { user_id } = req.user._id;

  // Avoid duplicates
  const existingSubscription = await Subscription.findOne({
    user_id,
    endpoint,
  });

  if (!existingSubscription) {
    const newSubscription = new Subscription({ user_id, endpoint, keys });
    await newSubscription.save();
    res.status(201).json({ message: "Subscription saved successfully." });
  } else {
    res.status(200).json({ message: "Subscription already exists." });
  }
});

module.exports = router;
