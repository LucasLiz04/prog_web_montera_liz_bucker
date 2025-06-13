// src/pages/DownloadsPage.jsx
import React from 'react';
import ActiveDownload from '../components/ActiveDowload';
import DownloadListItem from '../components/DowloadListItem';
import { Settings } from 'react-feather';

// --- DADOS FICTÍCIOS ---
const activeDownloadData = {
    title: 'Aseprite',
    headerUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/431730/header.jpg?t=1667852377',
    progress: 28, // em porcentagem
    downloaded: '2,2 MB',
    totalSize: '7,7 MB',
    timeRemaining: '18:12',
};

const unscheduledDownloadsData = [
    { id: 1, title: 'Brawlhalla', size: '282.8 MB', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5pue.jpg' },
    { id: 2, title: 'Grand Theft Auto V Legacy', size: '2.0 GB', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2p6a.jpg' },
    { id: 3, title: 'Marvel Rivals', size: '49.6 GB', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co7f9x.jpg' },
];
// --- FIM DOS DADOS ---

const DownloadsPage = () => {
    return (
        <div className="w-full">
            {/* Download Ativo */}
            <ActiveDownload game={activeDownloadData} />

            <div className="border-b border-slate-700 mb-8"></div>

            {/* Downloads não agendados */}
            <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                    Não agendados <span className="text-base text-slate-400 font-normal">({unscheduledDownloadsData.length})</span>
                </h3>
                <div className="space-y-2">
                    {unscheduledDownloadsData.map(game => (
                        <DownloadListItem key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DownloadsPage;