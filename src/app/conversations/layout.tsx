import React from 'react'
import Sidebar from '../_components/sidebar/Sidebar'

const conversationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <div className='h-full w-full flex justify-center bg-gray-200'>
        {children}
      </div>
    </Sidebar>
  )
}

export default conversationLayout
