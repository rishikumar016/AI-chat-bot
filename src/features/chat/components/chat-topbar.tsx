import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeSwitch } from '@/components/theme-switch'

export function ChatTopbar() {
  return (
    <header className='flex h-14 shrink-0 items-center gap-2 border-b px-4'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='h-4' />
      <div className='flex-1' />
      <ThemeSwitch />
    </header>
  )
}
