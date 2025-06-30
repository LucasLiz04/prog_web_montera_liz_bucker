// src/components/MainContent.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { BASE_URL } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import HeroCarousel from './HeroCarousel';
import PlatformCard from './PlatformCard';

function MainContent() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            setError(null);
            try {
                const headers = { 'ngrok-skip-browser-warning': 'true' };
                const response = await fetch(`${BASE_URL}/rpc/fn_listar_todos_jogos`, { headers });
                if (!response.ok) {
                    throw new Error('Falha ao buscar os jogos.');
                }
                const allGames = await response.json();
                setGames(allGames);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

    // Pega os 5 primeiros jogos para o carrossel (a ordem original é mantida aqui)
    const carouselGames = games.slice(0, 5);

    // Ordena uma cópia da lista de jogos por avaliação (maior para menor) e pega os 4 primeiros
    const trendingGames = [...games]
        .sort((a, b) => (b.avaliacao || 0) - (a.avaliacao || 0))
        .slice(0, 4);

    return (
        <div className="w-full">
            <HeroCarousel games={carouselGames} />

            <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">Trending now</h3>
                    <div className="flex gap-2">
                        <button className="bg-gray-700/50 p-2 rounded-md hover:bg-gray-600">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="bg-gray-700/50 p-2 rounded-md hover:bg-gray-600">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {trendingGames.map(game => (
                        <PlatformCard
                            key={game.id}
                            slug={game.nome.toLowerCase().replace(/ /g, '-')}
                            imageSrc={game.imagem_url}
                            title={game.nome}
                            description={game.descricao}
                            price={game.preco ? `R$ ${game.preco}` : 'Grátis'}
                            isSale={!!game.sale_price}
                            rating={game.avaliacao}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainContent;