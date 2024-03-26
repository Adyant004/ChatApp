import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import Logout from './Logout'

const Sidebar = () => {
  return (
    <div className='flex flex-col p-4 border-slate-500' >
      <SearchInput />
      <div className='divider' />
      <Conversations />
      <Logout />
    </div>
  )
}

export default Sidebar
