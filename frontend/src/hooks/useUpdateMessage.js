import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useUpdateMessage = () => {
    const [loading,setLoading] = useState(false);
    const { selectedMessage,messages,setMessages } = useConversation();

    const update = async(updatedMessage) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/message/update/${selectedMessage._id}`,{
                method: "PATCH",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ message: updatedMessage }),
            })

            const data = await res.json();

            if(data.error) {
                throw new Error(data.error);
            }


            const msgIndex = messages.findIndex(msg => msg._id === data._id)

            const updatedMsg = [...messages];
            updatedMsg[msgIndex] = {
              ...updatedMsg[msgIndex],
              message: data.message
            };

            setMessages(updatedMsg);
            toast.success("Message updated successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

  return {loading,update} 
}

export default useUpdateMessage
