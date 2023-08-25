import React, { useState } from "react";
import ChannelPage from "../chat-nav/ChannelPage";
import "../../sass/ChannelHome.scss";
import Welcome from "../../pages/Welcome";
import UserChannelPage from "../chat-nav/UserChannelPage";

const ChannelHome = () => {
  const [welcome, setWelcome] = useState(true);

  return (
    <>
      <main className="channel-home">
        <div>
          <ChannelPage setWelcome={setWelcome} />
        </div>
        {welcome ? <Welcome setWelcome={setWelcome} /> : <UserChannelPage />}
      </main>
    </>
  );
};

export default ChannelHome;
