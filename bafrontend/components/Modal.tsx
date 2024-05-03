import React, { useRef, useEffect, useState } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

export default function Modal ({
  isOpen,
  hasCloseBtn = true,
  onClose,
  children
}) {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal" style={{paddingTop:"0", paddingLeft:"0",paddingRight:"0"}}>
      {hasCloseBtn && (
        <button className="modal-close-btn" onClick={handleCloseModal}>
          Close
        </button>
      )}
      {children}
    </dialog>
  );
};
