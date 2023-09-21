import { ProjectCardProps } from "./ProjectCardProps";
import { User } from "./User";

export interface RequestMessage {
  id: number,
  creationDate: string,
  message: string,
  requestId: number,
  read: boolean,
  userResponseDto: User,
}