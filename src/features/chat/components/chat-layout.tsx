import { useEffect } from 'react'
import { Outlet, useParams } from '@tanstack/react-router'
import { useChatStore } from '@/stores/chat-store'
import { getCookie } from '@/lib/cookies'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { mockConversations } from '../data/mock-data'
import { ChatSidebar } from './chat-sidebar'
import { ChatTopbar } from './chat-topbar'

export function ChatLayout() {
  const defaultOpen = getCookie('sidebar_state') !== 'false'
  const { conversationId } = useParams({ strict: false })
  const { setConversations, setActiveConversation, conversations } =
    useChatStore()

  useEffect(() => {
    if (conversations.length === 0) {
      setConversations(mockConversations)
    }
  }, [conversations.length, setConversations])

  useEffect(() => {
    if (conversationId) {
      setActiveConversation(conversationId)
    } else {
      setActiveConversation(null)
    }
  }, [conversationId, setActiveConversation])

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <ChatSidebar />
      <SidebarInset className='h-svh'>
        <ChatTopbar />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
