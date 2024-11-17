const cron = require("node-cron");
const Todo = require("./models/todoModel");

// Schedule a job to run every minute
cron.schedule("* * * * *", async () => {
  console.log("Running reminder check...");
  const now = new Date();
  const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000); // Adjust to UTC

  console.log("UTC adjusted time:", utcNow.toISOString());

  try {
    const dueTodos = await Todo.find({
      reminder: { $lte: utcNow },
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
