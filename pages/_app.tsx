import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Page, PageContext } from "../lib/pageContext";
import "../styles/globals.scss";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }) => {
  const [page, setPage] = useState(Page.CURRENT);

  return (
    <QueryClientProvider client={queryClient}>
      <PageContext.Provider value={{ page, setPage }}>
        <Component {...pageProps} />
      </PageContext.Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
