// src/pages/LibraryPage.jsx
import React from 'react';
import { ChevronDown } from 'react-feather';
import LibraryGameCard from '../components/LibraryGameCard';

// --- Dados Fictícios para a Biblioteca ---
const myGames = [
    { id: 1, title: 'Anthem', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1nqy.jpg' },
    { id: 2, title: 'Call of Duty: Black Ops 4', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tkv.jpg' },
    { id: 3, title: 'Sea of Thieves', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.jpg' },
    { id: 4, title: 'Battlefield V', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2l1b.jpg' },
    { id: 5, title: 'DOTA 2', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co646y.jpg' },
    { id: 6, title: 'League of Legends', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vce.jpg' },
    { id: 7, title: 'Apex Legends', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5zmg.jpg' },
    { id: 8, title: 'Fortnite', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co64cf.jpg' },
    { id: 9, title: "Tom Clancy's The Division 2", coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1w2p.jpg' },
    { id: 10, title: 'Dead by Daylight', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5pua.jpg' },
    { id: 11, title: 'PlayerUnknown\'s Battlegrounds', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5w0w.jpg' },
    { id: 12, title: 'StarCraft II', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg' },
];
// --- Fim dos Dados Fictícios ---


const LibraryPage = () => {
    return (
        <div className="w-full">
            {/* Cabeçalho */}
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Game Library</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">Sort by:</span>
                    <button className="flex items-center gap-2 bg-gray-700/50 px-3 py-1.5 rounded-md text-sm text-white hover:bg-gray-600">
                        Recently Played
                        <ChevronDown size={16} />
                    </button>
                </div>
            </header>

            {/* Grade de Jogos */}
            <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
                {myGames.map(game => (
                    <LibraryGameCard key={game.id} game={game} />
                ))}
            </main>
        </div>
    );
};

export default LibraryPage;