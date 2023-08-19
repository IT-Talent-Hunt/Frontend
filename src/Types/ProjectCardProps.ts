import { User } from "./User";
import { Contact } from '../Types/Contact';

export interface Member {
  id: number,
  name: string,
}

export interface Communication {
  name: string,
  img: string,
  link: string,
}

export interface TeamResponse {
  id: number,
  maxMembers: number,
  requiredSpecialities: string[],
  userResponseDtos: User[],
}

export interface ProjectCardProps {
  id: number;
  name: string;
  ownerId: number;
  status: string;
  teamResponseDto: TeamResponse;
  description: string;
  creationDate: string;
  socialLink: Contact;
}
