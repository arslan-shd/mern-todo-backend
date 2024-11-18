const cron = require("node-cron");
const Todo = require("./models/todoModel");
const sendPushNotification = require("./utils/sendPushNotification");

// Schedule a job to run every minute
cron.schedule("* * * * *", async () => {
  console.log("Running reminder check...");
  const now = new Date();

  console.log("the reminderscheduler time of new date()", now);

  try {
    // Find all tasks with reminders due and not notified yet
    const dueTodos = await Todo.find({
      reminder: { $lte: now },
      notified: false,
    });

    for (const todo of dueTodos) {
      console.log(`Reminder: Task "${todo.title}" is due now.`);
      // Send push notification
      await sendPushNotification("Reminder", `Task "${todo.title}" is due!`);

      // Mark the task as notified
      todo.notified = true;
      await todo.save();
    }
  } catch (error) {
    console.error("Error checking reminders:", error);
  }
});

console.log("Reminder scheduler started.");
