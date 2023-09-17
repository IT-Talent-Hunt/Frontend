import { ProjectCardProps } from "./ProjectCardProps";
import { User } from "./User";

export interface RequestMessage {
  id: number,
  creationDate: string,
  message: string,
  projectResponseDto: ProjectCardProps,
  read: boolean,
  userResponseDto: User,
}