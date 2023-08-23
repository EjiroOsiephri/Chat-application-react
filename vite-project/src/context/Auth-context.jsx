import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  emailValue: (token) => {},
  loginWithEmail: (token) => {},
  displayName: "",
});
export default AuthContext;

export const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);

  let userIsLoggedIn = !!token;

  const loginWithEmail = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const emailValue = (token) => {
    setEmail(token);
    localStorage.setItem("email", token);
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    loginWithEmail,
    email,
    emailValue,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
