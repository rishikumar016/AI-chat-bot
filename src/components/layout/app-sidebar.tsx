import { useNavigate } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useLayout } from '@/context/layout-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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
        <div className='mb-1'>
          <h2 className='font-manrope text-base font-bold tracking-tight text-foreground'>
            Curated History
          </h2>
          <p className='text-xs tracking-wide text-muted-foreground'>
            Your creative archive
          </p>
        </div>
        <Button
          onClick={() => navigate({ to: '/chat' })}
          className='mt-3 w-full justify-center gap-2 rounded-full bg-craft-gold py-5 font-manrope text-sm font-semibold text-white shadow-none hover:bg-craft-gold/90'
        >
          <Plus className='size-4' />
          New Craft Session
        </Button>
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
