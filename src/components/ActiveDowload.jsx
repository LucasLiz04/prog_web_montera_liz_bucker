// src/components/ActiveDownload.jsx
import React from 'react';
import { Pause } from 'react-feather';

const ActiveDownload = ({ game }) => {
    return (
        <div className="bg-gradient-to-r from-sky-900/50 via-sky-900/20 to-transparent p-6 rounded-2xl mb-10">
            {/* Header do Jogo */}
            <div className="flex items-end gap-6 mb-6">
                <div
                    className="w-full h-32 md:h-48 rounded-lg bg-cover bg-center shadow-lg"
                    style={{ backgroundImage: `url(${game.headerUrl})` }}
                ></div>
            </div>
            <h2 className="text-4xl font-bold text-white -mt-20 ml-6 relative">{game.title}</h2>

            {/* Progresso e Controles */}
            <div className="mt-16">
                <div className="flex justify-between items-center text-sm text-slate-300 mb-2">
                    <span>Baixando dados</span>
                    <span>{game.downloaded} / {game.totalSize}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${game.progress}%` }}></div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-slate-400">
                        <p>Atualizando arquivos: <span className="text-white">{game.progress}%</span></p>
                        <p>Tempo restante estimado: <span className="text-white">{game.timeRemaining}</span></p>
                    </div>
                    <button className="bg-sky-600 hover:bg-sky-700 text-white p-3 rounded-full transition-colors">
                        <Pause size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActiveDownload;