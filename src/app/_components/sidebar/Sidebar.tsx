import React from 'react'
import DesktopSidebarHeader from './DesktopSidebarHeader'
import getCurrentUser from '@/app/actions/getCurrentUser'
import getConversations from '@/app/actions/getConversations';
import ConversationList from '@/app/conversations/_components/ConversationList';

const Sidebar = async ({children}: {children: React.ReactNode}) => {

  const {currentUserPrisma} = await getCurrentUser();

  const conversations = await getConversations();
  return (
    <div className='h-full w-screen flex'>
      <aside className='h-full min-w-[300px] bg-zinc-400'>
        <DesktopSidebarHeader />
        <ConversationList
        />
      </aside>
      <main>
        {children}
      </main>
      
    </div>
  )
}

export default Sidebar
