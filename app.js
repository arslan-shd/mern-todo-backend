const express = require("express");
const cors = require("cors");
const todosRouter = require("./routes/todoRoutes");
const usersRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/v1/todos", todosRouter);
app.use("/api/v1/users", usersRouter);
app.use(globalErrorHandler);

module.exports = app;
