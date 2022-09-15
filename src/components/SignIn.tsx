import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from '../utchat'

const SignIn = () => {

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth ,provider)
  }

  return (
    <div className="LogIn">
      <button className="LogIn_button" onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  );
};

export default SignIn;
