import React, { useState } from "react";
import "../sass/ChannelHome.scss";
import ChannelPage from "../components/chat-nav/ChannelPage";
import NewChannel from "./NewChannel";

const NewChannelContainer = () => {
  const [welcome, setWelcome] = useState(true);

  return (
    <>
      <main className="channel-home">
        <div>
          <ChannelPage setWelcome={setWelcome} />
        </div>
        <NewChannel />
      </main>
      ;
    </>
  );
};

export default NewChannelContainer;
