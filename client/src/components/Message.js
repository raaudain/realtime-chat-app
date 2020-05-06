import React from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="messageContainer">
      <p className="sentText">{trimmedName}</p>
      <div className="messageBox">
        <p className="messageText">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer">
      <div className="messageBox">
        <p className="messageText">{text}</p>
      </div>
      <p className="sentText">{user}</p>
    </div>
  );
};

export default Message;
