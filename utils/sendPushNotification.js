const webPush = require("web-push");
const Subscription = require("../models/subscriptionModel");

// Configure VAPID keys
webPush.setVapidDetails(
  "mailto:your-email@example.com",
  "BOVlE1Aq0kJ6mmVnBxIGbm-n42eax2uvdsjnvDZ6FMWfOavajJ6XLnndmHOHdhaAJM8lP_8CBMnCTi2VAW5pdVI",
  "UGLuBFe75oEZO6ZUJfpyzhduj8iWI6Od4GbbVysdBIM"
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
