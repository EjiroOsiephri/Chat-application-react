import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/Auth-context";
import { FaSearch } from "react-icons/fa";
import Classes from "../../sass/ChannelPage.module.scss";
import AppWideContext from "../../context/AppWideContext";
import { AiOutlineDown } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import Person from "../../assets/person.png";
import PersonalProfile from "../PersonalProfile";

const ChannelPage = (props) => {
  const ctx = useContext(AuthContext);
  const appWideContext = useContext(AppWideContext);

  function getFirstLetters(name) {
    const words = name.split(" ");
    const firstLetters = words.map((word) => word.charAt(0));
    return firstLetters.join("");
  }

  const [uniqueUser, setUniqueUsers] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch(
        `https://chat-application-bb1d8-default-rtdb.firebaseio.com/users.json`
      );
      const data = await res.json();

      const uniqueUserArray = [];
      for (const key in data) {
        uniqueUserArray.push({
          id: key,
          displayName: data[key].displayName,
        });
      }

      setUniqueUsers(uniqueUserArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const displayName = ctx?.email?.split("@")[0];

  const uniqueUsers = uniqueUser?.reduce((unique, user) => {
    if (
      !unique.some(
        (existingUser) => existingUser.displayName === user.displayName
      ) &&
      user.displayName !== displayName
    ) {
      unique.push(user);
    }
    return unique;
  }, []);

  const setUserChannel = (item) => {
    appWideContext.setUserChannel(item);
    props.setWelcome(false);
    appWideContext.setShowNav(false);
  };

  const welcomePageHandler = () => {
    props.setWelcome(true);
    appWideContext.setShowNav(false);
  };

  const sendData = async () => {
    const response = await fetch(
      `https://chat-application-bb1d8-default-rtdb.firebaseio.com/users.json`,
      {
        method: "POST",
        body: JSON.stringify({
          displayName: displayName,
        }),
      }
    );
  };
  useEffect(() => {
    sendData();
  }, []);

  function hideNav() {
    appWideContext.setShowNav(false);
  }

  function goBackToAllChannelPage() {
    props.setWelcome(false);
  }

  const [showProfile, setShowProfile] = useState(false);

  function showProfileSection() {
    setShowProfile((prevValue) => !prevValue);
  }

  function showNewChannel() {
    appWideContext.setNewChannel((prevValue) => !prevValue);
  }

  return (
    <>
      <main className={Classes["channel-main"]}>
        <nav className={Classes["channel-navigation"]}>
          {props.welcome ? (
            <div>
              <p onClick={goBackToAllChannelPage}>{"<"}</p>
              <h1>All Channels</h1>
            </div>
          ) : (
            <div>
              <h1>Channels</h1>
              <p onClick={showNewChannel}>+</p>
            </div>
          )}
          <FaTimes onClick={hideNav} className={Classes["times"]}></FaTimes>
        </nav>

        {!props.welcome && (
          <div className={Classes["search"]}>
            <FaSearch className={Classes["search-logo"]} />
            <input type="text" placeholder="Search" />
          </div>
        )}
        <section className={Classes["channelDiv"]}>
          <div onClick={welcomePageHandler} className={Classes["welcome"]}>
            <h2>W</h2>
            <h1>Welcome channel</h1>
          </div>
          {props.welcome && (
            <div className={Classes["description-section"]}>
              <h4>
                This is a channel that welcomes all users. All users can drop a
                message and feel out the website.
              </h4>
            </div>
          )}
          {props.welcome && (
            <aside>
              <h1 className={Classes["Aside-members"]}>Members</h1>
              {uniqueUsers?.map((item, index) => (
                <div
                  onClick={() => {
                    setUserChannel(item);
                  }}
                  className={Classes["switch-channel"]}
                  key={index}
                >
                  <img src={Person} className={Classes["person-icon"]} alt="" />
                  <h1>{item.displayName}</h1>
                </div>
              ))}
            </aside>
          )}
        </section>
        {showProfile && <PersonalProfile />}
        <div className={Classes["user-login-info"]}>
          <div className={Classes["about-user-div"]}>
            <div>
              {ctx.imgSrc ? <img src={ctx.imgSrc} /> : <img src="" />}{" "}
              <h2>{displayName}</h2>
            </div>
            <AiOutlineDown
              onClick={showProfileSection}
              className={Classes["down-icon"]}
            ></AiOutlineDown>
          </div>
          <div></div>
        </div>
      </main>
    </>
  );
};

export default ChannelPage;
