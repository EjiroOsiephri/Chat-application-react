import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Styled from "../sass/Modal.module.scss";

const BackDrop = () => {
  return <div className={Styled.backdrop}></div>;
};

const setChannelDescriptionRef = useRef();
const setChannelNameRef = useRef();

const getChannelInfo = () => {
  const enteredChannelNameInfo = setChannelNameRef?.current?.value;
  const enteredChannelDesscription = setChannelDescriptionRef?.current?.value;
};

const Modal = () => {
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
