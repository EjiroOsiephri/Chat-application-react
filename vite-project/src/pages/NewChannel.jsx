import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { channelActions } from "../store/ChannelSlice";
import AuthContext from "../context/Auth-context";
import Classes from "../sass/Welcome.module.scss";
import { BsPersonCircle, BsSend } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import AppWideContext from "../context/AppWideContext";
import Person from "../assets/Person.png";

const Welcome = (props) => {
  const AuthCtx = useContext(AppWideContext);
  console.log(AuthCtx.newChannelName);
  return (
    <>
      <main className={Classes["welcome-channel-main"]}>
        <header className={Classes["welcome-header"]}>
          <div className={Classes["welcome"]}>
            <h1>{AuthCtx.newChannelName}</h1>
          </div>
        </header>
        <section></section>
        {/* <div className={Classes["input-search"]}>
          <textarea
            type="text"
            placeholder="Type a message here"
            ref={commentInputRef}
          />
          <div className={Classes["send-channel-div"]}>
            <BsSend className={Classes["send-channel-message"]} />
          </div>
        </div> */}
      </main>
    </>
  );
};

export default Welcome;
