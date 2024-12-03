const Todo = require("../models/todoModel");
const catchAsync = require("../utils/catchAsync");
const agenda = require("../agendaInstance");

exports.getAllTodos = catchAsync(async (req, res) => {
  const user_id = req.user._id;

  const todos = await Todo.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    results: todos.length,
    data: {
      todos,
    },
  });
});

exports.getTodo = catchAsync(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
});

exports.createTodo = catchAsync(async (req, res) => {
  const user_id = req.user._id;
  // const newTodo = await Todo.create({ ...req.body, user_id });
  const { title, description, priority, dueDate, reminder, subscription } =
    req.body;

  const newTodo = await Todo.create({
    title,
    description,
    priority: priority || "low",
    dueDate,
    ...(reminder && { reminder }), // Include reminder only if it has a value
    user_id,
    subscription,
  });

  // Schedule the push notification with Agenda.js

  if (reminder) {
    await agenda.schedule(new Date(reminder), "send-todo-reminder", {
      todoId: newTodo._id,
      userId: user_id,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      todos: newTodo,
    },
  });
});

exports.updateTodo = catchAsync(async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
});

exports.deleteTodo = catchAsync(async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);

  // // Remove the associated Agenda job
  // const jobs = await agenda.jobs({ "data.todoId": req.params.id });

  // if (jobs.length > 0) {
  //   // Cancel the job using its internal job _id
  //   await jobs[0].remove(); // Remove the first job matching the query
  //   console.log(`Job for todoId ${id} removed.`);
  // } else {
  //   console.log(`No job found for todoId ${id}.`);
  // }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
