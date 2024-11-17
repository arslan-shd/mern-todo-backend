const server = require("./app");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

console.log("Node env set to", process.env.NODE_ENV);

require("./reminderScheduler");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => console.log("Error", err));

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
