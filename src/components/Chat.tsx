import { Unsubscribe } from "firebase/auth";
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../utchat";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";
import Message from "./Message";

const Chat = () => {
  const scroll = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<DocumentData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("time"), limit(50));
    const chatMessages: Unsubscribe = onSnapshot(q, (snapshot) => {
      let messages: DocumentData[] = [];
      snapshot.forEach((doc: any) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => chatMessages();
  }, []);


  return (
    <div>
      <SignOut />
      <div className="outer_chat">
        <div className="chat_box">
          {messages.map(({ id, text, photoURL, displayName, uid }) => (
              <div>
                <div
                  key={id}
                  className={`message ${
                    uid === auth.currentUser?.uid ? "sent" : "received"
                  }`}
                >
                  <img className="user_photo" src={photoURL} alt="profile" />
                  <div className="username">{displayName}</div>
                  <Message text={text} uid={uid} id={id}/>
                </div>
              </div>
            ))}
          <div ref={scroll}></div>
        </div>
      </div>
      <SendMessage />
    </div>
  );
};

export default Chat;
