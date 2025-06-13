import React from "react";
import "@/styles/ConfirmDialog.css";

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  lightMode?: boolean;
};

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  lightMode = false,
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className={`confirm-dialog ${lightMode ? "light" : ""}`}>
        <div className="confirm-dialog-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="confirm-dialog-content">
          <p>{message}</p>
        </div>
        <div className="confirm-dialog-actions">
          <button 
            className="cancel-button" 
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button 
            className="confirm-button" 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
