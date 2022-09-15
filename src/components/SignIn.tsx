import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utchat";

import { AiOutlineLinkedin } from "react-icons/ai";
import { HiOutlineMailOpen } from "react-icons/hi";
import { RiGithubLine } from "react-icons/ri";

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="LogIn">
      <div className="welcome">Welcome to</div>
      <div className="logo">Ut. chat</div>
      <button className="LogIn_button" onClick={signInWithGoogle}>
        Sign In with Google
      </button>
      <h1> Contact me:</h1>
      <div className="contact">
        <a
          href="https://www.linkedin.com/in/ugnius-tyla-9083a1132/"
          className="contact_card"
        >
          <AiOutlineLinkedin size={32} style={{ padding: 8 }} />
          <div className="text_container">
            <span className="website_name">LinkedIn</span>
            <span className="website_url">
              linkedin.com/in/ugnius-tyla-9083a1132
            </span>
          </div>
        </a>
        <a href="mailto: tyla.ugnius@gmail.com" className="contact_card">
          <HiOutlineMailOpen size={32} style={{ padding: 8 }} />
          <div className="text_container">
            <span className="website_name">Email</span>
            <span className="website_url">tyla.ugnius@gmail.com</span>
          </div>
        </a>
        <a href="https://github.com/UnisLTU" className="contact_card">
          <RiGithubLine size={32} style={{ padding: 8 }} />
          <div className="text_container">
            <span className="website_name">Github</span>
            <span className="website_url">
              https://github.com/UnisLTU
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default SignIn;
