// src/pages/CatalogPage.jsx
import React from 'react';
import { Search } from 'react-feather';
import CatalogGameCard from '../components/CatalogGameCard';

// --- Dados Fictícios (Mock Data) ---
// No futuro, isso virá de uma API.
const newReleases = [
    { id: 1, title: "Cyberpunk 2077", coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rft.jpg', rating: 85 },
    { id: 2, title: "Baldur's Gate 3", coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co670h.jpg', rating: 96 },
    { id: 3, title: "Elden Ring", coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg', rating: 94 },
    { id: 4, title: "Hades", coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co260d.jpg', rating: 93 },
    { id: 5, title: "Starfield", coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5pne.jpg', rating: 78 },
];

const editorsPicks = [
    { id: 6, title: "The Witcher 3: Wild Hunt", coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg', rating: 92 },
    { id: 7, title: "Red Dead Redemption 2", coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1xnd.jpg', rating: 97 },
    { id: 8, title: "Hollow Knight", coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rgi.jpg', rating: 90 },
    { id: 9, title: "Celeste", coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vce.jpg', rating: 91 },
    { id: 10, title: "Disco Elysium", coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1sfj.jpg', rating: 91 },
];
// --- Fim dos Dados Fictícios ---

const GameSection = ({ title, games }) => (
    <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
            {games.map(game => (
                <CatalogGameCard key={game.id} game={game} />
            ))}
            <div className="flex-shrink-0 w-1"></div> {/* Espaçador no final */}
        </div>
    </section>
);


const CatalogPage = () => {
    return (
        <div className="w-full">
            {/* Cabeçalho com Busca e Filtros */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="relative w-full md:max-w-xs">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Search for games..."
                        className="w-full bg-[#062448] border-2 border-transparent focus:border-[#50A6D9] text-white rounded-lg py-3 pl-12 pr-4 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors"
                    />
                </div>
                <div className="flex items-center gap-2 p-1 bg-[#020F55] rounded-lg">
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-[#0653AF] rounded-md">All</button>
                    <button className="px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 rounded-md">PC</button>
                    <button className="px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 rounded-md">Playstation</button>
                    <button className="px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 rounded-md">Xbox</button>
                </div>
            </header>

            {/* Seções de Jogos */}
            <main>
                <GameSection title="New Releases" games={newReleases} />
                <GameSection title="Editors' Picks" games={editorsPicks} />
            </main>
        </div>
    );
};

export default CatalogPage;