import { SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeSwitch } from '@/components/theme-switch'

export function ChatTopbar() {
  return (
    <header className='flex h-14 shrink-0 items-center gap-4 px-4 sm:px-6'>
      <SidebarTrigger variant='ghost' className='text-muted-foreground hover:text-foreground' />
      <div className='flex-1' />
      <nav className='flex items-center gap-5'>
        <span className='text-sm font-medium text-craft-gold'>Workspace</span>
        <span className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer'>Templates</span>
        <span className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer'>Showcase</span>
        <ThemeSwitch />
      </nav>
    </header>
  )
}
