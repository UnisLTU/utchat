import React from "react";
import { auth } from "../utchat";
import { signOut } from "firebase/auth";
import { VscSignOut } from 'react-icons/vsc'


const SignOut = () => {
  const user: any = auth.currentUser;
  const displayName: string | null = user.displayName;
  const photoURL: string | undefined = user.photoURL;

  const signOutAuth = () => signOut(auth);
  return (
    <div className="navbar">
      <>
        <img
          className="current_user_photo"
          src={photoURL}
          alt="current_user_photo"
        ></img>
        <span className="user_name">Sign as : {displayName}</span>
      </>
      <button className="signOutButton" onClick={signOutAuth}>
        SIGN OUT <VscSignOut style={{ verticalAlign: 'middle', height: 20, width: 20, paddingLeft:6 }}/> 
      </button>
    </div>
  );
};

export default SignOut;
