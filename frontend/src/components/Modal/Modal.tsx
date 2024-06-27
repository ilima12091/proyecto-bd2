"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6";
import { useModal } from "@/contexts/modalContext";

import "./styles.css";

export default function Modal() {
  const { isOpen, closeModal, childrenElement } = useModal();

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleClickOutside = useCallback(
    (event: any) => {
      if (event.target.classList.contains("modal-backdrop")) {
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <>
      {isOpen && (
        <div className="modal-backdrop" onClick={handleClickOutside}>
          <dialog open={isOpen} className="modal">
            <button
              className="modal-close"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <FaXmark size={20} />
            </button>
            {childrenElement}
          </dialog>
        </div>
      )}
    </>
  );
}
