// src/pages/BatePaposPage.jsx
import React from 'react';
// O HeroSection foi removido para se adequar ao layout da plataforma
import ChatThreadItem from '../components/ChatThreadItem';
import { MessageSquare, Plus } from 'react-feather';

// --- DADOS FICTÍCIOS (permanecem os mesmos) ---
const threadsData = [
    {
        id: 1,
        title: "Qual o final de Cyberpunk 2077 que vocês mais gostaram?",
        author: "CyberFan2077",
        timestamp: "há 2 horas",
        votes: 128,
        commentsCount: 42,
        tags: ["Cyberpunk 2077", "Discussão", "Spoiler"],
    },
    {
        id: 2,
        title: "Preciso de ajuda para derrotar o chefe final de Elden Ring",
        author: "Tarnished_Soul",
        timestamp: "há 5 horas",
        votes: 45,
        commentsCount: 15,
        tags: ["Elden Ring", "Ajuda", "Gameplay"],
    },
    {
        id: 3,
        title: "Teoria: O que realmente aconteceu com os anões em God of War Ragnarok",
        author: "LoreMaster",
        timestamp: "há 1 dia",
        votes: 256,
        commentsCount: 98,
        tags: ["God of War", "Teoria", "Lore"],
    },
];
// --- FIM DOS DADOS ---

function BatePaposPage() {
    return (
        <div className="w-full">
            {/* Cabeçalho adaptado para o layout da Platform */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <MessageSquare size={32} className="text-sky-400" />
                    <h1 className="text-3xl font-bold text-white">Bate-Papos</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button className="bg-sky-600 text-white font-semibold py-2 px-4 rounded-md text-sm">Em alta</button>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md text-sm">Novo</button>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md text-sm">Top</button>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 text-sm">
                        <Plus size={18} />
                        Criar
                    </button>
                </div>
            </header>

            {/* Lista de Tópicos */}
            <main className="flex flex-col gap-4">
                {threadsData.map(thread => (
                    <ChatThreadItem key={thread.id} thread={thread} />
                ))}
            </main>
        </div>
    );
}

export default BatePaposPage;