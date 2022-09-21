import "./App.css";
import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
import Loader from "./components/Loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../src/utchat";
import { useState } from "react";

const App = () => {
  const [user] = useAuthState(auth);
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 3000);

  return loader ? (
    <Loader />
  ) : (
    <div>{user ? <Chat /> : <SignIn />}</div>
  );
};

export default App;
