import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/Auth-context";
import Classes from "../sass/NewChannel.module.scss";
import { BsSend } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import AppWideContext from "../context/AppWideContext";
import Person from "../assets/Person.png";
import { useNavigate } from "react-router-dom";

const NewChannel = () => {
  const AuthCtx = useContext(AppWideContext);
  const ctx = useContext(AuthContext);
  const commentInputRef = useRef();
  const date = new Date();
  const currentDate = date.toDateString();
  const [welcomeData, setWelcomeDataArray] = useState(null);

  const getChannelMessage = async () => {
    try {
      const response = await fetch(
        `https://chat-application-bb1d8-default-rtdb.firebaseio.com/channel/${AuthCtx.newChannelName}.json`
      );
      const data = await response.json();

      let welcomeDataArray = [];

      for (const key in data) {
        welcomeDataArray.push({
          name: data[key].name,
          comment: data[key].comment,
        });
      }
      setWelcomeDataArray(welcomeDataArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChannelMessage();
  }, [getChannelMessage]);

  const sendNewChannelMessage = async () => {
    const commentValue = commentInputRef?.current?.value;
    const displayName = ctx?.email?.split("@")[0];
    if (commentValue.length === 0) {
      return;
    }
    const response = await fetch(
      `https://chat-application-bb1d8-default-rtdb.firebaseio.com/channel/${AuthCtx.newChannelName}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          name: displayName,
          comment: commentValue,
        }),
      }
    );
    console.log(response);
    commentInputRef.current.value = "";
  };
  const navigate = useNavigate();

  function hideNav() {
    AuthCtx.setShowNav(true);
    navigate("/channel");
  }
  return (
    <>
      <main className={Classes["new-channel-main"]}>
        <header className={Classes["new-header"]}>
          <h1>{AuthCtx.newChannelName}</h1>
          <FaTimes onClick={hideNav} className="times"></FaTimes>
        </header>
        <section className={Classes["section-scroll"]}>
          {welcomeData?.map((item, index) => {
            return (
              <aside className={Classes["welcome-comments"]} key={index}>
                {ctx.imgSrc ? (
                  <img
                    className={Classes["person-icon"]}
                    src={ctx.imgSrc}
                    alt=""
                  />
                ) : (
                  <img className={Classes["person-icon"]} src={Person} alt="" />
                )}
                <div className={Classes["welcome-name-div"]}>
                  <div>
                    <p>{item.name}</p>
                    <p>{currentDate}</p>
                  </div>
                  <h1>{item.comment}</h1>
                </div>
              </aside>
            );
          })}
        </section>
        <div className={Classes["input-search"]}>
          <textarea
            ref={commentInputRef}
            type="text"
            placeholder="Your message"
          />
          <div
            onClick={sendNewChannelMessage}
            className={Classes["send-channel-div"]}
          >
            <BsSend className={Classes["send-channel-message"]} />
          </div>
        </div>
      </main>
    </>
  );
};

export default NewChannel;
