// src/components/admin/Modal.jsx
import React from 'react';
import { X } from 'react-feather';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose} // Fecha o modal ao clicar no fundo
        >
            <div
                className="bg-slate-900 border border-slate-700 rounded-lg shadow-xl w-full max-w-lg p-6 relative"
                onClick={e => e.stopPropagation()} // Impede que o clique dentro do modal o feche
            >
                <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-3">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700">
                        <X size={24} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;