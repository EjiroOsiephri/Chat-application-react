import { useContext } from "react";
import AuthContext from "../../context/Auth-context";
import { FaSearch } from "react-icons/fa";
import Classes from "../../sass/ChannelPage.module.scss";
import AppWideContext from "../../context/AppWideContext";

const ChannelPage = (props) => {
  const ctx = useContext(AuthContext);

  function getFirstLetters(name) {
    const words = name.split(" ");
    const firstLetters = words.map((word) => word.charAt(0));
    return firstLetters.join("");
  }

  const firstLetters = ctx.users.map((user) => {
    return getFirstLetters(user.displayName);
  });

  const displayName = ctx?.email?.split("@")[0];

  const lastLetters = ctx?.email?.charAt(0);

  const appWideContext = useContext(AppWideContext);

  const setUserChannel = (item) => {
    appWideContext.setUserChannel(item);
    props.setWelcome(false);
  };

  const welcomePageHandler = () => {
    props.setWelcome(true);
  };

  return (
    <>
      <main className={Classes["channel-main"]}>
        <nav className={Classes["channel-navigation"]}>
          <h1>Channels</h1>
          <p>+</p>
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
            {ctx.users.map((item, index) => (
              <div
                onClick={() => {
                  setUserChannel(item);
                }}
                className={Classes["switch-channel"]}
                key={index}
              >
                <p>{firstLetters[index]}</p>
                <h1>{item.displayName}</h1>
              </div>
            ))}
          </aside>
        </section>
        <div className={Classes["user-login-info"]}>
          <div className={Classes["about-user-div"]}>
            <div>
              <h3 className={Classes.lastLetters}>{lastLetters}</h3>
            </div>
            <h2>{displayName}</h2>
          </div>
          <div className={Classes["show-info"]}>{">"}</div>
        </div>
      </main>
    </>
  );
};

export default ChannelPage;
