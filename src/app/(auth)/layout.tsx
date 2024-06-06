import React from 'react'
import {Logo} from './_components/logo'

const AuthLayout = ({children}: {children : React.ReactNode}) => {
  return (
    <div className='h-full flex flex-wrap items-center justify-center my-36 '>
        <div className='mr-0 md:mr-36 my-4 md:my-5'>
            <Logo/>
        </div>
      {children}
    </div>
  )
}

export default AuthLayout
