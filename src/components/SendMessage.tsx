import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp,
} from "firebase/firestore";
import React, { useState,forwardRef } from "react";
import { db, auth } from "../utchat";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState<string>("");

  const setOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const user: any = auth.currentUser;
  const displayName: string | null = user.displayName;
  const photoURL: string | null = user.photoURL;
  const uid: string | null = user.uid;
  const time: FieldValue = serverTimestamp();

  const sendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "messages"), {
      text: message,
      photoURL,
      uid,
      time,
      displayName,
    });
    setMessage("");
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <div></div>
        <input
          value={message}
          onChange={setOnChange}
          type="text"
          placeholder="Message..."
        />
        <button type="submit">Send It!!!</button>
      </form>
    </div>
  );
};

export default SendMessage;