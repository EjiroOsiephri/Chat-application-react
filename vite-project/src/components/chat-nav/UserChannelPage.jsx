import React, { useContext, useState, useEffect, useRef } from "react";
import "../../sass/UserChannelPage.scss";
import { BsPersonCircle, BsSend } from "react-icons/bs";

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

      const combinedData = { ...data1, ...data2 };

      const channelInputValueArray = [];

      for (const key in combinedData) {
        channelInputValueArray.unshift({
          id: key,
          sender: combinedData[key].sender,
          recipient: combinedData[key].recipient,
          comment: combinedData[key].enteredText,
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

  let displayName = AuthCtx?.email?.split("@")[0];

  const sendData = async () => {
    const enteredText = userChannelInputRef.current?.value;
    const chatIdentifier = `${displayName}_${ctx.userChannel.displayName}`;
    const response = await fetch(
      `https://chat-application-bb1d8-default-rtdb.firebaseio.com/messages/${chatIdentifier}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          enteredText,
          recepient: ctx.userChannel.displayName,
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
              <section key={index}>
                <div className={message}>
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
