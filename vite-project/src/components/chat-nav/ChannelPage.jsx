import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import AuthContext from "../../context/Auth-context";

const ChannelPage = () => {
  const ctx = useContext(AuthContext);
  console.log(ctx);
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
      </main>
    </>
  );
};

export default ChannelPage;
