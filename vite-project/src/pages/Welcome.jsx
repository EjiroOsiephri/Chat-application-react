import React, { useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { channelActions } from "../store/ChannelSlice";
import AuthContext from "../context/Auth-context";
import Classes from "../sass/Welcome.module.scss";
import { BsPersonCircle } from "react-icons/bs";

const Welcome = (props) => {
  const state = useSelector((state) => state.channel.welcomeChannelHistory);
  const date = new Date();
  const currentDate = date.toDateString();

  const commentInputRef = useRef();
  const dispatch = useDispatch();
  const ctx = useContext(AuthContext);

  function addToCommentArray() {
    const commentValue = commentInputRef?.current?.value;
    const displayName = ctx?.email?.split("@")[0];
    dispatch(
      channelActions.addTextToWelcomeChannel({
        name: displayName,
        comment: commentValue,
      })
    );
    commentInputRef.current.value = "";
  }

  return (
    <>
      <main className={Classes["welcome-channel-main"]}>
        <header className={Classes["welcome-header"]}>Welcome Channel</header>
        <section>
          {state?.map((item, index) => {
            return (
              <aside className={Classes["welcome-comments"]} key={index}>
                <BsPersonCircle
                  className={Classes["person-icon"]}
                ></BsPersonCircle>
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
          <input
            type="text"
            placeholder="Type a message here"
            ref={commentInputRef}
          />
          <button onClick={addToCommentArray}>send</button>
        </div>
      </main>
    </>
  );
};

export default Welcome;
