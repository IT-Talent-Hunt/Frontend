import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { EditProject } from './EditProject/EditProject';
import { ProjectCardProps } from '../../Types/ProjectCardProps';
import { getData } from '../../helpers/helpers';
import { LoaderBig } from '../../components/Loader/LoaderBig';
import { Error } from '../../components/Error/Error';
import './EditPage.scss';

export const EditPage = () => {
  const [isError, setIsError] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const [toEditProject, setToEditProject] = useState<ProjectCardProps | null>(null);

  const match = useMatch('edit/:editId');
  const projectId = match?.params.editId;

  async function getProject() {
    setIsLoader(true);

    try {
      const editProject: any = await getData(`projects/${projectId}`);

      setToEditProject(editProject);
    } catch (error) {
      setIsError('An error occurred while attempting to load data from the server. An internal server error may be caused by technical glitches or issues within the system. Our experts have already been notified of this problem and are actively working to resolve it.We apologize for any inconvenience caused. Please try to load the data again later.If the issue persists, please contact our support team for further assistance.Thank you for your understanding.');
    } finally {
      setIsLoader(false);
    }
  }

  useEffect(() => {
    getProject();
  }, []);

  return (
    <section className="editPage">
      {isLoader && (
        <LoaderBig />
      )}

      {toEditProject && !isLoader && (
        <EditProject project={toEditProject!} />
      )}

      {isError && (
        <Error message={isError} />
      )}
    </section>
  );
};
