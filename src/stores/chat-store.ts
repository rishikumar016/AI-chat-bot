import { create } from 'zustand'
import type { Conversation, Message } from '@/features/chat/types'

interface ChatState {
  conversations: Conversation[]
  activeConversationId: string | null
  isTyping: boolean
  setConversations: (conversations: Conversation[]) => void
  setActiveConversation: (id: string | null) => void
  setIsTyping: (isTyping: boolean) => void
  createConversation: (title?: string) => string
  deleteConversation: (id: string) => void
  addMessage: (conversationId: string, message: Omit<Message, 'id'>) => void
  getActiveConversation: () => Conversation | undefined
}

const generateId = () => Math.random().toString(36).substring(2, 15)

export const useChatStore = create<ChatState>()((set, get) => ({
  conversations: [],
  activeConversationId: null,
  isTyping: false,

  setConversations: (conversations) => set({ conversations }),

  setActiveConversation: (id) => set({ activeConversationId: id }),

  setIsTyping: (isTyping) => set({ isTyping }),

  createConversation: (title = 'New Chat') => {
    const id = generateId()
    const newConversation: Conversation = {
      id,
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      activeConversationId: id,
    }))
    return id
  },

  deleteConversation: (id) => {
    set((state) => {
      const newConversations = state.conversations.filter((c) => c.id !== id)
      const newActiveId =
        state.activeConversationId === id
          ? (newConversations[0]?.id ?? null)
          : state.activeConversationId
      return {
        conversations: newConversations,
        activeConversationId: newActiveId,
      }
    })
  },

  addMessage: (conversationId, message) => {
    const newMessage: Message = {
      ...message,
      id: generateId(),
    }
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              updatedAt: new Date(),
              title:
                conv.messages.length === 0 && message.role === 'user'
                  ? message.content.slice(0, 30) +
                    (message.content.length > 30 ? '...' : '')
                  : conv.title,
            }
          : conv
      ),
    }))
  },

  getActiveConversation: () => {
    const state = get()
    return state.conversations.find((c) => c.id === state.activeConversationId)
  },
}))
