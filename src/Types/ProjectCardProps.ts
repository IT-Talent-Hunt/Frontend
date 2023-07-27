export interface Member {
  id: number,
  name: string,
}

export interface Comunaction {
  name: string,
  img: string,
  link: string,
}

export interface ProjectCardProps {
  title: string;
  owner: string;
  status: string;
  members: Member[];
  maxMembers: number;
  description: string;
  creationDate: string;
  isFavorite: boolean;
  comunication: Comunaction;
}
