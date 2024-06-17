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
        <NewContactSheet  handleAddContact={() => {}}/>
        <NewChatSheet  currentUser={currentUser}/>
    </div>
  )
}

export default DesktopSidebarHeader
