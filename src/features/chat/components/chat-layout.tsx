import { useEffect } from 'react'
import { Outlet, useParams } from '@tanstack/react-router'
import { useChatStore } from '@/stores/chat-store'

export function ChatLayout() {
  const { conversationId } = useParams({ strict: false })
  const { setActiveConversation } = useChatStore()

  useEffect(() => {
    if (conversationId) {
      setActiveConversation(conversationId)
    }
  }, [conversationId, setActiveConversation])

  return <Outlet />
}
