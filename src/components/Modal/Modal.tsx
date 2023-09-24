/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-static-element-interactions */

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
  const modalElement = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    modalRoot?.appendChild(modalElement);

    return () => {
      modalRoot?.removeChild(modalElement);
    };
  }, []);

  return createPortal(
    <div className="modal" onClick={(event) => event.stopPropagation()}>
      {children}
    </div>,
    modalElement,
  );
};
