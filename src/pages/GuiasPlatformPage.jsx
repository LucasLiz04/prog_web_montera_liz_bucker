// src/pages/GuiasPlatformPage.jsx
import React, { useState, useEffect } from 'react';
import GuideCard from '../components/GuideCard';
import { BookOpen, Search } from 'react-feather';
import LoadingSpinner from '../components/LoadingSpinner';
import { BASE_URL } from '../services/api';

const GuiasPlatformPage = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const response = await fetch(`${BASE_URL}/guides`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();

                // CORREÇÃO: Removemos a formatação extra.
                // Agora, simplesmente passamos os dados como eles vêm da API.
                setGuides(data);

            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch guides:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchGuides();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500">Erro ao carregar guias: {error}</div>;

    return (
        <div className="w-full">
            <header className="text-center mb-10">
                <div className="inline-block bg-sky-500/20 p-4 rounded-full mb-4">
                    <BookOpen size={40} className="text-sky-400" />
                </div>
                <h1 className="text-4xl font-bold text-white">Guias e Tutoriais</h1>
                <p className="text-lg text-slate-400 mt-2">Encontre o caminho para suas conquistas e platinas.</p>

                <div className="relative max-w-lg mx-auto mt-6">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Buscar por jogo, conquista, etc..."
                        className="w-full bg-[#062448] border-2 border-slate-700 focus:border-sky-500 text-white rounded-lg py-3 pl-12 pr-4 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors"
                    />
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {guides.map(guide => (
                    <GuideCard key={guide.id} guide={guide} />
                ))}
            </main>
        </div>
    );
};

export default GuiasPlatformPage;