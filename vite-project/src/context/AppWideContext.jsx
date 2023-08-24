import React from "react";

const AppWideContext = React.createContext({
  displayName: "",
  addUsers: () => {},
});
export default AppWideContext;
