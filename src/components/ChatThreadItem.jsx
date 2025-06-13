// src/components/ChatThreadItem.jsx
import React from 'react';
import { ArrowUp, ArrowDown, MessageSquare, Share2 } from 'react-feather';

// Função para gerar uma cor com base no texto da tag
const getTagColor = (tag) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
        hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - color.length) + color;
};

const ChatThreadItem = ({ thread }) => {
    return (
        // Cor de fundo ajustada para a plataforma
        <div className="flex bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700/50 gap-4 transition-colors hover:border-sky-500/50">
            {/* Votos */}
            <div className="flex flex-col items-center justify-start space-y-1 text-slate-400 flex-shrink-0">
                <button className="p-1 rounded-full hover:bg-green-500/20 hover:text-green-400">
                    <ArrowUp size={18} />
                </button>
                <span className="font-bold text-lg text-white">{thread.votes}</span>
                <button className="p-1 rounded-full hover:bg-red-500/20 hover:text-red-400">
                    <ArrowDown size={18} />
                </button>
            </div>

            {/* Conteúdo do Tópico */}
            <div className="flex-grow">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    {thread.tags.map(tag => (
                        <span
                            key={tag}
                            style={{ backgroundColor: getTagColor(tag) + '30', borderColor: getTagColor(tag) }}
                            className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Título e Metadados */}
                <h3 className="text-xl font-bold text-white mb-2">{thread.title}</h3>
                <p className="text-xs text-slate-400 mb-4">
                    Enviado por <a href="#" className="font-semibold text-sky-400 hover:underline">{thread.author}</a> • {thread.timestamp}
                </p>

                {/* Ações */}
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white font-semibold">
                        <MessageSquare size={16} />
                        {thread.commentsCount} Comentários
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white font-semibold">
                        <Share2 size={16} />
                        Compartilhar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatThreadItem;