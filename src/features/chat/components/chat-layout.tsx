import { useEffect } from 'react'
import { Outlet, useParams } from '@tanstack/react-router'
import { useChatStore } from '@/stores/chat-store'
import { mockConversations } from '../data/mock-data'

export function ChatLayout() {
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

  return <Outlet />
}
