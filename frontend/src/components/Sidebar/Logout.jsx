import React from 'react'
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';

const Logout = () => {
  const {loading,logout} = useLogout();
  return (
    <div className='lg:mt-auto'>
      {
        !loading ? (<BiLogOut onClick={logout} className='w-6 h-6 cursor-pointer' />) : ( <span className='loading loading-spinner'></span> )
      }
    </div>
  )
}

export default Logout
