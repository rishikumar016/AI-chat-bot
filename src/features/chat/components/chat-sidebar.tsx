import { Link, useNavigate } from '@tanstack/react-router'
import { Plus, Trash2 } from 'lucide-react'
import { useChatStore } from '@/stores/chat-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
      <SidebarHeader className='px-4 pt-6 pb-2'>
        <div className='mb-1'>
          <h2 className='font-manrope text-base font-bold tracking-tight text-foreground'>
            Curated History
          </h2>
          <p className='text-xs tracking-wide text-muted-foreground'>
            Your creative archive
          </p>
        </div>
        <Button
          onClick={handleNewChat}
          className='mt-3 w-full justify-center gap-2 rounded-full bg-craft-gold py-5 font-manrope text-sm font-semibold text-white shadow-none hover:bg-craft-gold/90'
        >
          <Plus className='size-4' />
          New Craft Session
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
                            'truncate text-sm',
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
        <div className='flex items-center gap-3'>
          <Avatar className='h-9 w-9 rounded-full'>
            <AvatarImage src='/avatars/shadcn.jpg' alt='Alex Chen' />
            <AvatarFallback className='rounded-full text-xs'>AC</AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-start text-sm leading-tight'>
            <span className='truncate font-semibold text-foreground'>Alex Chen</span>
            <span className='truncate text-xs text-muted-foreground'>Premium Creator</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
