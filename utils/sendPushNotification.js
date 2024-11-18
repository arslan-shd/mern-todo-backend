const webPush = require("web-push");
const Subscription = require("../models/subscriptionModel");

// Configure VAPID keys
webPush.setVapidDetails(
  "mailto:technosys485@gmail.com",
  process.env.SUBSCRIPTION_PUBLIC_KEY,
  process.env.SUBSCRIPTION_PRIVATE_KEY
);

async function sendPushNotification(title, body) {
  const subscriptions = await Subscription.find();

  subscriptions.forEach((subscription) => {
    const payload = JSON.stringify({ title, body });

    webPush
      .sendNotification(subscription, payload)
      .then(() => console.log("Notification sent"))
      .catch((err) => console.error("Error sending notification", err));
  });
}

module.exports = sendPushNotification;
