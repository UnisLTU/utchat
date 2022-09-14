import { auth, db } from "../utchat";
import { useState } from "react";
import { doc, updateDoc, setDoc } from "firebase/firestore";

interface Props {
  uid: string;
  text: string;
  id: string;
}

const Message = ({ uid, text, id }: Props) => {
  const [edit, setEdit] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [getID, setGetID] = useState<string>("");

  const handleEdit = (e: React.SyntheticEvent) => {
    setGetID(e.currentTarget.id);
    setEdit((prev) => !prev);
  };

  const setOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const cancelEdit = () => {
    setEdit((prev) => !prev);
  };

  const editMessage = async(e: React.SyntheticEvent) => {
    e.preventDefault()
    const update = doc(db, "messages", getID)
    await updateDoc(update, {
        "text": message
        
    });
    setEdit((prev) => !prev)
  };

  return (
    <>
      {edit ? (
        <>
          <p className="text">{text}</p>
          {uid === auth.currentUser?.uid ? (
            <button id={id} onClick={handleEdit}>
              Edit
            </button>
          ) : null}
        </>
      ) : (
        <>
          <form onSubmit={editMessage}>
            <input value={message} onChange={setOnChange} type="text" />
            <button type="submit">+</button>
            <button onClick={cancelEdit}>-</button>
          </form>
        </>
      )}
    </>
  );
};

export default Message;
