import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  loginWithEmail: (token) => {},
});
export default AuthContext;

export const AuthProvider = (props) => {
  const [token, setToken] = useState(null);

  let userIsLoggedIn = !!token;

  const loginWithEmail = (token) => {
    setToken(token);
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    loginWithEmail,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
