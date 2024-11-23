const agenda = require("../agendaInstance");
const Todo = require("../models/todoModel");
const webPush = require("web-push");

const todoReminderJob = async (job) => {
  const { todoId } = job.attrs.data;

  try {
    // Fetch the todo with its subscription data
    const todo = await Todo.findById(todoId);

    if (todo && todo.subscription) {
      // Use web-push to send the notification
      const payload = JSON.stringify({
        title: "Tickit Reminder",
        body: `Don't forget: ${todo.title}`,
        // icon: "https://mern-todo-backend-tc9t.onrender.com/notification-icon.png", // Optional icon for the notification
      });

      console.log(payload, "this is the payload");

      await webPush.sendNotification(todo.subscription, payload);
      console.log("Notification sent for todo:", todo.title);

      // Delete the associated Agenda job once the notification is sent
      await agenda.cancel({ "data.todoId": todoId });
      console.log(
        `Agenda job for todo ${todoId} deleted after sending notification.`
      );
    } else {
      console.error("Todo or subscription not found");
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

module.exports = todoReminderJob;
