// src/pages/TrendingPage.jsx
import React from 'react';
import TrendingTopic from '../components/TrendingTopic';
import { TrendingUp } from 'react-feather';

// --- DADOS FICTÍCIOS ---
const trendingData = [
    // O primeiro item será o nosso destaque principal
    {
        id: 1,
        title: "Novo Lançamento: Doom The Dark Ages",
        description: "O tão esperado Doom The Dark Ages finalmente chegou! Confira nossas primeiras impressões, guias iniciais e participe da discussão.",
        imageUrl: "./src/images/DOOM_TheDarkAges_Standard_Keyart.webp",
        category: "Lançamento",
        stat: "25.8k menções"
    },
    {
        id: 2,
        title: "Discussão Quente: Final de Cyberpunk 2.0",
        imageUrl: "./src/images/cyberpunk-recebe-atualizacao-2.2-912x569.webp",
        category: "Comunidade",
        stat: "15.2k Posts no Fórum"
    },
    {
        id: 3,
        title: "Polêmica: Clash Royale e suas mudanças",
        imageUrl: "./src/images/polemica.jpg",
        category: "Notícia",
        stat: "Trending em Portais de Notícias"
    },
];
// --- FIM DOS DADOS ---

const TrendingPage = () => {
    // Separa o tópico principal do resto da lista
    const [mainTopic, ...otherTopics] = trendingData;

    return (
        <div className="w-full">
            <header className="flex items-center gap-3 mb-8">
                <TrendingUp size={32} className="text-sky-400" />
                <h1 className="text-3xl font-bold text-white">Em Alta</h1>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna Principal (Tópico em Destaque) */}
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

                {/* Coluna Secundária (Outros Tópicos) */}
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