import React from "react";

const MessageItem = ({ message }) => {
  return (
    <div>
      <p>
        <strong>{message.sender_username}: </strong>
        {message.content}
      </p>
      <small>{message.timestamp}</small>
    </div>
  );
};

export default MessageItem;
