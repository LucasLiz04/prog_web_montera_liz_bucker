// src/pages/CatalogPage.jsx
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import PlatformCard from '../components/PlatformCard';
import { ChevronRight } from 'react-feather';

const CategorySection = ({ category }) => {
    if (!category.games || category.games.length === 0) {
        return null;
    }

    return (
        <section className="mb-12">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-white">{category.name}</h2>
                <button className="flex items-center gap-1 text-sky-400 hover:text-sky-300">
                    <span>Ver Todos</span>
                    <ChevronRight size={18} />
                </button>
            </div>
            <div className="grid grid-flow-col auto-cols-[65%] sm:auto-cols-[40%] md:auto-cols-[30%] lg:auto-cols-[22%] gap-6 overflow-x-auto pb-4 custom-scrollbar">
                {category.games.map(game => (
                    <PlatformCard
                        key={game.id}
                        slug={game.slug}
                        imageSrc={game.cover_url}
                        title={game.title}
                        description={game.description}
                        price={game.price ? `R$ ${game.price}` : 'Grátis'}
                        // ADICIONADO: Passando a nota para o card
                        rating={game.rating}
                    />
                ))}
            </div>
        </section>
    );
};

const CatalogPage = () => {
    const [categorySections, setCategorySections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCatalogData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/rpc/get_top_games_by_category`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) {
                    throw new Error('Falha ao carregar o catálogo.');
                }
                const data = await response.json();
                setCategorySections(data);
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
            {error && <p className="text-red-500 text-center py-8">{error}</p>}

            {!loading && !error && (
                <div>
                    {categorySections.length > 0 ? (
                        categorySections.map(category => (
                            <CategorySection key={category.id} category={category} />
                        ))
                    ) : (
                        <p className="text-center text-slate-400 py-8">Nenhuma categoria com jogos encontrada.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CatalogPage;