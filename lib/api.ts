import { localStorageUtils } from "./storage";
import { Todo } from "./types";

const getTodos = async (): Promise<Todo[]> => {
  const todos = localStorageUtils.getCurrentTodos();
  return Promise.resolve(todos);
};

const getPastTodos = async (): Promise<Todo[]> => {
  const todos = localStorageUtils.getYesterdaysTodos();
  return Promise.resolve(todos);
};

const saveTodos = async (todos: Todo[]) => {
  localStorageUtils.saveTodos(todos);
  return Promise.resolve();
};

const savePastTodos = async (todos: Todo[]) => {
  localStorageUtils.savePastTodos(todos);
  return Promise.resolve();
};

export const api = {
  getTodos,
  getPastTodos,
  saveTodos,
  savePastTodos,
};
