import { Unsubscribe } from "firebase/auth";
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../utchat";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";
import Message from "./Message";
import styles from "../styles/Chat.module.css"

const Chat = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<DocumentData[]>([]);
  
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("time"), limit(50));
    const chatMessages: Unsubscribe = onSnapshot(q, (snapshot) => {
      let messages: DocumentData[] = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      setTimeout(() => ref.current?.scrollIntoView(), 0)
    });
    return () => chatMessages();
  }, []);

console.log(messages)
  return (
    <div>
      <SignOut />
      <div className={styles.outer_chat}>
        <div className={styles.chat_box}>
          {messages.map(({ id, text, photoURL, displayName, uid}) => (
              <div> 
                <div
                  key={id}
                  className={`${styles.message} ${
                    uid === auth.currentUser?.uid ? styles.sent : styles.received
                  }`}
                > 
                  <img className={styles.user_photo} src={photoURL} alt="profile" />
                  <div className={styles.username}>{displayName}</div>
                  <div className={styles.divider}>|</div>
                  <Message text={text} uid={uid} id={id}/>
                </div>
              </div>
            ))}
          <div ref={ref}></div>
        </div>
      </div>
      <SendMessage />
    </div>
  );
};

export default Chat;
