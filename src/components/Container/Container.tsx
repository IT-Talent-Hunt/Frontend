import React, { ReactNode } from 'react';
import './Container.scss';

type Props = {
  children: ReactNode,
};

export const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="containerC">
      <div className="containerC__wrapper">
        <div className="containerC__shell">
          {children}
        </div>
      </div>
    </div>
  );
};
