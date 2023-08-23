import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import AuthContext from "../../context/Auth-context";

const ChannelPage = () => {
  const ctx = useContext(AuthContext);
  console.log(ctx);

  function getFirstLetters(name) {
    const words = name.split(" ");
    const firstLetters = words.map((word) => word.charAt(0));
    return firstLetters.join("");
  }

  const firstLetters = ctx.users.map((user) => {
    return getFirstLetters(user.displayName);
  });

  console.log(firstLetters);
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
          {ctx.users.map((item, index) => {
            return (
              <div key={index}>
                <h1>{item.displayName}</h1>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default ChannelPage;
