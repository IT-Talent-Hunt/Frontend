/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, {
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

type Props = {
  children: ReactNode,
  setModal?: (value: boolean) => void,
  modal?: boolean,
};

const modalRoot = document.getElementById('modal');

export const Modal: React.FC<Props> = ({ children }) => {
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  const modalElement = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    /* eslint-disable-next-line */
    console.log(document.documentElement.getClientRects());
  });

  useEffect(() => {
    modalRoot?.appendChild(modalElement);

    return () => {
      modalRoot?.removeChild(modalElement);
    };
  });

  return createPortal(
    <div className="modal" onClick={(event) => event.stopPropagation()}>
      {children}
    </div>,
    modalElement,
  );
};
