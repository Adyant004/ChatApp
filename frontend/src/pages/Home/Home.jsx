import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import MessageContainer from '../../components/Messages/MessageContainer'

const Home = () => {
  return (
    <div className="flex max-sm:items-center max-sm:flex-col sm:h-[450px] md:h-[550px] rounded-lg" >
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home
