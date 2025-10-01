import React from "react";
import "./Css/Model.css";

function Modal({ show, onClose, onLogout, onShutdown }) {
  if (!show) return null; // Do not render if `show` is false

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <h5>Are you sure?</h5>
          <p>Please choose an action:</p>
          <div className="modal-actions">
            <button className="btn btn-danger" onClick={onShutdown}>
              Shutdown
            </button>
            <button className="btn btn-primary" onClick={onLogout}>
              Logout
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
