import React, { useState } from "react";

const AuthContext = React.createContext({
  users: [],
  token: "",
  email: "",
  isLoggedIn: false,
  emailValue: (token) => {},
  loginWithEmail: (token) => {},
  displayName: "",
  addUsers: () => {},
});
export default AuthContext;

export const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const initialUsers = JSON.parse(localStorage.getItem("users")) || [];

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [users, setUsers] = useState(initialUsers);

  let userIsLoggedIn = !!token;

  const loginWithEmail = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const emailValue = (token) => {
    setEmail(token);
    localStorage.setItem("email", token);
  };

  const addUsers = (user) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, user];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };

  const contextValue = {
    users,
    token,
    isLoggedIn: userIsLoggedIn,
    loginWithEmail,
    email,
    emailValue,
    addUsers,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
