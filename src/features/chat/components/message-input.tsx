import { useState, useRef, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowUp, Paperclip } from 'lucide-react'
import { useChatStore } from '@/stores/chat-store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function MessageInput() {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()
  const {
    activeConversationId,
    addMessage,
    createConversation,
    setIsTyping,
    isTyping,
  } = useChatStore()

  useEffect(() => {
    textareaRef.current?.focus()
  }, [activeConversationId])

  const handleSubmit = async () => {
    if (!input.trim() || isTyping) return

    let conversationId = activeConversationId

    if (!conversationId) {
      conversationId = createConversation()
      navigate({ to: '/chat/$conversationId', params: { conversationId } })
    }

    addMessage(conversationId, {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    })

    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      addMessage(conversationId!, {
        role: 'assistant',
        content: `This is a simulated response to: "${input.trim()}"\n\nIn a real implementation, this would be connected to an AI backend.`,
        timestamp: new Date(),
      })
      setIsTyping(false)
    }, 1500)
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
