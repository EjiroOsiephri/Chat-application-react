import React, { useContext, useRef, useState } from "react";
import Logo from "../assets/chat.png";
import google from "../assets/google.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { auth, provider } from "../firebase/Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Classes from "../sass/signup.module.scss";
import AuthContext from "../context/Auth-context";

const SignUp = () => {
  const [showLogin, setShowLogin] = useState(false);

  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginStateHandler = () => {
    setShowLogin(true);
  };
  const signUpStateHandler = () => {
    setShowLogin(fasle);
  };

  const navigate = useNavigate();

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;
    let url;
    if (showLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXaeR7W_OaiIEAN5o_BPmn8nT0R_-bShc";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXaeR7W_OaiIEAN5o_BPmn8nT0R_-bShc";
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      authCtx.loginWithEmail(data.idToken);
      authCtx.emailValue(data.email.split("@")[0]);
      authCtx.addUsers({
        email: data.email,
        idToken: data.idToken,
        displayName: data.email.split("@")[0],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        authCtx.emailValue(result.user.email);
        authCtx.loginWithEmail(result.user.uid);
        authCtx.addUsers({
          email: result.user.email,
          idToken: result.user.uid,
          displayName: result.user.displayName,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <main className={Classes["Signup-main"]}>
        <div className={Classes["logo-div"]}>
          <img src={Logo} alt="" />
          <h2>EjiroChatHub</h2>
        </div>
        {showLogin ? (
          <h2 className={Classes["login-text"]}>Login</h2>
        ) : (
          <div className={Classes["signup-text-section"]}>
            <h1>Join thousands of users worldwide</h1>
            <h2>
              Simple, reliable, private messaging and calling for free*,
              available all over the world. Never miss a moment with voice and
              video calls. From a group call, to classmates ,to a quick call
              with mom, feel like you’re in the same room with voice and video
              calls.
            </h2>
          </div>
        )}
        <section className={Classes["form"]}>
          <form onSubmit={handleSubmitHandler}>
            <div className={Classes["input-container"]}>
              <FaEnvelope className={Classes["input-icon"]} />
              <input
                ref={emailRef}
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className={Classes["input-container"]}>
              <FaLock className={Classes["input-icon"]} />
              <input
                ref={passwordRef}
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div onClick={googleSignIn} className={Classes["signinwithgoogle"]}>
              <img src={google} alt="" />
              <p>Sign up with google</p>
            </div>
            <button className={Classes["signup-btn"]}>Join us now</button>
          </form>
          <div className={Classes["login-section"]}>
            {showLogin ? (
              <div>
                <p>Don't have an account</p>
                <Link onClick={signUpStateHandler}>Sign up</Link>
              </div>
            ) : (
              <div>
                <p>already have an account</p>
                <Link onClick={loginStateHandler}>login</Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default SignUp;
