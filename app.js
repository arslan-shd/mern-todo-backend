const express = require("express");
const cors = require("cors");
const path = require("path");
const todosRouter = require("./routes/todoRoutes");
const usersRouter = require("./routes/userRoutes");
const subscriptionsRouter = require("./routes/subscriptionRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(
  cors({
    // origin: process.env.CLIENT_URL,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/todos", todosRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/subscribe", subscriptionsRouter);
app.use(globalErrorHandler);

module.exports = app;
