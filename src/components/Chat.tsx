import { Unsubscribe } from "firebase/auth";
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utchat";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";

const Chat = () => {
  const [messages, setMessages] = useState<DocumentData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("time"), limit(50));
    const chatMessages: Unsubscribe = onSnapshot(q, (snapshot) => {
      let messages: DocumentData[] = [];
      snapshot.forEach((doc: any) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => chatMessages();
  }, []);

  return (
    <div>
      <SignOut />
      {messages &&
        messages.map(({ id, text, photoURL, displayName }) => (
          <div key={id}>
            <div>{displayName}</div>
            <img src={photoURL} alt="profile"/>
            <p>{text}</p>
          </div>
        ))}
      <SendMessage />
    </div>
  );
};

export default Chat;
