const express = require("express");
const todosController = require("../controllers/todoController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all routes
router.use(requireAuth);

router
  .route("/")
  .get(todosController.getAllTodos)
  .post(todosController.createTodo);
router
  .route("/:id")
  .get(todosController.getTodo)
  .patch(todosController.updateTodo)
  .delete(todosController.deleteTodo);

module.exports = router;
