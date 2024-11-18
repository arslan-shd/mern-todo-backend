const express = require("express");
const Subscription = require("../models/subscriptionModel");
const router = express.Router();

router.post("/subscribe", async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();
    res.status(201).json({ message: "Subscription saved." });
  } catch (error) {
    res.status(500).json({ error: "Failed to save subscription." });
  }
});

module.exports = router;
