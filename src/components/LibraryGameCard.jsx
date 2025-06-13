// src/components/LibraryGameCard.jsx
import React from 'react';

const LibraryGameCard = ({ game }) => {
    const { coverUrl, title } = game;

    return (
        // Usamos um link `<a>` para tornar o card clicável no futuro
        <a href="#" className="space-y-3 group focus:outline-none" title={title}>
            <div className="relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105 group-focus:ring-4 group-focus:ring-sky-500">
                <img
                    src={coverUrl}
                    alt={`Capa do jogo ${title}`}
                    className="w-full h-full object-cover aspect-[3/4]" // Proporção 3:4 para capas de jogos
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-slate-300 font-medium text-sm text-center truncate group-hover:text-white transition-colors">{title}</h3>
        </a>
    );
};

export default LibraryGameCard;