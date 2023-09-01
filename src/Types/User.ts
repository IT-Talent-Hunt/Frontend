import { Contact } from './Contact';

export interface Role {
  roleName: string,
}

export interface User {
  id: number | null,
  email: string,
  firstName: string | null,
  lastName: string | null,
  profileImage: string | null,
  provider: string,
  registrationDate: string,
  roles: Role[],
  speciality: string,
  socialLinks: Contact[],
  description: string,
  skills: string,
}
