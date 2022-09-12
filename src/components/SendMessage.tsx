import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp,
} from "firebase/firestore";
import React, { useState } from "react";
import { db, auth } from "../utchat";
import { FiSend } from "react-icons/fi";

const SendMessage = () => {
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
    if (message === "") {
      setMessage("");
    } else {
      await addDoc(collection(db, "messages"), {
        text: message,
        photoURL,
        uid,
        time,
        displayName,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <form className="form_box" onSubmit={sendMessage}>
        <input
          className="input_box"
          value={message}
          onChange={setOnChange}
          type="text"
          placeholder="Message..."
        />
        <button className="send_box" type="submit">
          <FiSend style={{ verticalAlign: "middle", height: 25, width: 25 }} />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
