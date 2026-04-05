import { useEffect, useRef } from 'react'
import { Sparkles } from 'lucide-react'
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
      <div ref={scrollRef} className='mx-auto max-w-3xl py-6'>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className='flex items-center gap-2.5 py-4'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-craft-gold-glow'>
              <Sparkles className='h-4 w-4 animate-pulse text-craft-gold' />
            </div>
            <span className='text-xs uppercase tracking-[0.15em] text-muted-foreground'>
              The Curator is composing...
            </span>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
