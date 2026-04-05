import { useNavigate } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useLayout } from '@/context/layout-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
  const navigate = useNavigate()

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader className='px-4 pt-6 pb-2'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              tooltip='New Craft'
              onClick={() => navigate({ to: '/chat' })}
              className='rounded-full bg-craft-gold font-manrope font-semibold text-white shadow-none hover:bg-craft-gold/90 hover:text-white flex iten-center justify-center'
            >
              <Plus className='size-5' />
              <span className='group-data-[collapsible=icon]:hidden block'>New Craft</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='px-2'>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter className='p-4'>
        <div className='flex items-center gap-3'>
          <Avatar className='h-9 w-9 rounded-full'>
            <AvatarImage
              src={sidebarData.user.avatar}
              alt={sidebarData.user.name}
            />
            <AvatarFallback className='rounded-full text-xs'>
              {sidebarData.user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-start text-sm leading-tight'>
            <span className='truncate font-semibold text-foreground'>
              {sidebarData.user.name}
            </span>
            <span className='truncate text-xs text-muted-foreground'>
              Premium Creator
            </span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
