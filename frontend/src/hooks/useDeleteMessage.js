import { useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useDeleteMessage = () => {
    const [deleting,setDeleting] = useState(false);
    const {selectedMessage,messages,setMessages} = useConversation();

    const deleteMsg = async() => {
        setDeleting(true);
        try {
            const res = await fetch(`/api/message/delete/${selectedMessage?._id}`, {
                method: "DELETE",
                headers: { "Content-Type" : "application/json"}   
            })

            const data = await res.json();

            if(data.error) {
                throw new Error(data.error);
            }

            const msg = messages.filter(msg => msg._id !== data);
            setMessages(msg);
            toast.success("Message deleted successfully!");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setDeleting(false);
        }
    }

  return {deleteMsg,deleting} 
}

export default useDeleteMessage
