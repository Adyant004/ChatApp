import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = authUser._id === message.senderId;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const formattedTime = extractTime(message.createdAt);
  console.log(message.img);

  const bubbleBg = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName} `}>
      <div className="chat-image justify-end avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="chat avatar" />
        </div>
      </div>
      {message.img && (
        <>
          <img
            className="w-60 h-48 mb-2 rounded-md"
            src={message.img}
            alt="img message"
          />
        </>
      )}
      {
        message.message && (
          <div className={`chat-bubble ${bubbleBg} ${shakeClass}`}>
          {message.message}
        </div>
        )
      }
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
