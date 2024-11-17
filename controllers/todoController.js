const Todo = require("../models/todoModel");
const catchAsync = require("../utils/catchAsync");

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
  const { title, description, priority, dueDate, reminder } = req.body;
  const newTodo = await Todo.create({
    title,
    description,
    priority,
    dueDate,
    reminder,
    user_id,
  });

  try {
    res.status(200).json({
      status: "success",
      data: {
        todos: newTodo,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err: "Cannot Add workout",
    });
  }
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
  res.status(204).json({
    status: "success",
    data: null,
  });
});
