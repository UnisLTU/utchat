import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp,
} from "firebase/firestore";
import React, { useState, useRef } from "react";
import { db, auth } from "../utchat";
import { FiSend } from "react-icons/fi";
import Picker from "emoji-picker-react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import styles from "../styles/SendMessage.module.css";

const SendMessage = () => {
  const [message, setMessage] = useState<string>("");
  const ref = useRef<HTMLInputElement | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const setOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const user: any | null = auth.currentUser;
  const displayName: string | null = user.displayName;
  const photoURL: string | null = user.photoURL;
  const uid: string | null = user.uid;
  const time: FieldValue = serverTimestamp();

  const sendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (message === "") {
      ref.current?.focus();
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

  const addEmoji = (e: React.SyntheticEvent, emoji: any) => {
    setMessage(message + emoji.emoji);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <div className={styles.form_container}>
      <button className={styles.emoji_button} onClick={togglePicker}>
        <HiOutlineEmojiHappy
          style={{ verticalAlign: "middle", height: 45, width: 45 }}
        />
      </button>
      <div className={styles.emoji_picker}>
        {showPicker && <Picker onEmojiClick={addEmoji} />}
      </div>
      <form className={styles.form_box} onSubmit={sendMessage}>
        <input
          ref={ref}
          className={styles.input_box}
          value={message}
          onChange={setOnChange}
          type="text"
          placeholder="Message..."
        />
        <button className={styles.send_box} type="submit">
          <FiSend style={{ verticalAlign: "middle", height: 25, width: 25 }} />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
