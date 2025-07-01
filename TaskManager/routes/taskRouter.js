const express = require('express');
const taskRouter = express.Router();
const taskController = require('../controller/taskController');

taskRouter.get("/",taskController.getIndex);
taskRouter.get("/add-task",taskController.getAddTask);
taskRouter.post("/add-task",taskController.postAddTask);
taskRouter.get("/edit-task/:id",taskController.getEditTask);
taskRouter.post("/edit-task",taskController.postEditTask);
taskRouter.post("/delete-task/:id",taskController.postDeleteTask);

module.exports = taskRouter;