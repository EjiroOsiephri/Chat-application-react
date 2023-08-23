import React from "react";
import { FaSearch } from "react-icons/fa";

const ChannelPage = () => {
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
