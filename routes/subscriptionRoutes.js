const express = require("express");
const Subscription = require("../models/subscriptionModel");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();
    res.status(201).json({ message: "Subscription saved." });
  } catch (error) {
    res.status(500).json({ error: "Failed to save subscription." });
  }
});

// Endpoint to check if the subscription already exists
router.post("/check", async (req, res) => {
  const { endpoint } = req.body;
  const subscriptionExists = await Subscription.exists({ endpoint });
  res.json({ exists: !!subscriptionExists });
});

// Endpoint to save new subscriptions
router.post("/", async (req, res) => {
  const { endpoint, keys } = req.body;

  // Avoid duplicates
  const existingSubscription = await Subscription.findOne({ endpoint });
  if (!existingSubscription) {
    const newSubscription = new Subscription({ endpoint, keys });
    await newSubscription.save();
    res.status(201).json({ message: "Subscription saved successfully." });
  } else {
    res.status(200).json({ message: "Subscription already exists." });
  }
});

module.exports = router;
