import { create } from 'zustand'

interface ChatState {
  activeConversationId: string | null
  isTyping: boolean
  setActiveConversation: (id: string | null) => void
  setIsTyping: (isTyping: boolean) => void
}

export const useChatStore = create<ChatState>()((set) => ({
  activeConversationId: null,
  isTyping: false,
  setActiveConversation: (id) => set({ activeConversationId: id }),
  setIsTyping: (isTyping) => set({ isTyping }),
}))
