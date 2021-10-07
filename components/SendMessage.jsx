import { useState } from "react";
import useFirebaseStore from "@lib/hooks/useFirebaseStore";

export default function SendMessage() {
  const { sendMessage } = useFirebaseStore();
  const [message, setMessage] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(message);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="send message" />
      </form>
    </div>
  );
}
