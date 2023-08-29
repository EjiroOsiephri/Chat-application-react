import React, { useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Styled from "../sass/Modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { channelActions } from "../store/ChannelSlice";
import AppWideContext from "../context/AppWideContext";

const BackDrop = () => {
  return <div className={Styled.backdrop}></div>;
};

const Modal = () => {
  const setChannelDescriptionRef = useRef();
  const setChannelNameRef = useRef();
  const dispatch = useDispatch();

  const ctx = useContext(AppWideContext);

  const state = useSelector((state) => state.channel.welcomeChannelHistory);

  const getChannelInfo = () => {
    const enteredChannelNameInfo = setChannelNameRef?.current?.value;
    const enteredChannelDesscription = setChannelDescriptionRef?.current?.value;

    if (
      enteredChannelNameInfo.length === 0 ||
      enteredChannelNameInfo.length === 0
    ) {
      return;
    }

    dispatch(
      channelActions.addTextToWelcomeChannel({
        name: enteredChannelNameInfo,
        description: enteredChannelDesscription,
      })
    );
    setChannelNameRef.current.value = "";
    setChannelDescriptionRef.current.value = "";
    ctx.setNewChannel(false);
  };

  return (
    <div className={Styled.modal}>
      <div className={Styled.content}>
        <h1>New Channel</h1>
      </div>
      <div className={Styled["input-description"]}>
        <input ref={setChannelNameRef} type="text" placeholder="Channel name" />
        <textarea
          ref={setChannelDescriptionRef}
          placeholder="Channel description"
        ></textarea>
      </div>
      <div className={Styled.button}>
        <button onClick={getChannelInfo}>Save</button>
      </div>
    </div>
  );
};

const Module = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(<Modal />, document.getElementById("modal-root"))}
    </React.Fragment>
  );
};

export default Module;
