import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { channelActions } from "../store/ChannelSlice";
import AuthContext from "../context/Auth-context";
import Classes from "../sass/Welcome.module.scss";
import { BsPersonCircle, BsSend } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import AppWideContext from "../context/AppWideContext";
import Person from "../assets/Person.png";
import LoadingSpinner from "../components/LoadingSpinner";

const Welcome = (props) => {
  const [welcomeData, setWelcomeDataArray] = useState(null);
  const date = new Date();
  const currentDate = date.toDateString();
  const commentInputRef = useRef();
  const dispatch = useDispatch();
  const ctx = useContext(AuthContext);
  const [loading, setIsLoading] = useState(true);

  const getWelcomeData = async () => {
    try {
      const response = await fetch(
        "https://chat-application-bb1d8-default-rtdb.firebaseio.com/welcome.json"
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
    setIsLoading(false);
  };

  useEffect(() => {
    getWelcomeData();
  }, [getWelcomeData]);

  async function addToCommentArray() {
    const commentValue = commentInputRef?.current?.value;
    const displayName = ctx?.email?.split("@")[0];
    if (commentValue.length === 0) {
      return;
    }
    dispatch(
      channelActions.addTextToWelcomeChannel({
        name: displayName,
        comment: commentValue,
      })
    );
    commentInputRef.current.value = "";
    const response = await fetch(
      "https://chat-application-bb1d8-default-rtdb.firebaseio.com/welcome.json",
      {
        method: "POST",
        body: JSON.stringify({
          name: displayName,
          comment: commentValue,
        }),
      }
    );
  }

  const AuthCtx = useContext(AppWideContext);

  function showNav() {
    AuthCtx.setShowNav(true);
  }

  return (
    <>
      {loading ? (
        <div className={Classes["spinner"]}>
          <LoadingSpinner />
        </div>
      ) : (
        <main className={Classes["welcome-channel-main"]}>
          <header className={Classes["welcome-header"]}>
            <div className={Classes["showNav"]}>
              <FaBars
                style={
                  AuthCtx.showNav
                    ? {
                        display: "none",
                      }
                    : { display: "block" }
                }
                onClick={showNav}
                className={Classes["bars"]}
              ></FaBars>
            </div>
            Default Channel
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
                    <img
                      className={Classes["person-icon"]}
                      src={Person}
                      alt=""
                    />
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
              type="text"
              placeholder="Your message."
              ref={commentInputRef}
            />
            <div
              onClick={addToCommentArray}
              className={Classes["send-channel-div"]}
            >
              <BsSend className={Classes["send-channel-message"]} />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Welcome;
