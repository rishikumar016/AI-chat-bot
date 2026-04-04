import { useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'
import { useChatStore } from '@/stores/chat-store'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Message } from '../types'
import { ChatMessage } from './chat-message'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const { isTyping } = useChatStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <ScrollArea className='flex-1 px-4'>
      <div ref={scrollRef} className='mx-auto max-w-3xl py-4'>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className='flex items-center gap-2 py-4 text-muted-foreground'>
            <Loader2 className='size-4 animate-spin' />
            <span className='text-sm'>AI is thinking...</span>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
