import {
  collection, limit, onSnapshot,
  orderBy, query, QueryDocumentSnapshot
} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from "../utchat";
import SignOut from "./SignOut";
  
interface Massages {
    id:string;
    text:string;
    time: Date;
  }

  interface Doc {
    text:string;
    time:Date;
  }

const Chat = () => {

  const [messages, setMessages] = useState<Massages[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('time'), limit(50));
    const chatMessages = onSnapshot(q, (snapshot) => {
      let messages: Massages[] = [];
      snapshot.forEach((doc:any) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      console.log(messages);

    });
    return () => chatMessages();
  }, []);


  return (
    <div>
      {messages && messages.map((message) => (<div key={message.id}>{message.text}</div>))}
      <SignOut />
    </div>
  );
};

export default Chat;
