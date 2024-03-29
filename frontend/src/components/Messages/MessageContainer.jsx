import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation,setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(()=>{

    return () => {
      setSelectedConversation(null)
    }
  },[setSelectedConversation])
  return (
    <div className="md:min-w-[450px] w-full max-sm:max-h-96 flex flex-col ">
      {!selectedConversation ? (
        <NoChatSelected fullName={authUser.fullName} />
      ) : (
        <>
          <div className=" px-4 py-2 mb-2">
            <span className="label-text">To:</span>
            <span className=" font-bold">{selectedConversation.fullName}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = ({fullName}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
