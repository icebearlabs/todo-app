import React, { useContext } from "react";
import { Page, PageContext } from "../lib/pageContext";
import Todolist from "./todolist";

const CurrentTodos = () => {
  const { setPage } = useContext(PageContext);

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="pb-8 text-center headline flex-0">Your todos</h1>
      <div className="flex-1">
        <Todolist />
      </div>
      <div className="flex justify-end flex-0">
        <label
          className="flex items-center gap-2 pt-8 cursor-pointer hover:opacity-70"
          onClick={() => setPage(Page.YESTERDAY)}
        >
          Yesterday&apos;s Todos
          <picture className="w-[12px] h-[12px] -mt-[2px]">
            <img src="/img/arrow-right.svg" />
          </picture>
        </label>
      </div>
    </div>
  );
};

export default CurrentTodos;
