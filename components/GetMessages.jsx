import { useEffect, useState } from "react";
import useFirebaseStore from "@hooks/useFirebaseStore";

export default function GetMessages() {
  const { getMessages } = useFirebaseStore();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([]);
    getMessages().then((res) =>
      res.forEach((doc) => {
        const newMessage = { ...doc.data(), id: doc.id };
        setMessages((prev) => [newMessage, ...prev]);
      })
    );
  }, []);
  return (
    <div>
      <h3>messages from server</h3>
      <div>
        {messages.length > 0 ? (
          messages.map((item, index) => (
            <div
              key={index}
              style={{ border: "1px solid blue", padding: "5px" }}
            >
              <p>{item.message}</p>
            </div>
          ))
        ) : (
          <div>
            <p>It's empty</p>
          </div>
        )}
      </div>
    </div>
  );
}
