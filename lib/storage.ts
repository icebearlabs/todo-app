import { sub } from "date-fns";
import { Todo } from "./types";

const TODOS_KEY = "TODO_APP_TODOS";

interface TodoVault {
  [dateString: string]: Todo[];
}

const getTodayDateString = () => {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

const getYesterdayDateString = () => {
  const date = new Date();
  const yesterday = sub(date, { days: 1 });
  return `${yesterday.getDate()}-${yesterday.getMonth()}-${yesterday.getFullYear()}`;
};

const saveTodos = (todos: Todo[]) => {
  const savedTodos = getTodos();
  const today = getTodayDateString();
  const newTodos = {
    ...savedTodos,
    [today]: todos,
  };
  localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
};

const savePastTodos = (todos: Todo[]) => {
  const savedTodos = getTodos();
  const yesterday = getYesterdayDateString();
  const newTodos = {
    ...savedTodos,
    [yesterday]: todos,
  };
  localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
};

const clearTodos = () => {
  localStorage.removeItem(TODOS_KEY);
};

const cleanupTodos = () => {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  const todos = getTodos();

  /**
   * Remove older todos
   */
  const newTodos = Object.keys(todos).reduce(
    (result: TodoVault, dateKey: string) => {
      if ([today, yesterday].indexOf(dateKey) > -1) {
        result[dateKey] = todos[dateKey];
      }
      return result;
    },
    {}
  );

  localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
};

const getTodos = (): TodoVault => {
  const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
  return todos ?? [];
};

const getCurrentTodos = (): Todo[] => {
  const today = getTodayDateString();
  const todos = getTodos();

  return todos[today];
};

const getYesterdaysTodos = (): Todo[] => {
  const yesterday = getYesterdayDateString();
  const todos = getTodos();

  return todos[yesterday];
};

export const localStorageUtils = {
  saveTodos,
  clearTodos,
  cleanupTodos,
  getCurrentTodos,
  savePastTodos,
  getYesterdaysTodos,
};
