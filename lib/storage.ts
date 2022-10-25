import { Todo } from "./types";

const TODOS_KEY = "TODO_APP_TODOS";

const saveTodos = (todos: Todo[]) => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

const clearTodos = () => {
  localStorage.removeItem(TODOS_KEY);
};

const getTodos = (): Todo[] => {
  return JSON.parse(localStorage.getItem(TODOS_KEY));
};

export const localStorageUtils = {
  saveTodos,
  clearTodos,
  getTodos,
};
