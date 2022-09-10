import { Unsubscribe } from "firebase/auth";
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { auth, db } from "../utchat";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";

const Chat = () => {
  const scroll = useRef<HTMLDivElement>(null);
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
      <div className="outer_chat">
        <div className="chat_box">
          {messages &&
            messages.map(({ id, text, photoURL, displayName, uid }) => (
              <div>
                <div
                  key={id}
                  className={`message ${
                    uid === auth.currentUser?.uid ? "sent" : "received"
                  }`}
                >
                  <img className="user_photo" src={photoURL} alt="profile" />
                  <div className="username">{displayName}</div>
                  <p className="text">{text}</p>
                </div>
              </div>
            ))}
        </div>
        <div ref={scroll}></div>
      </div>
      <SendMessage scroll={scroll} />
    </div>
  );
};

export default Chat;
