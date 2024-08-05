import React, { useContext, useEffect, useRef, useState } from "react";
import Logo from "../assets/chat.png";
import google from "../assets/google.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { auth, provider } from "../firebase/Firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Classes from "../sass/signup.module.scss";
import AuthContext from "../context/Auth-context";
import { toast, ToastContainer } from "react-toastify";
import IMG from "../assets/dl.beatsnoop.com-1722857517.jpg";
import "react-toastify/dist/ReactToastify.css";
import AppWideContext from "../context/AppWideContext";

const SignUp = () => {
  const notify = () => toast("enter valid password");
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState(false);

  const authCtx = useContext(AuthContext);
  const ctx = useContext(AppWideContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginStateHandler = () => {
    setShowLogin(true);
  };
  const signUpStateHandler = () => {
    setShowLogin(false);
  };

  const navigate = useNavigate();

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;

    if (passwordValue.length < 6) {
      setError(true);
      notify();
      return;
    }
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
      authCtx.loginWithEmail(data.idToken);
      authCtx.emailValue(data.email.split("@")[0]);
      authCtx.addUsers({
        email: data.email,
        idToken: data.idToken,
        displayName: data.email.split("@")[0],
      });
      navigate("/channel");
    } catch (error) {
      console.log(error);
    }
  };

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        authCtx.emailValue(result.user.email);
        authCtx.loginWithEmail(result.user.uid);
        authCtx.addUsers({
          email: result.user.email,
          idToken: result.user.uid,
          displayName: result.user.displayName,
        });
        authCtx.getImg(result.user.photoURL);
        ctx.setImgSrc(result.user.photoURL);
        navigate("/channel");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (authCtx.email) {
      navigate("/channel");
    }
  }, []);
  return (
    <>
      <aside className={Classes["modifiedUIContainer"]}>
        <ToastContainer />
        <img src={IMG} alt="img" />
        <main className={Classes["Signup-main"]}>
          {showLogin ? (
            <div className={Classes["logo-div"]}>
              <h2
                style={{
                  marginBottom: "40px",
                  textAlign: "center",
                }}
              >
                LOGIN
              </h2>
            </div>
          ) : (
            <div className={Classes["signup-text-section"]}>
              <div className={Classes["logo-div"]}>
                <h2>CREATE ACCOUNT</h2>
              </div>
              <h1>Join thousands of users worldwide</h1>
              <h2>
                Simple, reliable, private messaging and calling for free*,
                available all over the world.
              </h2>
            </div>
          )}
          <section className={Classes["form"]}>
            <form onSubmit={handleSubmitHandler}>
              <label htmlFor="" className={Classes["label"]}>
                Email*
              </label>
              <div className={Classes["input-container"]}>
                <FaEnvelope className={Classes["input-icon"]} />
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <label htmlFor="" className={Classes["label"]}>
                Password*
              </label>
              <div className={Classes["input-container"]}>
                <FaLock className={Classes["input-icon"]} />
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Enter your password"
                />
                {error && (
                  <p style={{ color: "red" }}>
                    Password must be greater than 6
                  </p>
                )}
              </div>
              <button className={Classes["signup-btn"]}>Join us now</button>
              <div
                onClick={googleSignIn}
                className={Classes["signinwithgoogle"]}
              >
                <img src={google} alt="" />
                <p>Sign up with google</p>
              </div>
            </form>
            <div className={Classes["login-section"]}>
              {showLogin ? (
                <div>
                  <p>Don't have an account</p>
                  <Link onClick={signUpStateHandler}>Sign up</Link>
                </div>
              ) : (
                <div>
                  <p>
                    already have an account
                    <Link onClick={loginStateHandler}>login</Link>
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
      </aside>
    </>
  );
};

export default SignUp;
