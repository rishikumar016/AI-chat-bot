import { Bot, Code, Lightbulb, MessageSquare } from 'lucide-react'

const suggestions = [
  {
    icon: Code,
    title: 'Help me debug',
    description: 'Find and fix issues in my code',
  },
  {
    icon: Lightbulb,
    title: 'Explain a concept',
    description: 'Learn about programming topics',
  },
  {
    icon: MessageSquare,
    title: 'Write code',
    description: 'Generate code snippets and solutions',
  },
]

export function EmptyChat() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center px-4'>
      <div className='flex size-16 items-center justify-center rounded-full bg-primary/10'>
        <Bot className='size-8 text-primary' />
      </div>
      <h1 className='mt-6 text-2xl font-semibold'>How can I help you today?</h1>
      <p className='mt-2 text-center text-muted-foreground'>
        Start a conversation or try one of these suggestions
      </p>
      <div className='mt-8 grid w-full max-w-2xl gap-4 sm:grid-cols-3'>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.title}
            className='flex flex-col items-center gap-2 rounded-lg border bg-card p-4 text-center transition-colors hover:bg-accent'
          >
            <suggestion.icon className='size-6 text-muted-foreground' />
            <span className='font-medium'>{suggestion.title}</span>
            <span className='text-sm text-muted-foreground'>
              {suggestion.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
