"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type ModalContextProps = {
  isOpen: boolean;
  openModal: (children: React.ReactElement) => void;
  closeModal: () => void;
  childrenElement: React.ReactNode;
};

const ModalContext = createContext<ModalContextProps>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  childrenElement: null,
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [childrenElement, setChildrenElement] = useState<React.ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((children: React.ReactNode) => {
    setIsOpen(true);
    setChildrenElement(children);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const contextValue = useMemo(() => {
    return { isOpen, openModal, closeModal, childrenElement };
  }, [isOpen, openModal, closeModal, childrenElement]);

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
