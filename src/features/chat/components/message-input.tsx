import { useState, useRef, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Send } from 'lucide-react'
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
    <div className='border-t bg-background p-4'>
      <div className='mx-auto flex max-w-3xl gap-2'>
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Type a message...'
          className='max-h-32 min-h-[44px] resize-none'
          rows={1}
          disabled={isTyping}
        />
        <Button
          onClick={handleSubmit}
          disabled={!input.trim() || isTyping}
          size='icon'
          className='shrink-0'
        >
          <Send className='size-4' />
          <span className='sr-only'>Send message</span>
        </Button>
      </div>
      <p className='mx-auto mt-2 max-w-3xl text-center text-xs text-muted-foreground'>
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  )
}
