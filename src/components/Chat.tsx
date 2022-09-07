import SignOut from "./SignOut";
import { db } from "../utchat";
import {
  collection,
  onSnapshot,
  orderBy,
  limit,
  query,
} from "firebase/firestore";

const Chat = () => {
  const colRef = collection(db, "messages");
  const q = query(colRef, orderBy("createdAt"), limit(50));
  onSnapshot(q, (snapshot) => {
    let messages: any = [];
    snapshot.docs.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc.id });
    });
    console.log(messages);
  });

  return (
    <div>
      <SignOut />
    </div>
  );
};

export default Chat;
