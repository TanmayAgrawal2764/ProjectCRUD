import React from "react";
import "./utils/styles/App.css";
import {QueryClient, QueryClientProvider} from "react-query";
import Main from "./pages/index.js";
const App = ({}) => {
  const queryClient = new QueryClient();
  return /* @__PURE__ */ React.createElement(QueryClientProvider, {
    client: queryClient
  }, /* @__PURE__ */ React.createElement(Main, null));
};
export default App;
