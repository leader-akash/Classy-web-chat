import React from 'react'

const conversationLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-full w-full flex justify-center bg-gray-200'>
        {children}
    </div>
  )
}

export default conversationLayout
