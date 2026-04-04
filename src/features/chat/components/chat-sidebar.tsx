import { Link, useNavigate } from '@tanstack/react-router'
import { MessageSquarePlus, Settings, Trash2 } from 'lucide-react'
import { useChatStore } from '@/stores/chat-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

export function ChatSidebar() {
  const navigate = useNavigate()
  const {
    conversations,
    activeConversationId,
    createConversation,
    deleteConversation,
  } = useChatStore()

  const handleNewChat = () => {
    const id = createConversation()
    navigate({ to: '/chat/$conversationId', params: { conversationId: id } })
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    deleteConversation(id)
    if (activeConversationId === id) {
      navigate({ to: '/chat' })
    }
  }

  const groupConversationsByDate = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const lastWeek = new Date(today)
    lastWeek.setDate(lastWeek.getDate() - 7)

    const groups: { label: string; conversations: typeof conversations }[] = []

    const todayConvs = conversations.filter((c) => c.updatedAt >= today)
    const yesterdayConvs = conversations.filter(
      (c) => c.updatedAt >= yesterday && c.updatedAt < today
    )
    const lastWeekConvs = conversations.filter(
      (c) => c.updatedAt >= lastWeek && c.updatedAt < yesterday
    )
    const olderConvs = conversations.filter((c) => c.updatedAt < lastWeek)

    if (todayConvs.length > 0)
      groups.push({ label: 'Today', conversations: todayConvs })
    if (yesterdayConvs.length > 0)
      groups.push({ label: 'Yesterday', conversations: yesterdayConvs })
    if (lastWeekConvs.length > 0)
      groups.push({ label: 'Last 7 days', conversations: lastWeekConvs })
    if (olderConvs.length > 0)
      groups.push({ label: 'Older', conversations: olderConvs })

    return groups
  }

  const conversationGroups = groupConversationsByDate()

  return (
    <Sidebar>
      <SidebarHeader className='p-4'>
        <Button
          onClick={handleNewChat}
          className='w-full justify-start gap-2'
          variant='outline'
        >
          <MessageSquarePlus className='size-4' />
          New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className='flex-1'>
          {conversationGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.conversations.map((conversation) => (
                    <SidebarMenuItem key={conversation.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={conversation.id === activeConversationId}
                      >
                        <Link
                          to='/chat/$conversationId'
                          params={{ conversationId: conversation.id }}
                          className={cn(
                            'truncate',
                            conversation.id === activeConversationId &&
                              'font-medium'
                          )}
                        >
                          {conversation.title}
                        </Link>
                      </SidebarMenuButton>
                      <SidebarMenuAction
                        onClick={(e) => handleDelete(e, conversation.id)}
                        showOnHover
                      >
                        <Trash2 className='size-4' />
                        <span className='sr-only'>Delete</span>
                      </SidebarMenuAction>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className='p-4'>
        <Button variant='ghost' className='w-full justify-start gap-2'>
          <Settings className='size-4' />
          Settings
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
