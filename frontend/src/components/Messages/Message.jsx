import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import { MdDelete } from "react-icons/md";
import useUpdateMessage from "../../hooks/useUpdateMessage";
import { useSocketContext } from "../../context/SocketContext";
import useDeleteMessage from "../../hooks/useDeleteMessage";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation, selectedMessage, setSelectedMessage } =
    useConversation();
  const { loading, update } = useUpdateMessage();
  const {deleteMsg,deleting} = useDeleteMessage();
  const [updatedMessage, setUpdateMessage] = useState("");
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket && selectedMessage) {
      socket.on("messageUpdated", (updatedMessage) => {
        setUpdateMessage(updatedMessage);
      });
    }

    return () => socket.off("messageUpdated");
  }, [socket, selectedMessage]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (loading) return;
    await update(selectedMessage.message);
    const dialog = document.getElementById("my_modal_1");
    dialog.close();

    const updatedMessage = {
      ...selectedMessage,
      message: selectedMessage.message,
    };
    setSelectedMessage(updatedMessage);
  };

  const handleDelete = async() => {
    if(deleting) return;
    await deleteMsg();
    const dialog = document.getElementById("my_modal_1");
    if(dialog) {
      dialog.close();
    }
    setSelectedMessage(null);
  }

  const fromMe = authUser._id === message.senderId;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const formattedTime = extractTime(message.createdAt);

  const bubbleBg = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <>
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
        {message.message && (
          <div
            onClick={() => { authUser._id === message.senderId &&
              document.querySelector("#my_modal_1").showModal();
              setSelectedMessage(message);
            }}
            className={`chat-bubble ${bubbleBg} ${shakeClass}`}
          >
            {message._id === updatedMessage.messageId
              ? updatedMessage.updatedMessage.message
              : message.message}
          </div>
        )}
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {formattedTime}
        </div>
      </div>
        {
          authUser._id === message.senderId && (
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
          <h3 className="font-bold text-lg">Edit your message</h3>
          <input
            value={selectedMessage?.message || ""}
            onChange={(e) =>
              setSelectedMessage({
                ...selectedMessage,
                message: e.target.value,
              })
            }
            className="mt-2 p-2  rounded-lg w-full"
          />
          <div className="modal-action justify-between items-center">
            {
              deleting ? (
                <div className="loading loading-spinner"></div>
              ) : (
                <MdDelete onClick={handleDelete} className="cursor-pointer hover:text-red-500" size={25} />
              )
            }
            <form method="dialog" className="flex gap-4">
              <button className="btn">Close</button>
              <button onClick={handleUpdate} className="btn bg-blue-500">
                {loading ? (
                  <div className="loading loading-spinner"></div>
                ) : (
                  "Edit"
                )}
              </button>
            </form>
          </div>
        </div>
      </dialog>
          )
        }
    </>
  );
};

export default Message;
