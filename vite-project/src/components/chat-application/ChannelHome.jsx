import React, { useState } from "react";
import ChannelPage from "../chat-nav/ChannelPage";
import "../../sass/ChannelHome.scss";
import Welcome from "../../pages/Welcome";

const ChannelHome = () => {
  const [welcome, setWelcome] = useState(true);
  return (
    <>
      <main className="channel-home">
        <ChannelPage setWelcome={setWelcome} />
        {welcome && <Welcome setWelcome={setWelcome} />}
      </main>
    </>
  );
};

export default ChannelHome;
