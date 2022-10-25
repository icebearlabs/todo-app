import React from "react";

export enum Page {
  CURRENT= "CURRENT",
  YESTERDAY= "YESTERDAY",
};

export const PageContext = React.createContext({
  page: Page.CURRENT,
  setPage: (page: Page) => {},
});
