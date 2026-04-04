import { useChatStore } from '@/stores/chat-store'
import { EmptyChat } from './empty-chat'
import { MessageInput } from './message-input'
import { MessageList } from './message-list'

export function ChatArea() {
  const { getActiveConversation } = useChatStore()
  const activeConversation = getActiveConversation()

  const hasMessages =
    activeConversation && activeConversation.messages.length > 0

  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      {hasMessages ? (
        <MessageList messages={activeConversation.messages} />
      ) : (
        <EmptyChat />
      )}
      <MessageInput />
    </div>
  )
}
