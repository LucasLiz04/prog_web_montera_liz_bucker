// src/pages/admin/ManageGamesPage.jsx
import React, { useState, useEffect } from 'react';
import CreateGameForm from '../../components/admin/CreateGameForm';
import GameListItemAdmin from '../../components/admin/GameListItemAdmin';
import Modal from '../../components/admin/Modal';
import LoadingSpinner from '../../components/LoadingSpinner'; // Assumindo que você tem este componente
import { BASE_URL } from '../../services/api';

const ManageGamesPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Função para buscar os jogos da API
    const fetchGames = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/games?order=id.desc`);
            if (!response.ok) throw new Error('Falha ao buscar os jogos.');
            const data = await response.json();
            setGames(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect para buscar os jogos quando a página carrega
    useEffect(() => {
        fetchGames();
    }, []);

    const handleGameCreated = () => {
        setIsModalOpen(false); // Fecha o modal
        fetchGames(); // Atualiza a lista de jogos
    };

    return (
        <div>
            {/* Cabeçalho da Página */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gerenciar Jogos</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Adicionar Novo Jogo
                </button>
            </div>

            {/* Lista de Jogos */}
            <div className="space-y-4">
                {loading && <LoadingSpinner />}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!loading && !error && games.map(game => (
                    <GameListItemAdmin key={game.id} game={game} />
                ))}
            </div>

            {/* Modal para criar um novo jogo */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Adicionar Novo Jogo">
                <CreateGameForm onGameCreated={handleGameCreated} />
            </Modal>
        </div>
    );
};

export default ManageGamesPage;