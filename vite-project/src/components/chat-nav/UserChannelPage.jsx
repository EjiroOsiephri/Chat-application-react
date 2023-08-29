import React, { useContext, useState, useEffect, useRef } from "react";
import "../../sass/UserChannelPage.scss";
import { BsSend } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

import AppWideContext from "../../context/AppWideContext";
import AuthContext from "../../context/Auth-context";

const UserChannelPage = () => {
  const [channelInputValueArray, setChannelInputValueArray] = useState(null);

  const AuthCtx = useContext(AuthContext);

  const ctx = useContext(AppWideContext);

  const userChannelInputRef = useRef();

  const getData = async () => {
    try {
      const chatIdentifier1 = `${displayName}_${ctx.userChannel.displayName}`;
      const chatIdentifier2 = `${ctx.userChannel.displayName}_${displayName}`;

      const res1 = await fetch(
        `https://chat-application-bb1d8-default-rtdb.firebaseio.com/messages/${chatIdentifier1}.json`
      );
      const res2 = await fetch(
        `https://chat-application-bb1d8-default-rtdb.firebaseio.com/messages/${chatIdentifier2}.json`
      );

      const data1 = await res1.json();
      const data2 = await res2.json();

      const combinedData = { ...data2, ...data1 };

      const channelInputValueArray = Object.values(combinedData)

        .sort((a, b) => a.timestamp - b.timestamp)
        .map((item) => ({
          id: item.id,
          sender: item.sender,
          recipient: item.recipient,
          comment: item.enteredText,
        }));

      setChannelInputValueArray(channelInputValueArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [getData, ctx?.userChannel?.displayName]);

  let displayName = AuthCtx?.email?.split("@")[0];

  const sendData = async () => {
    const enteredText = userChannelInputRef.current?.value;

    if (enteredText.length === 0) {
      return;
    }
    const timestamp = new Date().getTime();
    const chatIdentifier = `${displayName}_${ctx.userChannel.displayName}`;
    const response = await fetch(
      `https://chat-application-bb1d8-default-rtdb.firebaseio.com/messages/${chatIdentifier}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          enteredText,
          recepient: ctx.userChannel.displayName,
          sender: AuthCtx?.email?.split("@")[0],
          timestamp,
        }),
      }
    );
    userChannelInputRef.current.value = "";
  };

  function hideNav() {
    ctx.setShowNav(true);
  }
  return (
    <>
      <main className="userchannelpage-main">
        <header className="welcome-header">
          <p>{ctx?.userChannel?.displayName}</p>
          <FaTimes onClick={hideNav} className="times"></FaTimes>
        </header>
        <section className="section-scroll grid-container">
          {channelInputValueArray?.map((item, index) => {
            const isCurrentUser = item.sender === displayName;
            const messageClassName = isCurrentUser
              ? "message user-message"
              : "message other-message";
            return (
              <section key={index}>
                <div className={messageClassName}>
                  <h4>{item.sender}</h4>
                  <h2>{item.comment}</h2>
                </div>
              </section>
            );
          })}
        </section>
        <div className="input-search">
          <input
            placeholder="Type a message here"
            ref={userChannelInputRef}
            type="text"
          />
          <div className="send-channel-div">
            <BsSend
              onClick={sendData}
              className="send-channel-message"
            ></BsSend>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserChannelPage;
