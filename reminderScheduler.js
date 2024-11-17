const cron = require("node-cron");
const Todo = require("./models/todoModel");

// Schedule a job to run every minute
cron.schedule("* * * * *", async () => {
  console.log("Running reminder check...");
  const now = new Date().toISOString(); // Convert to ISO format
  console.log("Cron ISO time:", now);

  try {
    const dueTodos = await Todo.find({
      reminder: { $lte: new Date(now) },
      // Convert ISO string back to Date for MongoDB query
      notified: false,
    });

    for (const todo of dueTodos) {
      console.log(`Reminder: Task "${todo.title}" is due now.`);

      // Mark the task as notified
      todo.notified = true;
      await todo.save();
    }
  } catch (error) {
    console.error("Error checking reminders:", error);
  }
});

console.log("Reminder scheduler started.");
