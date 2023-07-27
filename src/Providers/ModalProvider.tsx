import React, { useMemo, useState } from 'react';

export const ModalContext = React.createContext({
  isModal: false,
  /* eslint-disable @typescript-eslint/no-unused-vars */
  setIsModal: (value: boolean) => {},
});

type Props = {
  children: React.ReactNode,
};

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [isModal, setIsModal] = useState(false);
  const contextValues = useMemo(() => ({ isModal, setIsModal }), [isModal]);

  return (
    <ModalContext.Provider value={contextValues}>
      {children}
    </ModalContext.Provider>
  );
};
