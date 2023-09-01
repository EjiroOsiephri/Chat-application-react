import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import React, { Suspense, useContext, useState } from "react";
import AuthContext from "./context/Auth-context";
import AppWideContext from "./context/AppWideContext";
import "./app.scss";
import LoadingSpinner from "./components/LoadingSpinner";
import Module from "./components/Modal";
import NewChannelContainer from "./pages/NewChannelContainer";
const ChannelHome = React.lazy(() =>
  import("./components/chat-application/ChannelHome")
);
const VideoCall = React.lazy(() => import("./video/VideoCall"));

function App() {
  const ctx = useContext(AuthContext);

  const [userChannel, setUserChannel] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [channel, setNewChannel] = useState(false);
  const [getState, setState] = useState(null);
  const [newChannel, setChannels] = useState(null);
  const [overideWelcome, setOverideWelcome] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [defaultChannel, setDefault] = useState(false);
  const [inCall, setInCall] = useState(false);

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
    overideWelcome,
    setOverideWelcome,
    newChannelName,
    setNewChannelName,
    defaultChannel,
    setDefault,
    setInCall,
  };

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <AppWideContext.Provider value={contextValue}>
        {channel && <Module />}
        <Suspense
          fallback={<div className="spinner">{<LoadingSpinner />}</div>}
        >
          <Routes>
            <Route element={<SignUp />} path="/" />
            <Route element={<NewChannelContainer />} path="/new" />
            <Route
              element={
                <div style={{ height: "100%" }}>
                  {inCall && <VideoCall setInCall={setInCall} />}
                </div>
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
    </div>
  );
}

export default App;
