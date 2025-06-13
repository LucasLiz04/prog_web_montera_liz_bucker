// src/pages/GuiasPlatformPage.jsx
import React from 'react';
import GuideCard from '../components/GuideCard';
import { BookOpen, Search } from 'react-feather';

// --- DADOS FICTÍCIOS ---
const guidesData = [
    {
        id: 1,
        title: "Guia de Platina - Sekiro",
        author: "PowerPyx",
        type: "video",
        imageUrl: "./src/images/platina1.png",
        tags: ["Sekiro", "Platina", "Souls-like"],
        link: "https://www.youtube.com/watch?v=npWZVc3pRd8&list=PLQPo0Obfqe4A2zxvIaxiBt0yM89xTwESX",
    },
    {
        id: 2,
        title: "Guia de Platina - Lies Of P",
        author: "FightinCowboy",
        type: "video",
        imageUrl: "./src/images/platina2.png",
        tags: ["Lies of P", "Platina", "Indie"],
        link: "https://www.youtube.com/watch?v=zMUmgcO--Zg&list=PLQPo0Obfqe4Cy-CLWEjFHO837zHxKis6R",
    },
    {
        id: 3,
        title: "Guia de Platina - Nioh",
        author: "PlayStation Trophies",
        type: "video",
        imageUrl: "./src/images/platina3.png",
        tags: ["Nioh", "Platina", "Ação"],
        link: "https://www.youtube.com/watch?v=xX3mVA_7MGE&list=PLQPo0Obfqe4BYua0xavDm9v5DHiR89YS3",
    },
    {
        id: 4,
        title: "Todas as localizações de Sementes de Korok",
        author: "Zelda Dungeon",
        type: "text",
        imageUrl: "https://www.zeldadungeon.net/wiki/images/thumb/7/73/Korok-Seed.png/150px-Korok-Seed.png",
        tags: ["Zelda: BOTW", "Colecionáveis", "Mundo Aberto"],
        link: "#",
    }
];
// --- FIM DOS DADOS ---

const GuiasPlatformPage = () => {
    return (
        <div className="w-full">
            {/* Cabeçalho */}
            <header className="text-center mb-10">
                <div className="inline-block bg-sky-500/20 p-4 rounded-full mb-4">
                    <BookOpen size={40} className="text-sky-400" />
                </div>
                <h1 className="text-4xl font-bold text-white">Guias e Tutoriais</h1>
                <p className="text-lg text-slate-400 mt-2">Encontre o caminho para suas conquistas e platinas.</p>

                {/* Barra de Busca */}
                <div className="relative max-w-lg mx-auto mt-6">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Buscar por jogo, conquista, etc..."
                        className="w-full bg-[#062448] border-2 border-slate-700 focus:border-sky-500 text-white rounded-lg py-3 pl-12 pr-4 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors"
                    />
                </div>
            </header>

            {/* Grade de Guias */}
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {guidesData.map(guide => (
                    <GuideCard key={guide.id} guide={guide} />
                ))}
            </main>
        </div>
    );
};

export default GuiasPlatformPage;