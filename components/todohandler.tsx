import React, { useContext, useEffect } from "react";
import CurrentTodos from "./currentTodos";
import YesterdaysTodos from "./yesterdaysTodos";
import { Page, PageContext } from "../lib/pageContext";

const TodoHandler = () => {
  const { page } = useContext(PageContext);

  useEffect(() => {}, []);

  return (
    <>
      {page === Page.CURRENT && <CurrentTodos />}
      {page === Page.YESTERDAY && <YesterdaysTodos />}
    </>
  );
};

export default TodoHandler;
