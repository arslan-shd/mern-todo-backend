const express = require("express");
const cors = require("cors");
const todosRouter = require("./routes/todoRoutes");
const usersRouter = require("./routes/userRoutes");
const subscriptionsRouter = require("./routes/subscriptionRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.use("/api/v1/todos", todosRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/", subscriptionsRouter);
app.use(globalErrorHandler);

`${import.meta.env.VITE_API_URL}/api/v1/subscribe`;

module.exports = app;
