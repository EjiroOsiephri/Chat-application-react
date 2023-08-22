import React from "react";
import Logo from "../assets/chat.png";
import { FaEnvelope, FaLock } from "react-icons/fa";

const SignUp = () => {
  return (
    <>
      <main className="Signup-main">
        <div className="logo-div">
          <img src={Logo} alt="" />
          <h2>EjiroChatHub</h2>
        </div>
        <div className="signup-text-section">
          <h1>Join thousands of users worldwide</h1>
          <h2>
            Simple, reliable, private messaging and calling for free*, available
            all over the world. Never miss a moment with voice and video calls
            From a group call to classmates to a quick call with mom, feel like
            you’re in the same room with voice and video calls.
          </h2>
          <h3>
            With private messaging and calling, you can be yourself, speak
            freely and feel close to the most important people in your life no
            matter where they are.
          </h3>
        </div>
        <section className="form">
          <form>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input type="password" placeholder="Enter your password" />
            </div>
            <button>Join us now</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignUp;
