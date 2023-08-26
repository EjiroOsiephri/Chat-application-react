import React, { useContext, useState, useEffect, useRef } from "react";
import Classes from "../../sass/UserChannelPage.module.scss";
import { BsPersonCircle, BsSend } from "react-icons/bs";

import AppWideContext from "../../context/AppWideContext";

const UserChannelPage = () => {
  const [channelInputValueArray, setChannelInputValueArray] = useState(null);

  const ctx = useContext(AppWideContext);

  const userChannelInputRef = useRef();

  const getData = async () => {
    try {
      const res = await fetch(
        `https://chat-application-bb1d8-default-rtdb.firebaseio.com/${ctx.userChannel.displayName}.json`
      );
      const data = await res.json();

      const channelInputValueArray = [];

      for (const key in data) {
        channelInputValueArray.push({
          id: key,
          comment: data[key].enteredText,
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
    const response = await fetch(
      `https://chat-application-bb1d8-default-rtdb.firebaseio.com/${ctx.userChannel.displayName}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          enteredText,
        }),
      }
    );
  };

  return (
    <>
      <main className={Classes["userchannelpage-main"]}>
        <header className={Classes["welcome-header"]}>
          <p>{ctx.userChannel.displayName}</p>
        </header>
        <section>
          {channelInputValueArray?.map((item, index) => {
            return (
              <div key={index}>
                <h4>{ctx.userChannel.displayName}</h4>
                <h2>{item.comment}</h2>
              </div>
            );
          })}
        </section>
        <div className={Classes["input-search"]}>
          <input
            placeholder="Type a message here"
            ref={userChannelInputRef}
            type="text"
          />
          <div className={Classes["send-channel-div"]}>
            <BsSend
              onClick={sendData}
              className={Classes["send-channel-message"]}
            ></BsSend>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserChannelPage;
