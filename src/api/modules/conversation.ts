import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Conversation } from '@/features/chat/types'
import { apiClient } from './auth'

// ── Response types (match backend shapes) ─────────────────────────────

interface CreateConversationResponse {
  id: string
  title: string
  messages: []
  userMessage?: {
    id: string
    role: string
    content: string
    timestamp: string
  }
  assistantMessage?: {
    id: string
    role: string
    content: string
    timestamp: string
  }
  tokensUsed?: number
}

interface ConversationListItem {
  _id: string
  title: string
  createdAt: string
  updatedAt: string
}

interface SendMessageResponse {
  userMessage: {
    id: string
    role: string
    content: string
    timestamp: string
  }
  assistantMessage: {
    id: string
    role: string
    content: string
    timestamp: string
  }
  tokensUsed: number
}

// ── Raw API calls ─────────────────────────────────────────────────────

export const chatApi = {
  createConversation: (data?: { content?: string }) =>
    apiClient.post<CreateConversationResponse>(
      '/chat/conversations',
      data ?? {}
    ),

  getConversations: () =>
    apiClient.get<ConversationListItem[]>('/chat/conversations'),

  getConversation: (id: string) =>
    apiClient.get<Conversation>(`/chat/conversations/${id}`),

  deleteConversation: (id: string) =>
    apiClient.delete(`/chat/conversations/${id}`),

  sendMessage: (conversationId: string, content: string) =>
    apiClient.post<SendMessageResponse>(
      `/chat/conversations/${conversationId}/messages`,
      { content }
    ),
}

// ── Query keys ────────────────────────────────────────────────────────

export const chatKeys = {
  all: ['chat'] as const,
  conversations: () => [...chatKeys.all, 'conversations'] as const,
  conversation: (id: string) => [...chatKeys.all, 'conversation', id] as const,
}

// ── React Query hooks ─────────────────────────────────────────────────

export function useChatHooks() {
  const queryClient = useQueryClient()

  return {
    useConversations: () => {
      return useQuery({
        queryKey: chatKeys.conversations(),
        queryFn: async () => {
          const res = await chatApi.getConversations()
          return res.data
        },
      })
    },

    useConversationById: (id: string) => {
      return useQuery({
        queryKey: chatKeys.conversation(id),
        queryFn: async () => {
          const res = await chatApi.getConversation(id)
          return res.data
        },
        enabled: !!id,
      })
    },

    useCreateConversation: () => {
      return useMutation({
        mutationFn: (data?: { content?: string }) =>
          chatApi.createConversation(data),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: chatKeys.conversations(),
          })
        },
      })
    },

    useDeleteConversation: () => {
      return useMutation({
        mutationFn: (id: string) => chatApi.deleteConversation(id),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: chatKeys.conversations(),
          })
        },
      })
    },

    useSendMessage: () => {
      return useMutation({
        mutationFn: ({
          conversationId,
          content,
        }: {
          conversationId: string
          content: string
        }) => chatApi.sendMessage(conversationId, content),
        onSuccess: (_data, variables) => {
          queryClient.invalidateQueries({
            queryKey: chatKeys.conversation(variables.conversationId),
          })
        },
      })
    },
  }
}
