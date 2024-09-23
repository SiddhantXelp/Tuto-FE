import { Icon } from '@iconify/react';
import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Icon icon="material-symbols:dashboard" width="20" height="20" color='gray' />,
    activePaths: ['/dashboard', '/dashboard/overview']
  },
  {
    title: 'Class Management',
    path: '/classManagement',
    icon: <Icon icon="ic:baseline-class" width="20" height="20" color='gray' />,
    activePaths: ['/classManagement']

  },
  {
    title: 'Assignments',
    path: '/assignments',
    icon: <Icon icon="material-symbols:assignment" width="20" height="20" color='gray' />,
    activePaths: ['/assignments', '/assignments/overview']
  },
  {
    title: 'Inbox',
    path: '/inbox',
    icon: <Icon icon="solar:inbox-bold" width="20" height="20" color='gray' />,
    activePaths: ['/inbox', '/inbox/overview']
  },
  {
    title: 'Student',
    path: '/student',
    activePaths: ['/student', '/onboarding','/groupBasedTable'],
    icon: <Icon icon="ph:student-bold" width="20" height="20" color='gray' />,
  },
  {
    title: 'My Files',
    path: '/myFiles',
    subPaths: ['/myFiles'],
    icon: <Icon icon="mdi:file" width="20" height="20" color='gray' />,
  },
  {
    title: 'Payment & Billing',
    path: '/payment',
    icon: <Icon icon="material-symbols:payments-outline-rounded" width="20" height="20" color='gray' />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Icon icon="lucide:settings" width="20" height="20" color='gray' />,
    activePaths: ['/settings', '/settings/account', '/settings/privacy']
  },
  {
    title: 'Help',
    path: '/help',
    icon: <Icon icon="lucide:help-circle" width="20" height="20" color='gray' />,
    subPaths: ['/help/myHelp', '/help/newHelp'],
  },
];
