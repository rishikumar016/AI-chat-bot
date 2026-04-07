import { useState, useRef, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useApi } from '@/api'
import { ArrowUp, Paperclip } from 'lucide-react'
import { useChatStore } from '@/stores/chat-store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface MessageInputProps {
  conversationId?: string
}

export function MessageInput({ conversationId }: MessageInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()
  const { isTyping, setIsTyping } = useChatStore()
  const { useCreateConversation, useSendMessage } = useApi()
  const createConversation = useCreateConversation()
  const sendMessage = useSendMessage()

  useEffect(() => {
    textareaRef.current?.focus()
  }, [conversationId])

  const handleSubmit = async () => {
    if (!input.trim() || isTyping) return

    const content = input.trim()
    setInput('')
    setIsTyping(true)

    try {
      if (!conversationId) {
        // Create a new conversation with the first message
        const res = await createConversation.mutateAsync({ content })
        setIsTyping(false)
        navigate({
          to: '/chat/$conversationId',
          params: { conversationId: res.data.id },
        })
      } else {
        // Send message to existing conversation
        await sendMessage.mutateAsync({
          conversationId,
          content,
        })
        setIsTyping(false)
      }
    } catch {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className='p-4'>
      <div
        className='mx-auto max-w-3xl overflow-hidden rounded-2xl bg-craft-surface-bright'
        style={{ boxShadow: 'var(--craft-ambient-shadow)' }}
      >
        <div className='flex items-end gap-2 p-3'>
          <Button
            variant='ghost'
            size='icon'
            className='shrink-0 rounded-full text-muted-foreground hover:text-foreground'
          >
            <Paperclip className='h-4 w-4' />
          </Button>
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Whisper your next creative intent...'
            className='max-h-32 min-h-10 flex-1 resize-none border-0 bg-transparent px-1 py-2 text-sm text-foreground shadow-none placeholder:text-muted-foreground focus-visible:ring-0'
            rows={1}
            disabled={isTyping}
          />
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || isTyping}
            size='icon'
            className='shrink-0 rounded-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-30'
          >
            <ArrowUp className='h-4 w-4' />
            <span className='sr-only'>Send message</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
