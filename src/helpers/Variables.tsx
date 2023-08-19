import profile from '../svg/profile.svg';
import liked from '../svg/heartEmpty.svg';
import logOut from '../svg/log-out--icon.svg';

export const profileTools = [
  { id: 0, title: 'Profile', img: profile },
  { id: 1, title: 'Saved', img: liked },
  { id: 2, title: 'Log out', img: logOut },
];

export const socialities = [
  { id: 0, name: 'UI/UX designer' },
  { id: 1, name: 'Front-end developer' },
  { id: 2, name: 'Back-end developer' },
  { id: 3, name: 'DevOps' },
  { id: 4, name: 'Project manager' },
  { id: 5, name: 'QA Engineer' },
  { id: 6, name: 'Mentor' },
  { id: 7, name: 'Full-stack developer' },
];

export const existContacts = [
  { platform: 'Email', url: '' },
  { platform: 'Discord', url: '' },
  { platform: 'Slack', url: '' },
  { platform: 'Telegram', url: '' },
  { platform: 'LinkedIn', url: '' },
  { platform: 'GitHub', url: '' },
];

export interface Communication {
  name: string,
  img: string,
  link: string,
}

export const communications = [
  { name: 'Email', img: 'bx bx-envelope', link: '' },
  { name: 'Discord', img: 'bx bxl-discord', link: '' },
  { name: 'Slack', img: 'bx bxl-slack', link: '' },
  { name: 'Telegram', img: 'bx bxl-telegram', link: '' },
  { name: 'LinkedIn', img: 'bx bxl-linkedin-square', link: '' },
  { name: 'GitHub', img: 'bx bxl-github', link: '' },
];
