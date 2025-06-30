// src/pages/LibraryPage.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen } from 'react-feather';
import LibraryGameCard from '../components/LibraryGameCard';
import { BASE_URL } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ActivationKeyModal from '../components/ActivationKeyModal';

const LibraryPage = () => {
    const [libraryGames, setLibraryGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        const fetchLibraryGames = async () => {
            setLoading(true);
            setError(null);
            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const userId = userInfo?.id;

            if (!userId) {
                setError('Usuário não logado ou ID do usuário não encontrado.');
                setLoading(false);
                return;
            }

            try {
                const headers = { 'ngrok-skip-browser-warning': 'true' };
                const response = await fetch(`${BASE_URL}/rpc/fn_listar_vendas_usuario?id_usuario_input=${userId}`, {
                    method: 'GET',
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error('Falha ao buscar jogos da biblioteca.');
                }

                const data = await response.json();
                setLibraryGames(data);

            } catch (e) {
                setError(e.message);
                console.error("Erro ao buscar jogos da biblioteca:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchLibraryGames();
    }, []);

    return (
        <div className="w-full">
            <ActivationKeyModal
                game={selectedGame}
                onClose={() => setSelectedGame(null)}
            />

            <header className="flex items-center gap-4 mb-8">
                <BookOpen size={32} className="text-purple-500" />
                <h1 className="text-3xl font-bold text-white">Minha Biblioteca</h1>
            </header>

            <main>
                {loading && <LoadingSpinner />}
                {error && <p className="text-center text-red-500 py-4">{error}</p>}

                {!loading && !error && libraryGames.length === 0 && (
                    <p className="text-center text-slate-400 text-lg py-10">Sua biblioteca está vazia. Compre alguns jogos!</p>
                )}

                {!loading && !error && libraryGames.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
                        {libraryGames.map(game => (
                            <div key={game.id} onClick={() => setSelectedGame(game)}>
                                <LibraryGameCard
                                    game={{
                                        id: game.id,
                                        nome: game.nome,
                                        imagem_url: game.imagem_url,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default LibraryPage;