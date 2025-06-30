// src/pages/CatalogPage.jsx
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import PlatformCard from '../components/PlatformCard';
import { ChevronRight } from 'react-feather';

const CategorySection = ({ category, allGames }) => {
    // A API de categorias retorna 'id' e 'nome_categoria'. A de jogos retorna 'id_categoria'
    // A comparação deve ser feita entre game.id_categoria e category.id
    const gamesInCategory = allGames.filter(game => game.id_categoria === category.id);

    if (gamesInCategory.length === 0) {
        return null;
    }

    return (
        <section className="mb-12">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-white">{category.nome_categoria}</h2>
                <button className="flex items-center gap-1 text-sky-400 hover:text-sky-300">
                    <span>Ver Todos</span>
                    <ChevronRight size={18} />
                </button>
            </div>
            <div className="grid grid-flow-col auto-cols-[65%] sm:auto-cols-[40%] md:auto-cols-[30%] lg:auto-cols-[22%] gap-6 overflow-x-auto pb-4 custom-scrollbar">
                {/* CORREÇÃO: A chave única do jogo agora é 'game.id' */}
                {gamesInCategory.map(game => (
                    <PlatformCard
                        key={game.id}
                        slug={game.nome.toLowerCase().replace(/ /g, '-')}
                        imageSrc={game.imagem_url || 'https://via.placeholder.com/400x300'}
                        title={game.nome}
                        description={game.descricao}
                        price={game.preco ? `R$ ${game.preco}` : 'Grátis'}
                        rating={game.avaliacao}
                    />
                ))}
            </div>
        </section>
    );
};

const CatalogPage = () => {
    const [categories, setCategories] = useState([]);
    const [allGames, setAllGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCatalogData = async () => {
            setLoading(true);
            setError(null);
            try {
                const headers = { 'ngrok-skip-browser-warning': 'true' };
                const categoriesPromise = fetch(`${BASE_URL}/rpc/fn_listar_categorias`, { method: 'GET', headers });
                const gamesPromise = fetch(`${BASE_URL}/rpc/fn_listar_todos_jogos`, { method: 'GET', headers });

                const [categoriesResponse, gamesResponse] = await Promise.all([categoriesPromise, gamesPromise]);

                if (!categoriesResponse.ok) throw new Error('Falha ao carregar as categorias.');
                if (!gamesResponse.ok) throw new Error('Falha ao carregar os jogos.');

                const categoriesData = await categoriesResponse.json();
                const gamesData = await gamesResponse.json();

                setCategories(categoriesData);
                setAllGames(gamesData);

            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCatalogData();
    }, []);

    return (
        <div className="w-full">
            <header className="mb-10">
                <h1 className="text-5xl font-extrabold text-white">Catálogo de Jogos</h1>
                <p className="text-slate-400 mt-2">Explore os jogos por categoria e encontre novos favoritos.</p>
            </header>

            {loading && <LoadingSpinner />}
            {error && <p className="text-red-500 text-center py-8">{`Erro: ${error}`}</p>}

            {!loading && !error && (
                <div>
                    {categories.length > 0 ? (
                        // CORREÇÃO: A chave única da categoria agora é 'category.id'
                        categories.map(category => (
                            <CategorySection key={category.id} category={category} allGames={allGames} />
                        ))
                    ) : (
                        <p className="text-center text-slate-400 py-8">Nenhuma categoria encontrada.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CatalogPage;