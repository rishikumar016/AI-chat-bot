import {
  MessageSquarePlus,
  Clock,
  Bookmark,
  Archive,
  Settings,
  Palette,
  Bell,
  Monitor,
  UserCog,
  Wrench,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Alex Chen',
    email: 'alex@craftai.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Craft AI',
      logo: MessageSquarePlus,
      plan: 'Premium Creator',
    },
  ],
  navGroups: [
    {
      title: 'Curated History',
      items: [
        {
          title: 'Recent Conversations',
          url: '/chat',
          icon: Clock,
        },
        {
          title: 'Saved Prompts',
          url: '/chat',
          icon: Bookmark,
        },
        {
          title: 'Archive',
          url: '/chat',
          icon: Archive,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
      ],
    },
  ],
}
