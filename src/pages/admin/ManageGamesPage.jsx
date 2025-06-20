// src/pages/admin/ManageGamesPage.jsx
import React, { useState, useEffect } from 'react';
import CreateGameForm from '../../components/admin/CreateGameForm';
import GameListItemAdmin from '../../components/admin/GameListItemAdmin';
import Modal from '../../components/admin/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { BASE_URL } from '../../services/api';

const ManageGamesPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 1. Adiciona o estado para guardar a lista de todas as categorias
    const [allCategories, setAllCategories] = useState([]);

    // 2. A função de busca agora pega jogos E categorias
    const fetchData = async () => {
        setLoading(true);
        try {
            const gamesPromise = fetch(`${BASE_URL}/games?order=id.desc`);
            const categoriesPromise = fetch(`${BASE_URL}/categories?order=name.asc`);

            const [gamesResponse, categoriesResponse] = await Promise.all([gamesPromise, categoriesPromise]);

            if (!gamesResponse.ok) throw new Error('Falha ao buscar os jogos.');
            if (!categoriesResponse.ok) throw new Error('Falha ao buscar as categorias.');

            const gamesData = await gamesResponse.json();
            const categoriesData = await categoriesResponse.json();

            setGames(gamesData);
            setAllCategories(categoriesData); // Salva as categorias no estado

        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Função chamada após um jogo ser criado com sucesso
    const handleGameCreated = () => {
        setIsModalOpen(false);
        fetchData(); // Re-busca os dados para atualizar a lista
    };

    const handleDelete = async (gameId) => {
        const gameTitle = games.find(g => g.id === gameId)?.title || 'este jogo';
        if (window.confirm(`Tem certeza que deseja excluir "${gameTitle}"?`)) {
            try {
                const response = await fetch(`${BASE_URL}/games?id=eq.${gameId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error('Falha ao deletar o jogo.');
                setGames(games.filter(game => game.id !== gameId));
            } catch (e) {
                alert(`Erro ao deletar: ${e.message}`);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gerenciar Jogos</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Adicionar Novo Jogo
                </button>
            </div>

            <div className="space-y-4">
                {loading && <LoadingSpinner />}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!loading && !error && games.map(game => (
                    <GameListItemAdmin
                        key={game.id}
                        game={game}
                        onDelete={() => handleDelete(game.id)}
                    />
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar Novo Jogo">
                {/* 3. Passa a lista de categorias para o formulário */}
                <CreateGameForm
                    onGameSaved={handleGameCreated}
                    allCategories={allCategories}
                />
            </Modal>
        </div>
    );
};

export default ManageGamesPage;