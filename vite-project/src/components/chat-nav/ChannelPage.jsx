import { useContext } from "react";
import AuthContext from "../../context/Auth-context";
import { FaSearch } from "react-icons/fa";
const ChannelPage = () => {
  const ctx = useContext(AuthContext);

  function getFirstLetters(name) {
    const words = name.split(" ");
    const firstLetters = words.map((word) => word.charAt(0));
    return firstLetters.join("");
  }

  const firstLetters = ctx.users.map((user) => {
    return getFirstLetters(user.displayName);
  });

  return (
    <>
      <main>
        <nav>
          <h1>Channels</h1>
          <p>+</p>
        </nav>
        <div className="search">
          <FaSearch className="search-logo" />
          <input type="text" placeholder="Search" />
        </div>
        <section className="channelDiv">
          <div className="welcome">
            <h2>W</h2>
            <h1>Welcome channel</h1>
          </div>
          <aside>
            {ctx.users.map((item, index) => (
              <div key={index}>
                <p>{firstLetters[index]}</p>
                <h1>{item.displayName}</h1>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </>
  );
};

export default ChannelPage;
