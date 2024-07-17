import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <Icon icon="material-symbols:dashboard" width="24" height="24" color='gray'/>,
  },
  {
    title: 'Class Management',
    path: '/classManagement',
    icon: <Icon icon="ic:baseline-class" width="24" height="24" color='gray'/>,
    // submenu: true,
    // subMenuItems: [
    //   { title: 'All', path: '/projects' },
    //   { title: 'Web Design', path: '/projects/web-design' },
    //   { title: 'Graphic Design', path: '/projects/graphic-design' },
    // ],
  },
  {
    title: 'Assignments',
    path: '/assignments',
    icon: <Icon icon="material-symbols:assignment" width="24" height="24" color='gray' />,
  },
  {
    title: 'Inbox',
    path: '/inbox',
    icon: <Icon icon="solar:inbox-bold" width="24" height="24" color='gray'/>,
    // submenu: true,
    // subMenuItems: [
    //   { title: 'Account', path: '/settings/account' },
    //   { title: 'Privacy', path: '/settings/privacy' },
    // ],
  },
  {
    title: 'Student',
    path: '/student',
    icon: <Icon icon="ph:student-bold" width="24" height="24" color='gray'/>,
  },
  {
    title: 'My Files',
    path: '/myFiles',
    icon: <Icon icon="mdi:file" width="24" height="24" color='gray'/>,
  },
  {
    title: 'Payment & Billing',
    path: '/payment&billing',
    icon: <Icon icon="material-symbols:payments-outline-rounded" width="24" height="24" color='gray'/>,
  },
  {
    title: 'Setting',
    path: '/setting',
    icon: <Icon icon="lucide:settings" width="24" height="24" color='gray'/>,
  },
  {
    title: 'Help',
    path: '/help',
    icon: <Icon icon="lucide:help-circle" width="24" height="24" color='gray'/>,
  },
];
