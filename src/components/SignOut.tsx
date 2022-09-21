import { auth } from "../utchat";
import { signOut } from "firebase/auth";
import { VscSignOut } from "react-icons/vsc";
import styles from '../styles/SignOut.module.css'

const SignOut = () => {
  const user: any = auth.currentUser;
  const displayName: string | null = user.displayName;
  const photoURL: string | undefined = user.photoURL;

  const signOutAuth = () => signOut(auth);
  return (
    <div className={styles.navbar}>
      <>
        <img
          className={styles.current_user_photo}
          src={photoURL}
          alt="current_user_photo"
        ></img>
        <span className={styles.user_name}>Sign as : {displayName}</span>
      </>
      <button className={styles.signOutButton} onClick={signOutAuth}>
        SIGN OUT{" "}
        <VscSignOut
          style={{
            verticalAlign: "middle",
            height: 20,
            width: 20,
            paddingLeft: 6,
          }}
        />
      </button>
    </div>
  );
};

export default SignOut;
