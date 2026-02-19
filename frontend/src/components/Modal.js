// src/components/Modal.js
import React from 'react';
import './Modal.css';

export const Modal = ({ isOpen, onClose, title, children, type = 'info' }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content ${type}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} className="modal-btn">Close</button>
                </div>
            </div>
        </div>
    );
};
