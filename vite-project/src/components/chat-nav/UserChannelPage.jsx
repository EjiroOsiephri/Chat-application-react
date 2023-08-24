import React, { useContext } from "react";
import AppWideContext from "../../context/AppWideContext";

const UserChannelPage = () => {
  const ctx = useContext(AppWideContext);

  return (
    <>
      <main>
        <header>
          <h1>{ctx.userChannel.displayName}</h1>
        </header>
        <section></section>
        <div className="input-useChannel-section">
          <input type="text" />
        </div>
      </main>
    </>
  );
};

export default UserChannelPage;
