// src/pages/DownloadsPage.jsx
import React from 'react';
import ActiveDownload from '../components/ActiveDowload';
import DownloadListItem from '../components/DowloadListItem';

// Dados Fictícios
const mockActiveDownload = {
    id: 1,
    name: 'The Last of Us Part I',
    coverUrl: 'https://via.placeholder.com/150/556B2F/FFFFFF',
    progress: 75,
    speed: '15.8 MB/s',
    timeLeft: '12 min'
};

const mockUnscheduled = [
    { id: 2, name: 'Red Dead Redemption 2', coverUrl: 'https://via.placeholder.com/100/A52A2A/FFFFFF' },
    { id: 3, name: 'Stray', coverUrl: 'https://via.placeholder.com/100/2E8B57/FFFFFF' },
];

const DownloadsPage = () => {
    // A lógica de fetch foi removida.
    const activeDownload = mockActiveDownload;
    const unscheduled = mockUnscheduled;

    return (
        <div className="w-full">
            {activeDownload ? <ActiveDownload game={activeDownload} /> : <div className="text-center p-6 bg-slate-800 rounded-lg text-slate-400">Nenhum download ativo no momento.</div>}

            <div className="border-b border-slate-700 my-8"></div>

            <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                    Não agendados <span className="text-base text-slate-400 font-normal">({unscheduled.length})</span>
                </h3>
                <div className="space-y-2">
                    {unscheduled.map(game => (
                        <DownloadListItem key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DownloadsPage;