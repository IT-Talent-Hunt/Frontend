import { ReactNode } from 'react';
import './ProjectContainer.scss';

type Props = {
  children: ReactNode,
};

export const ProjectContainer: React.FC<Props> = ({ children }) => {
  return (
    <section className="projectContainer">
      <div className="projectContainer__container">
        {children}
      </div>
    </section>
  );
};
