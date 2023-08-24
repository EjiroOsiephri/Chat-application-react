import React, { useContext, useRef } from "react";
import AppWideContext from "../../context/AppWideContext";

const UserChannelPage = () => {
  const ctx = useContext(AppWideContext);

  const userChannelInputRef = useRef();

  const sendData = async () => {
    const enteredText = userChannelInputRef.current?.value;
    const response = await fetch(
      `https://chat-application-bb1d8-default-rtdb.firebaseio.com/${ctx.userChannel.displayName}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          enteredText,
        }),
      }
    );
    console.log(response);
  };

  return (
    <>
      <main>
        <header>
          <h1>{ctx.userChannel.displayName}</h1>
        </header>
        <section></section>
        <div className="input-useChannel-section">
          <input ref={userChannelInputRef} type="text" />
          <button onClick={sendData}>send</button>
        </div>
      </main>
    </>
  );
};

export default UserChannelPage;
