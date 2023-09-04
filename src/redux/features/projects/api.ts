import { getData, postData, putData } from '../../../helpers/helpers';
import { ProjectCardProps } from '../../../Types/ProjectCardProps';

export const getProjects = (link: string) => {
  // return getData('projects/search');
  return getData(link);
};

export const addProject = (newProject: ProjectCardProps | any) => {
  return postData('projects', newProject);
};

export const editProject = (projectId: number, teamId: number, data: ProjectCardProps) => {
  return putData(`projects/${projectId}/teams/${teamId}`, data);
};

export const applyToProject = (body: any) => {
  return postData('requests/', body);
  // return putData(`teams/${teamId}/${userId}`, null);
};
