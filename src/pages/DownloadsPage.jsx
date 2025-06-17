// src/pages/DownloadsPage.jsx
import React, { useState, useEffect } from 'react';
import ActiveDownload from '../components/ActiveDowload';
import DownloadListItem from '../components/DowloadListItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { BASE_URL } from '../services/api';

const DownloadsPage = () => {
    const [activeDownload, setActiveDownload] = useState(null);
    const [unscheduled, setUnscheduled] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const [activeRes, unscheduledRes] = await Promise.all([
                    fetch(`${BASE_URL}/downloads?status=eq.active&limit=1`),
                    fetch(`${BASE_URL}/downloads?status=eq.unscheduled`)
                ]);

                if (!activeRes.ok || !unscheduledRes.ok) throw new Error('Failed to fetch downloads data');

                const activeData = await activeRes.json();
                const unscheduledData = await unscheduledRes.json();

                setActiveDownload(activeData[0] || null); // Pega o primeiro ou define como nulo
                setUnscheduled(unscheduledData);

            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch downloads:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchDownloads();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500">Erro ao carregar downloads: {error}</div>;

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