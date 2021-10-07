import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
import { firebaseStore } from "@lib/utils/myFirebase";

export default function useFirebaseStore() {
  const sendMessage = (message) => {
    return addDoc(collection(firebaseStore, "messages"), {
      message: message,
      created: Date.now(),
    });
  };

  const getMessages = () => {
    const q = query(collection(firebaseStore, "messages"));
    const messagesSnap = getDocs(q);
    return messagesSnap;
  };

  return {
    sendMessage,
    getMessages,
  };
}
