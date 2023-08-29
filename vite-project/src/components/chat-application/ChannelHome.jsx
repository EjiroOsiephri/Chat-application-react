import React, { useContext, useState } from "react";
import ChannelPage from "../chat-nav/ChannelPage";
import "../../sass/ChannelHome.scss";
import Welcome from "../../pages/Welcome";
import UserChannelPage from "../chat-nav/UserChannelPage";
import AppWideContext from "../../context/AppWideContext";

const ChannelHome = () => {
  const [welcome, setWelcome] = useState(true);

  const ctx = useContext(AppWideContext);

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
        ) : (
          <UserChannelPage />
        )}
      </main>
    </>
  );
};

export default ChannelHome;
