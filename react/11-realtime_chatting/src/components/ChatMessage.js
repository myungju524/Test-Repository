import React from "react";
import imgs from "../asstes/images.jpeg";

function ChatMessage({ msg, auth }) {
  const { text, photoURL, uid } = msg;
  const messageClass = uid === auth?.currentUser.uid ? "sent" : "received";
  console.log(msg);
  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatMessage;
