import { createPortal } from "react-dom";

export default function ViewModal({ children, isOpen }) {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="  fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {children}
    </div>,
    document.getElementById("modal")
  );
}
