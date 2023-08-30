import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import React, { Suspense, useContext, useState } from "react";
import AuthContext from "./context/Auth-context";
import AppWideContext from "./context/AppWideContext";
import "./app.scss";
import LoadingSpinner from "./components/LoadingSpinner";
import Module from "./components/Modal";
const ChannelHome = React.lazy(() =>
  import("./components/chat-application/ChannelHome")
);
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../src/api/Api";
import ReactPlayer from "react-player";

function JoinScreen({ getMeetingAndToken }) {
  return null;
}

function ParticipantView(props) {
  return null;
}

function Controls(props) {
  return null;
}

function MeetingView(props) {
  return null;
}

function App() {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  const ctx = useContext(AuthContext);
  const [userChannel, setUserChannel] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [channel, setNewChannel] = useState(false);
  const [getState, setState] = useState(null);
  const [newChannel, setChannels] = useState(null);
  const [overideWelcome, setOverideWelcome] = useState(false);

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
    setOverideWelcome,
    overideWelcome,
  };
  return (
    <>
      {authToken && meetingId ? (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
            name: "C.V. Raman",
          }}
          token={authToken}
        >
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        </MeetingProvider>
      ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
      )}
      <AppWideContext.Provider value={contextValue}>
        {channel && <Module />}
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
