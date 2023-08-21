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
  onCardClick: (id: number) => void,
  setEditProject: (event: React.MouseEvent, projectId: number) => void,
};

export const ProjectsField: React.FC<Props> = ({
  projects,
  error,
  loader,
  onCardClick,
  setEditProject,
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
