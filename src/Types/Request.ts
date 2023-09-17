import { ProjectCardProps } from "./ProjectCardProps";
import { User } from "./User";

export interface Request {
  id: number,
  userResponseDto: User,
  projectResponseDto: ProjectCardProps,
  message: string,
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED', 
}