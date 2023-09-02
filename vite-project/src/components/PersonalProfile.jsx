import React, { useContext } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import Classes from "../sass/PersonalProfile.module.scss";
import AuthContext from "../context/Auth-context";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const PersonalProfile = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("succesfully signed out");
      })
      .catch((error) => {
        console.log(error);
      });
    ctx.logout();
    ctx.email = null;
    navigate("/");
  }
  return (
    <>
      <main className={Classes["personal-profile-main"]}>
        <section>
          <div className={Classes["tweeter"]}>
            <BsPersonCircle className={Classes["profile-icon"]} />
            <p>My Profile</p>
          </div>
          <div className={Classes["tweeter"]}>
            <FaRetweet className={Classes["profile-icon"]} />
            <p>Tweeter</p>
          </div>
          <div>
            <hr />
          </div>
          <div onClick={logout} className={Classes["logout-section"]}>
            <TbLogout className={Classes["logout-icon"]} />
            <p>Logout</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default PersonalProfile;
