import React, { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessages from "../../hooks/useSendMessages";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from "../../hooks/usePreviewImg";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessages();
  const imageRef = useRef(null);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(!message && !imgUrl) return;
    await sendMessage(message, imgUrl);
    setMessage("");
    setImgUrl("");
  };

  return (
    <>
      <form className="px-4 my-3" onSubmit={handleSendMessage}>
        <div className="w-full flex items-center gap-2 relative">
          <BsFillImageFill
            onClick={() => imageRef.current.click()}
            className="cursor-pointer"
          />
          <input
            type="file"
            ref={imageRef}
            className="hidden"
            onChange={handleImageChange}
          />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Send a message"
            className="border text-sm rounded-lg block w-full p-2.5 border-gray-600"
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <BsSend />
            )}
          </button>
        </div>
      </form>
      {imgUrl && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full z-50">
            <div className="flex justify-end">
              <button
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={() => setImgUrl("")}
              >
                Close
              </button>
            </div>
            <div className="mt-4 mb-4">
              <img
                src={imgUrl}
                alt="Preview"
                className="w-full max-sm:w-80 h-96"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={handleSendMessage}
              >
                {loading ? (
                  <div className="loading loading-spinner"></div>
                ) : (
                  <BsSend className="size-7 text-black" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageInput;
