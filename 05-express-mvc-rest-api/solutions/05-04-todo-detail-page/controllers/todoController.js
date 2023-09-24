import moment from "moment";
import { list, addItem, markDone } from "../models/todo";

export const findTodo = (req, res) => {
  const todoId = req.params.todoId;
  const todo = find(todoId);

  res.render("todo-detail.ejs", { todo });
};

export const listTodos = (req, res) => {
  const errorCode = req.query.errorCode;
  const todos = list();

  const formattedTodos = todos.map((todo) => {
    return {
      ...todo,
      formattedCreatedAt: moment(todo.createdAt).fromNow(),
    };
  });

  res.render("todo-list.ejs", { todos: formattedTodos, errorCode });
};

export const createTodo = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const errorCode = addItem(title, description);

  if (errorCode) {
    res.redirect(`/todos?errorCode=${errorCode}`);
    return;
  }
  res.redirect("/todos");
};

export const updateTodoAsDone = (req, res) => {
  markDone(req.params.todoIndex);

  res.redirect("/todos");
};
