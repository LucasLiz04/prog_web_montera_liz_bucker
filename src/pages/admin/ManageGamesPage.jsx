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
    const [allCategories, setAllCategories] = useState([]);
    const [editingGame, setEditingGame] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const headers = { 'ngrok-skip-browser-warning': 'true' };
            const gamesPromise = fetch(`${BASE_URL}/rpc/fn_listar_todos_jogos`, { method: 'GET', headers: headers });
            const categoriesPromise = fetch(`${BASE_URL}/rpc/fn_listar_categorias`, { method: 'GET', headers: headers });
            const [gamesResponse, categoriesResponse] = await Promise.all([gamesPromise, categoriesPromise]);
            if (!gamesResponse.ok) throw new Error('Falha ao buscar os jogos.');
            if (!categoriesResponse.ok) throw new Error('Falha ao buscar as categorias.');
            const gamesData = await gamesResponse.json();
            const categoriesData = await categoriesResponse.json();
            setGames(gamesData);
            setAllCategories(categoriesData);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleGameSaved = () => {
        setIsModalOpen(false);
        setEditingGame(null);
        fetchData();
    };

    const handleCreate = () => {
        setEditingGame(null);
        setIsModalOpen(true);
    };

    const handleEdit = (game) => {
        setEditingGame(game);
        setIsModalOpen(true);
    };

    // CORREÇÃO: Implementando a função de deletar
    const handleDelete = async (gameId) => {
        const gameToDelete = games.find(g => g.id === gameId);
        if (window.confirm(`Tem certeza que deseja excluir o jogo "${gameToDelete?.nome}"?`)) {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                };
                const body = { id_jogo_input: gameId };

                const response = await fetch(`${BASE_URL}/rpc/fn_excluir_jogo`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Falha ao excluir o jogo.');
                }

                alert('Jogo excluído com sucesso!');
                fetchData(); // Recarrega a lista de jogos
            } catch (error) {
                alert(`Erro: ${error.message}`);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gerenciar Jogos</h1>
                <button
                    onClick={handleCreate}
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
                        onEdit={() => handleEdit(game)}
                        onDelete={() => handleDelete(game.id)}
                    />
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingGame(null);
                }}
                title={editingGame ? "Editar Jogo" : "Adicionar Novo Jogo"}
            >
                <CreateGameForm
                    onGameSaved={handleGameSaved}
                    allCategories={allCategories}
                    gameToEdit={editingGame}
                />
            </Modal>
        </div>
    );
};

export default ManageGamesPage;