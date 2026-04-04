import type { Conversation } from '../types'

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Help with React hooks',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Can you explain how useEffect works in React?',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content:
          "useEffect is a React Hook that lets you synchronize a component with an external system. It runs after every render by default, but you can control when it runs by providing a dependency array.\n\nHere's the basic syntax:\n\n```jsx\nuseEffect(() => {\n  // Effect code here\n  return () => {\n    // Cleanup code (optional)\n  };\n}, [dependencies]);\n```\n\nThe dependency array determines when the effect runs:\n- No array: Runs after every render\n- Empty array []: Runs only once on mount\n- [dep1, dep2]: Runs when dep1 or dep2 changes",
        timestamp: new Date(Date.now() - 3500000),
      },
    ],
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3500000),
  },
  {
    id: 'conv-2',
    title: 'TypeScript generics question',
    messages: [
      {
        id: 'msg-3',
        role: 'user',
        content: 'What are TypeScript generics and when should I use them?',
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content:
          'TypeScript generics allow you to create reusable components that work with multiple types rather than a single one. They provide a way to make components type-safe without losing flexibility.\n\nHere\'s a simple example:\n\n```typescript\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\n// Usage\nconst num = identity<number>(42);\nconst str = identity<string>("hello");\n```\n\nYou should use generics when:\n1. You want type safety with flexible input types\n2. Building reusable utility functions/components\n3. Working with collections (arrays, maps, etc.)\n4. Creating type-safe APIs',
        timestamp: new Date(Date.now() - 86300000),
      },
    ],
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86300000),
  },
  {
    id: 'conv-3',
    title: 'CSS Flexbox layout help',
    messages: [
      {
        id: 'msg-5',
        role: 'user',
        content: 'How do I center a div both horizontally and vertically?',
        timestamp: new Date(Date.now() - 172800000),
      },
      {
        id: 'msg-6',
        role: 'assistant',
        content:
          'The easiest way to center a div both horizontally and vertically is using Flexbox:\n\n```css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh; /* or any specific height */\n}\n```\n\nAlternatively, you can use CSS Grid:\n\n```css\n.container {\n  display: grid;\n  place-items: center;\n  height: 100vh;\n}\n```\n\nBoth methods work great for modern browsers!',
        timestamp: new Date(Date.now() - 172700000),
      },
    ],
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172700000),
  },
]
