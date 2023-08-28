/* eslint-disable */

import React from 'react';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { Empty } from '../Empty/Empty';
import { Error } from '../Error/Error';
import { LoaderBig } from '../Loader/LoaderBig';
import { ProjectCard } from '../projectCard/ProjectCard';
import './ProjectsField.scss';

type Props = {
  projects: ProjectCardProps[],
  error: boolean | string,
  loader: boolean,
  onCardClick: (project: ProjectCardProps) => void,
  setEditProject: (event: React.MouseEvent, projectId: number | undefined) => void,
  onApply: (event: React.MouseEvent<HTMLButtonElement>, project: ProjectCardProps) => void,
  onFavorite: (value: string) => void,
};

export const ProjectsField: React.FC<Props> = ({
  projects,
  error,
  loader,
  onCardClick,
  setEditProject,
  onApply,
  onFavorite,
}) => {
  return (
    <div className="projectsField">
      {loader ? (
        <LoaderBig />
      ) : (
        <>
          {typeof error === 'string' ? (
            <Error message={error} />
          ) : (
            <>
              {projects.length && !error && !loader ? (
                <ul className="projectsField__wrapper">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={onCardClick}
                      setEditProject={setEditProject}
                      onApply={onApply}
                      onFavorite={onFavorite}
                    />
                  ))}
                </ul>
              ) : (
                <div>
                  <Empty />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
