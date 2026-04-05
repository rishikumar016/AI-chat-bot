import { Sparkles, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Message } from '../types'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'flex w-full gap-3 py-4',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-foreground text-background'
            : 'bg-craft-gold-glow text-craft-gold'
        )}
      >
        {isUser ? <User className='h-4 w-4' /> : <Sparkles className='h-4 w-4' />}
      </div>
      <div
        className={cn(
          'flex max-w-[80%] flex-col gap-1',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        {!isUser && (
          <span className='mb-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground'>
            The Curator
          </span>
        )}
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5',
            isUser
              ? 'bg-craft-surface-low text-foreground'
              : 'bg-transparent text-foreground'
          )}
        >
          <p className='text-sm leading-relaxed whitespace-pre-wrap'>{message.content}</p>
        </div>
        <span className='text-[10px] uppercase tracking-[0.15em] text-muted-foreground'>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  )
}
