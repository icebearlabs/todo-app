import { localStorageUtils } from "./storage";
import { Todo } from "./types";

const getTodos = async (): Promise<Todo[]> => {
  const todos = localStorageUtils.getTodos();
  return Promise.resolve(todos);
};

const saveTodos = async (todos: Todo[]) => {
  localStorageUtils.saveTodos(todos);
  return Promise.resolve();
};

export const api = {
  getTodos,
  saveTodos,
};
