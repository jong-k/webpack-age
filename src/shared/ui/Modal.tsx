import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, children, onClose }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} className="container rounded-lg bg-white p-8 shadow-lg">
        {children}
      </div>
    </div>,
    document.body
  );
}
