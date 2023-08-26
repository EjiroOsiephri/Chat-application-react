import React, { useContext, useState, useEffect, useRef } from "react";
import "../../sass/UserChannelPage.scss";
import { BsPersonCircle, BsSend } from "react-icons/bs";

import AppWideContext from "../../context/AppWideContext";
import AuthContext from "../../context/Auth-context";

const UserChannelPage = () => {
  const [channelInputValueArray, setChannelInputValueArray] = useState(null);

  const textEntered = localStorage.getItem("enteredText");

  const AuthCtx = useContext(AuthContext);

  const ctx = useContext(AppWideContext);

  const userChannelInputRef = useRef();

  let displayName = AuthCtx?.email?.split("@")[0];

  const getData = async () => {
    try {
      const res = await fetch(
        `https://chat-application-bb1d8-default-rtdb.firebaseio.com/${ctx.userChannel.displayName}.json`
      );
      const data = await res.json();

      const channelInputValueArray = [];

      for (const key in data) {
        const message = data[key];
        if (
          (message.sender === displayName &&
            message.recipient === ctx.userChannel.displayName) ||
          (message.sender === ctx.userChannel.displayName &&
            message.recipient === displayName)
        )
          channelInputValueArray.push({
            id: key,
            sender: message.sender,
            recipient: message.recipient,
            comment: message.enteredText,
          });
      }
      setChannelInputValueArray(channelInputValueArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [getData, ctx.userChannel.displayName]);

  const sendData = async () => {
    const enteredText = userChannelInputRef.current?.value;
    localStorage.setItem("enteredText", enteredText);
    const response = await fetch(
      `https://chat-application-bb1d8-default-rtdb.firebaseio.com/${ctx.userChannel.displayName}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          recipient: ctx.userChannel.displayName,
          textEntered,
          sender: AuthCtx?.email?.split("@")[0],
        }),
      }
    );
    userChannelInputRef.current.value = "";
  };

  const isCurrentUser = displayName === ctx.userChannel.displayName;

  const message = isCurrentUser
    ? "message user-message"
    : "message other-message";

  return (
    <>
      <main className="userchannelpage-main">
        <header className="welcome-header">
          <p>{ctx.userChannel.displayName}</p>
        </header>
        <section className="section-scroll">
          {channelInputValueArray?.map((item, index) => {
            return (
              <section className="message-user-channel">
                <div className={message} key={index}>
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
