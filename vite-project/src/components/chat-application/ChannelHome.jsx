import React, { useContext, useState, useEffect } from "react";
import ChannelPage from "../chat-nav/ChannelPage";
import "../../sass/ChannelHome.scss";
import Welcome from "../../pages/Welcome";
import NewChannel from "../../pages/NewChannel";
import UserChannelPage from "../chat-nav/UserChannelPage";
import AppWideContext from "../../context/AppWideContext";

const ChannelHome = () => {
  const [welcome, setWelcome] = useState(true);

  const ctx = useContext(AppWideContext);

  useEffect(() => {
    setWelcome(true);
  }, [ctx?.userChannel?.displayName]);

  return (
    <>
      <main className="channel-home">
        <div
          style={
            ctx.showNav
              ? {
                  display: "block",
                  left: "0",
                  transition: "opacity 1s ease-in-out",
                }
              : {}
          }
        >
          <ChannelPage welcome={welcome} setWelcome={setWelcome} />
        </div>
        {welcome ? (
          <Welcome welcome={welcome} setWelcome={setWelcome} />
        ) : ctx?.userChannel?.displayName ? (
          <UserChannelPage />
        ) : (
          <Welcome welcome={welcome} setWelcome={setWelcome} />
        )}
      </main>
    </>
  );
};

export default ChannelHome;
