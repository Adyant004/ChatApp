import React, { useState } from 'react'
import { BsSend } from 'react-icons/bs'
import useSendMessages from '../../hooks/useSendMessages';

const MessageInput = () => {
  const [message,setMessage] = useState("");
  const { loading,sendMessage } = useSendMessages();

  const handleSendMessage = async(e) => {
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  }
  return (
    <form className='px-4 my-3' onSubmit={handleSendMessage}>
      <div className='w-full relative'>
        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder='Send a message' className='border text-sm rounded-lg block w-full p-2.5 border-gray-600 ' />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3' >
            { loading ?  <div className='loading loading-spinner'></div> : <BsSend />}
        </button>
      </div>
    </form>
  )
}

export default MessageInput
