import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { QUERIES } from "../lib/reactQuery";
import { api } from "../lib/api";
import { v4 } from "uuid";
import { Todo } from "../lib/types";
import { localStorageUtils } from "../lib/storage";
import CheckedIcon from "../public/img/checkboxChecked.svg";
import UncheckedIcon from "../public/img/checkboxUnchecked.svg";
import TrashIcon from "../public/img/trash.svg";
import PlusIcon from "../public/img/plus.svg";

const Todolist = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { data, isSuccess } = useQuery(QUERIES.GET_TODOS, api.getTodos);

  useEffect(() => {
    if (isSuccess && data) {
      setTodos(data);
    }
  }, [data]);

  const handleDelete = (todo: Todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  useEffect(() => {
    if (todos) {
      localStorageUtils.saveTodos(todos);
    }
  }, [todos]);

  const handleAdd = () => {
    setTodos([
      ...todos,
      {
        id: v4(),
        checked: false,
        text: "",
      },
    ]);
  };

  const handleCheck = (todo: Todo) => {
    setTodos(
      todos.reduce((result, td) => {
        if (td.id === todo.id) {
          result.push({
            ...td,
            checked: !td.checked,
          });
        } else {
          result.push(td);
        }

        return result;
      }, [])
    );
  };

  const handleChange = (todo, value) => {
    setTodos(
      todos.reduce((result, td) => {
        if (td.id === todo.id) {
          result.push({ ...todo, text: value });
        } else {
          result.push(td);
        }
        return result;
      }, [])
    );
  };

  return (
    <div className="flex flex-col items-center">
      <ul className="flex flex-col justify-center w-full max-w-xl gap-4">
        {todos.map((todo) => (
          <li className="todoItem" key={`${todo.id}`}>
            <div
              className="w-[24px] h-[24px]"
              onClick={() => handleCheck(todo)}
            >
              {todo.checked ? (
                <CheckedIcon className="fill-blue-400" />
              ) : (
                <UncheckedIcon className="fill-blue-400" />
              )}
            </div>
            <input
              placeholder="add your todo"
              className="flex-1 p-2 text-sm font-medium transition-colors duration-300 md:text-lg ease bg-slate-100 hover:bg-slate-50 focus:outline-none"
              type="text"
              value={todo.text}
              onChange={(e) => handleChange(todo, e.target.value)}
            />
            <TrashIcon
              className="w-[16px] h-[16px] cursor-pointer "
              onClick={() => handleDelete(todo)}
            />
          </li>
        ))}
      </ul>
      <button
        className="w-full max-w-xl mt-4 cursor-pointer todoItem hover:bg-slate-200 focus:bg-slate-200"
        onClick={handleAdd}
      >
        <PlusIcon className="w-[32px] h-[32px]" />
      </button>
    </div>
  );
};

export default Todolist;
