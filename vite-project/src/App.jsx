import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import React, { Suspense, useContext, useState } from "react";
import AuthContext from "./context/Auth-context";
import AppWideContext from "./context/AppWideContext";

import "./app.scss";
import LoadingSpinner from "./components/LoadingSpinner";
import Module from "./components/Modal";
import VideoCall from "./video/VideoCall";
const ChannelHome = React.lazy(() =>
  import("./components/chat-application/ChannelHome")
);

function App() {
  const ctx = useContext(AuthContext);

  const [userChannel, setUserChannel] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [channel, setNewChannel] = useState(false);
  const [getState, setState] = useState(null);
  const [newChannel, setChannels] = useState(null);

  const contextValue = {
    setUserChannel,
    setShowNav,
    showNav,
    imgSrc,
    setImgSrc,
    userChannel,
    channel,
    setNewChannel,
    getState,
    newChannel,
    setChannels,
    setState,
  };

  const [inCall, setInCall] = useState(false);
  const navigate = useNavigate();

  function joinVideo() {
    setInCall(true);
    navigate("/call");
  }

  return (
    <>
      <button onClick={joinVideo}>Join</button>
      <AppWideContext.Provider value={contextValue}>
        {channel && <Module />}
        <Suspense
          fallback={<div className="spinner">{<LoadingSpinner />}</div>}
        >
          <Routes>
            <Route element={<SignUp />} path="/" />
            <Route
              element={
                inCall ? <VideoCall setInCall={setInCall} /> : "waiting to join"
              }
              path="/call"
            />
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
