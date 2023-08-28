import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import React, { Suspense, useContext, useState } from "react";
import AuthContext from "./context/Auth-context";
import AppWideContext from "./context/AppWideContext";

import "./app.scss";
import LoadingSpinner from "./components/LoadingSpinner";
const ChannelHome = React.lazy(() =>
  import("./components/chat-application/ChannelHome")
);

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
        <Suspense
          fallback={<div className="spinner">{<LoadingSpinner />}</div>}
        >
          <Routes>
            <Route element={<SignUp />} path="/" />
            {ctx.isLoggedIn && (
              <Route element={<ChannelHome />} path="/channel" />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </AppWideContext.Provider>
    </>
  );
}

export default App;
