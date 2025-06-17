// src/pages/TrendingPage.jsx
import React, { useState, useEffect } from 'react';
import TrendingTopic from '../components/TrendingTopic';
import { TrendingUp } from 'react-feather';
import LoadingSpinner from '../components/LoadingSpinner';
import { BASE_URL } from '../services/api';

const TrendingPage = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await fetch(`${BASE_URL}/trending_topics?order=rank.asc`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setTopics(data);
            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch trending topics:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500">Erro ao carregar tópicos em alta: {error}</div>;
    if (!topics || topics.length === 0) return <div className="text-center text-slate-400">Nenhum tópico em alta no momento.</div>

    const [mainTopic, ...otherTopics] = topics;

    return (
        <div className="w-full">
            <header className="flex items-center gap-3 mb-8">
                <TrendingUp size={32} className="text-sky-400" />
                <h1 className="text-3xl font-bold text-white">Em Alta</h1>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <a href="#" className="block rounded-2xl overflow-hidden group relative shadow-lg">
                        <img src={mainTopic.imageUrl} alt={mainTopic.title} className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                            <span className="bg-green-500/80 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">{mainTopic.category}</span>
                            <h2 className="text-3xl font-bold text-white mt-2">{mainTopic.title}</h2>
                            <p className="text-slate-200 mt-2 max-w-lg">{mainTopic.description}</p>
                        </div>
                    </a>
                </div>

                <div className="lg:col-span-1 flex flex-col gap-4">
                    {otherTopics.map((topic, index) => (
                        <TrendingTopic key={topic.id} topic={topic} rank={index + 2} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default TrendingPage;