import { useEffect } from 'react'
import { useChatStore } from '@/stores/chat-store'
import { ChatArea } from '@/features/chat/components/chat-area'

export function CraftHome() {
  const { setActiveConversation } = useChatStore()

  // Clear active conversation so ChatArea shows EmptyChat + MessageInput
  useEffect(() => {
    setActiveConversation(null)
  }, [setActiveConversation])

  return <ChatArea />
}
