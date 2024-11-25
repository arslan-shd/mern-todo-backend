require("dotenv").config({ path: "./config.env" });
const server = require("./app");
const mongoose = require("mongoose");
const agenda = require("./agendaInstance");
const webPush = require("web-push");
const todoReminderJob = require("./utils/todoReminderJob");

console.log("Node env set to", process.env.NODE_ENV);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

webPush.setVapidDetails(
  "mailto:technosys485@gmail.com",
  process.env.SUBSCRIPTION_PUBLIC_KEY,
  process.env.SUBSCRIPTION_PRIVATE_KEY
);

agenda.define("send-todo-reminder", todoReminderJob);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => console.log("Error", err));

// Start Agenda (now we don't need to initialize it again)

agenda.start();
agenda.on("start", (job) => {
  console.log(`Job ${job.attrs.name} started`);
});

agenda.on("complete", (job) => {
  console.log(`Job ${job.attrs.name} completed`);
});

agenda.on("fail", (err, job) => {
  console.error(`Job ${job.attrs.name} failed with error: ${err.message}`);
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = agenda;
