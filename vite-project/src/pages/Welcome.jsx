import React, { useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { channelActions } from "../store/ChannelSlice";
import AuthContext from "../context/Auth-context";
import Classes from "../sass/Welcome.module.scss";

const Welcome = (props) => {
  const state = useSelector((state) => state.channel.welcomeChannelHistory);

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
  }

  return (
    <>
      <main>
        <header className={Classes["welcome-header"]}>Welcome Channel</header>
        <section>
          {state?.map((item, index) => {
            return (
              <aside key={index}>
                <img src="" alt="" />
                <div>
                  <p>{item.name}</p>
                  <h1>{item.comment}</h1>
                </div>
              </aside>
            );
          })}
        </section>
        <div className="input-search">
          <input type="text" ref={commentInputRef} />
          <button onClick={addToCommentArray}>send</button>
        </div>
      </main>
    </>
  );
};

export default Welcome;
