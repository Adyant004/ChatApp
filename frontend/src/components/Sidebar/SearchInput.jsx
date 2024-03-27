import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    console.log(search);
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

    if(conversation){
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2' >
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search here' className='input input-bordered rounded-full' />
        <button type='submit' className='btn btn-circle ' >
            <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}

export default SearchInput
