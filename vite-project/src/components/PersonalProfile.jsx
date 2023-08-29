import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import Classes from "../sass/PersonalProfile.module.scss";

const PersonalProfile = () => {
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
          <div className={Classes["logout-section"]}>
            <TbLogout className={Classes["logout-icon"]} />
            <p>Logout</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default PersonalProfile;
