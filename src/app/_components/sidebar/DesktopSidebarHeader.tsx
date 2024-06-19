"use client"
import React from 'react'
import NewContactSheet from './sheets/NewContactSheet'
import NewChatSheet from './sheets/NewChatSheet'
import { User } from '@prisma/client'

interface DesktopSidebarHeaderProps {
  currentUser: User & {
    following: User[]
  }
}

const DesktopSidebarHeader = ({currentUser}: DesktopSidebarHeaderProps) => {
  return (
    <div>
        {/* <NewChatSheet  currentUser={currentUser}/> */}
    </div>
  )
}

export default DesktopSidebarHeader
