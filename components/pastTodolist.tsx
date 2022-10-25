import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../lib/api";
import { QUERIES } from "../lib/reactQuery";
import { Todo } from "../lib/types";
import ArrowRightIcon from "../public/img/arrow-right.svg";
import SmileIcon from "../public/img/smile.svg";

const PastTodolist = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { data, isSuccess } = useQuery(
    QUERIES.GET_PAST_TODOS,
    api.getPastTodos
  );

  const currentTodoResult = useQuery(QUERIES.GET_TODOS, api.getTodos);

  useEffect(() => {
    if (isSuccess && data) {
      setTodos(data);
    }
  }, [data]);

  const handleClick = (todo: Todo) => {
    const pastTodos = todos.filter((td) => td.id !== todo.id);
    const currentTodos = currentTodoResult.data;
    setTodos(pastTodos);
    api.saveTodos([...currentTodos, todo]);
    api.savePastTodos(pastTodos);
  };

  return (
    <div className="flex flex-col items-center">
      <ul className="flex flex-col justify-center w-full max-w-xl gap-4">
        {todos?.length > 0 &&
          todos.map((todo) => (
            <li
              className="cursor-pointer todoItem"
              key={`${todo.id}`}
              onClick={() => handleClick(todo)}
            >
              <label className="flex-1">{todo.text}</label>
              <ArrowRightIcon className="w-[24px] h-[24px]" />
            </li>
          ))}
        {todos?.length === 0 && (
          <div className="flex flex-col h-[300px] justify-center rounded-md items-center bg-blue-200 shadow-sm gap-8">
            <SmileIcon className="fill-slate-500 w-[48px] h-[48px]" />
            <label className="px-4 text-center text-slate-500">
              You don't have any left over todos from yesterday
            </label>
          </div>
        )}
      </ul>
    </div>
  );
};

export default PastTodolist;
