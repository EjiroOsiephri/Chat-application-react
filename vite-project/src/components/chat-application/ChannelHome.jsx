import React from "react";
import ChannelPage from "../chat-nav/ChannelPage";
import "../../sass/ChannelHome.scss";
import Welcome from "../../pages/Welcome";

const ChannelHome = () => {
  return (
    <>
      <main className="channel-home">
        <ChannelPage />
        <div>
          <Welcome />
        </div>
      </main>
    </>
  );
};

export default ChannelHome;
