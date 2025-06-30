// src/components/ActivationKeyModal.jsx
import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'react-feather';

const ActivationKeyModal = ({ game, onClose }) => {
    const [isKeyVisible, setIsKeyVisible] = useState(false);

    if (!game) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-slate-900 border border-slate-700 rounded-lg shadow-xl w-full max-w-md p-6 relative"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-3">
                    <h2 className="text-xl font-bold text-white">Chave de Ativação</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="text-center">
                    <img src={game.imagem_url} alt={game.nome} className="w-48 h-auto mx-auto rounded-lg shadow-lg" />
                    <h3 className="text-2xl font-semibold text-white mt-4">{game.nome}</h3>
                    <p className="text-slate-400">Sua chave de ativação:</p>
                </div>

                <div className="mt-6 p-4 bg-slate-800 rounded-lg flex items-center justify-between gap-4">
                    <p className={`font-mono text-lg tracking-widest ${isKeyVisible ? 'text-sky-400' : 'text-slate-400'}`}>
                        {isKeyVisible ? game.chave_ativacao : '****************'}
                    </p>
                    <button
                        onClick={() => setIsKeyVisible(!isKeyVisible)}
                        className="flex items-center gap-2 text-slate-300 hover:text-white"
                        title={isKeyVisible ? "Ocultar Chave" : "Exibir Chave"}
                    >
                        {isKeyVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default ActivationKeyModal;