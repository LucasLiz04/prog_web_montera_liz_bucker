// src/pages/LibraryPage.jsx
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'react-feather';
import LibraryGameCard from '../components/LibraryGameCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { BASE_URL } from '../services/api';

const LibraryPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLibraryGames = async () => {
            try {
                // Exemplo de endpoint. Peça ao seu amigo o correto.
                const response = await fetch(`${BASE_URL}/library_games`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setGames(data);
            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch library games:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchLibraryGames();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500">Erro ao carregar a biblioteca: {error}</div>;

    return (
        <div className="w-full">
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

            <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
                {games.map(game => (
                    <LibraryGameCard key={game.id} game={game} />
                ))}
            </main>
        </div>
    );
};

export default LibraryPage;