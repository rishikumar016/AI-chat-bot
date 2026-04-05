import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowUp, Paperclip, Sparkles, PenLine } from 'lucide-react'
import { useChatStore } from '@/stores/chat-store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Main } from '@/components/layout/main'

const quickActions = [
  'Refine the aesthetic',
  "Explain 'Gallery Mode'",
  'Show visual examples',
]

export function CraftHome() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const { createConversation, addMessage, setIsTyping } = useChatStore()

  const handleSubmit = () => {
    if (!input.trim()) return
    const conversationId = createConversation(input.trim().slice(0, 40))
    addMessage(conversationId, {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    })
    setIsTyping(true)
    setTimeout(() => {
      addMessage(conversationId, {
        role: 'assistant',
        content: `This is a simulated response to: "${input.trim()}"`,
        timestamp: new Date(),
      })
      setIsTyping(false)
    }, 1500)
    setInput('')
    navigate({ to: '/chat/$conversationId', params: { conversationId } })
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
      <Main>
        <div className='flex flex-1 flex-col items-center justify-center px-4'>
          {/* Ambient gold glow behind content */}
          <div
            className='pointer-events-none absolute inset-0 flex items-center justify-center'
            aria-hidden='true'
          >
            <div className='h-100 w-150 rounded-full bg-craft-gold-glow blur-3xl' />
          </div>

          <div className='relative z-10 w-full max-w-200'>
            {/* AI Response Area - simulated conversation display */}
            <div className='mb-16 text-center'>
              {/* User question bubble */}
              <div className='mb-4 flex justify-end'>
                <div className='rounded-2xl bg-craft-surface-low px-5 py-3 text-sm text-foreground'>
                  What is the philosophy of Craft AI?
                </div>
              </div>
              <p className='mb-6 text-right text-[10px] tracking-[0.2em] text-muted-foreground uppercase'>
                Sent just now
              </p>

              {/* The Curator response */}
              <div className='text-left'>
                <div className='mb-5 flex items-center gap-2'>
                  <div className='flex h-7 w-7 items-center justify-center rounded-full bg-craft-gold-glow'>
                    <Sparkles className='h-3.5 w-3.5 text-craft-gold' />
                  </div>
                  <span className='text-[10px] tracking-[0.25em] text-muted-foreground uppercase'>
                    The Curator
                  </span>
                </div>

                <h2 className='font-manrope text-3xl leading-tight font-semibold tracking-tight text-foreground md:text-4xl'>
                  Craft AI is built on the principle of{' '}
                  <span className='text-craft-gold'>
                    Luminous Weightlessness.
                  </span>
                </h2>

                <p className='mt-5 max-w-160 text-base leading-relaxed text-muted-foreground'>
                  We believe that intelligence should not be heavy or cluttered.
                  Instead, it should feel like a sophisticated gallery space—an
                  environment where negative space serves as a feature, allowing
                  your ideas the room they need to breathe and evolve.
                </p>

                {/* Feature cards */}
                <div className='mt-8 grid gap-4 sm:grid-cols-2'>
                  <div className='rounded-xl bg-craft-surface-low p-6'>
                    <PenLine className='mb-3 h-5 w-5 text-craft-gold' />
                    <h3 className='font-manrope text-base font-semibold text-foreground'>
                      Intentionality
                    </h3>
                    <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
                      Treating every interaction as a crafted piece of digital
                      art.
                    </p>
                  </div>
                  <div className='rounded-xl bg-craft-surface-low p-6'>
                    <Sparkles className='mb-3 h-5 w-5 text-craft-gold' />
                    <h3 className='font-manrope text-base font-semibold text-foreground'>
                      Ethereal Clarity
                    </h3>
                    <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
                      Clarity achieved through soft gradients and editorial
                      hierarchy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input area */}
            <div
              className='relative overflow-hidden rounded-2xl bg-craft-surface-bright'
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
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Whisper your next creative intent...'
                  className='min-h-10 flex-1 resize-none border-0 bg-transparent px-1 py-2 text-sm text-foreground shadow-none placeholder:text-muted-foreground focus-visible:ring-0'
                  rows={1}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  size='icon'
                  className='shrink-0 rounded-full bg-foreground text-background hover:bg-foreground/90 disabled:opacity-30'
                >
                  <ArrowUp className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Quick action chips */}
            <div className='mt-4 flex flex-wrap justify-center gap-2'>
              {quickActions.map((action) => (
                <button
                  key={action}
                  onClick={() => handleQuickAction(action)}
                  className='rounded-full border border-border bg-craft-surface-bright px-4 py-1.5 text-xs text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground'
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Main>
  )
}
