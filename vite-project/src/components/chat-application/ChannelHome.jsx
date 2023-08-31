import React, { useContext, useState, useEffect } from "react";
import ChannelPage from "../chat-nav/ChannelPage";
import "../../sass/ChannelHome.scss";
import Welcome from "../../pages/Welcome";
import NewChannel from "../../pages/NewChannel";
import UserChannelPage from "../chat-nav/UserChannelPage";
import AppWideContext from "../../context/AppWideContext";

const ChannelHome = () => {
  const [welcome, setWelcome] = useState(true);

  const [shouldRenderUserChannel, setShouldRenderUserChannel] = useState(false);

  const ctx = useContext(AppWideContext);

  useEffect(() => {
    setShouldRenderUserChannel(true);
  }, [ctx?.newChannelName, ctx?.userChannel?.displayName]);

  return (
    <>
      <main className="channel-home">
        <div
          style={
            ctx.showNav
              ? {
                  display: "block",
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
          <NewChannel />
        )}
      </main>
    </>
  );
};

export default ChannelHome;
