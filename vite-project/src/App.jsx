import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { useContext, useState } from "react";
import AuthContext from "./context/Auth-context";
import ChannelHome from "./components/chat-application/ChannelHome";
import AppWideContext from "./context/AppWideContext";

function App() {
  const ctx = useContext(AuthContext);

  const [userChannel, setUserChannel] = useState(null);
  const [showNav, setShowNav] = useState(false);

  const contextValue = {
    setUserChannel,
    setShowNav,
    showNav,
    userChannel,
  };
  return (
    <>
      <AppWideContext.Provider value={contextValue}>
        <Routes>
          <Route element={<SignUp />} path="/" />
          {ctx.isLoggedIn && (
            <Route element={<ChannelHome />} path="/channel" />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppWideContext.Provider>
    </>
  );
}

export default App;
