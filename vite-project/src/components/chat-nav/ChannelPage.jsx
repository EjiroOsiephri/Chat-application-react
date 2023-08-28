import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/Auth-context";
import { FaSearch } from "react-icons/fa";
import Classes from "../../sass/ChannelPage.module.scss";
import AppWideContext from "../../context/AppWideContext";
import { BsPersonCircle } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import Person from "../../assets/person.png";

const ChannelPage = (props) => {
  const ctx = useContext(AuthContext);
  const appWideContext = useContext(AppWideContext);

  function getFirstLetters(name) {
    const words = name.split(" ");
    const firstLetters = words.map((word) => word.charAt(0));
    return firstLetters.join("");
  }

  const firstLetters = ctx.users.map((user) => {
    return getFirstLetters(user.displayName);
  });

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

  const lastLetters = ctx?.email?.charAt(0);

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

  return (
    <>
      <main className={Classes["channel-main"]}>
        <nav className={Classes["channel-navigation"]}>
          <div>
            <h1>Channels</h1>
            <p>+</p>
          </div>
          <FaTimes onClick={hideNav} className={Classes["times"]}></FaTimes>
        </nav>
        <div className={Classes["search"]}>
          <FaSearch className={Classes["search-logo"]} />
          <input type="text" placeholder="Search" />
        </div>
        <section className={Classes["channelDiv"]}>
          <div onClick={welcomePageHandler} className={Classes["welcome"]}>
            <h2>W</h2>
            <h1>Welcome channel</h1>
          </div>
          <aside>
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
        </section>
        <div className={Classes["user-login-info"]}>
          <div className={Classes["about-user-div"]}>
            <div>{ctx.imgSrc ? <img src={ctx.imgSrc} /> : <img src="" />}</div>
            <h2>{displayName}</h2>
          </div>
          <div></div>
        </div>
      </main>
    </>
  );
};

export default ChannelPage;
