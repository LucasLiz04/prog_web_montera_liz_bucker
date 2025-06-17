// src/pages/CatalogPage.jsx
import React, { useState, useEffect } from 'react';
import { Search } from 'react-feather';
import CatalogGameCard from '../components/CatalogGameCard';
import LoadingSpinner from '../components/LoadingSpinner'; // Importe o spinner
import { BASE_URL } from '../services/api'; // Importe a URL base

// A partir de agora, os dados não são mais fixos aqui.
// Eles virão do estado do componente, que será preenchido pela API.

const GameSection = ({ title, games }) => (
    <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
            {games.map(game => (
                <CatalogGameCard key={game.id} game={game} />
            ))}
            <div className="flex-shrink-0 w-1"></div>
        </div>
    </section>
);

const CatalogPage = () => {
    // 1. Estados para armazenar os dados, o estado de carregamento e possíveis erros
    const [newReleases, setNewReleases] = useState([]);
    const [editorsPicks, setEditorsPicks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. useEffect é executado quando o componente é montado na tela
    useEffect(() => {
        // Função assíncrona para buscar os dados
        const fetchCatalogData = async () => {
            try {
                // Pergunte ao seu amigo os nomes exatos das tabelas e colunas.
                // Estes são exemplos de como as URLs do PostgREST podem parecer.
                const newReleasesUrl = `${BASE_URL}/games?order=release_date.desc&limit=5`;
                const editorsPicksUrl = `${BASE_URL}/games?is_editors_pick=eq.true&limit=5`;

                // Busca os dados das duas URLs em paralelo
                const responses = await Promise.all([
                    fetch(newReleasesUrl),
                    fetch(editorsPicksUrl)
                ]);

                // Verifica se as respostas da rede foram bem-sucedidas
                for (const res of responses) {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                }

                const [newReleasesData, editorsPicksData] = await Promise.all(responses.map(res => res.json()));

                // 3. Atualiza os estados com os dados recebidos
                setNewReleases(newReleasesData);
                setEditorsPicks(editorsPicksData);

            } catch (e) {
                // Em caso de erro, atualiza o estado de erro
                setError(e.message);
                console.error("Failed to fetch catalog data:", e);
            } finally {
                // 4. Finaliza o estado de carregamento, independentemente de sucesso ou erro
                setLoading(false);
            }
        };

        fetchCatalogData();
    }, []); // O array vazio `[]` garante que o useEffect só rode uma vez

    // 5. Renderização condicional com base nos estados
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-center text-red-500">Erro ao carregar o catálogo: {error}</div>;
    }

    return (
        <div className="w-full">
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="relative w-full md:max-w-xs">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="search" placeholder="Search for games..." className="w-full bg-[#062448] border-2 border-transparent focus:border-[#50A6D9] text-white rounded-lg py-3 pl-12 pr-4 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors" />
                </div>
                <div className="flex items-center gap-2 p-1 bg-[#020F55] rounded-lg">
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-[#0653AF] rounded-md">All</button>
                    <button className="px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 rounded-md">PC</button>
                    <button className="px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 rounded-md">Playstation</button>
                    <button className="px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 rounded-md">Xbox</button>
                </div>
            </header>

            <main>
                <GameSection title="New Releases" games={newReleases} />
                <GameSection title="Editors' Picks" games={editorsPicks} />
            </main>
        </div>
    );
};

export default CatalogPage;