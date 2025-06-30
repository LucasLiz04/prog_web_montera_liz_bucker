// src/components/LibraryGameCard.jsx
import React from 'react';

const LibraryGameCard = ({ game }) => {
    const { imagem_url, nome } = game;

    return (
        <div className="space-y-3 group focus:outline-none cursor-pointer" title={nome}>
            <div className="relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105 group-focus:ring-4 group-focus:ring-sky-500">
                <img
                    src={imagem_url}
                    alt={`Capa do jogo ${nome}`}
                    className="w-full h-full object-cover aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-slate-300 font-medium text-sm text-center truncate group-hover:text-white transition-colors">{nome}</h3>
        </div>
    );
};

export default LibraryGameCard;