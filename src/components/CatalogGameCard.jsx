// src/components/CatalogGameCard.jsx
import React from 'react';
import { Star } from 'react-feather';

// Função para definir a cor da nota com base no valor
const getRatingColor = (rating) => {
    if (rating >= 80) return 'bg-green-500'; // Ótimo
    if (rating >= 60) return 'bg-yellow-500'; // Bom
    return 'bg-red-500'; // Razoável/Ruim
};

const CatalogGameCard = ({ game }) => {
    const { coverUrl, title, rating } = game;

    return (
        <div className="flex-shrink-0 w-48 space-y-2 group cursor-pointer">
            <div className="relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:-translate-y-2">
                <img
                    src={coverUrl}
                    alt={`Capa do jogo ${title}`}
                    className="w-full h-64 object-cover"
                />
                <div className={`absolute top-2 right-2 flex items-center justify-center w-12 h-12 rounded-full ${getRatingColor(rating)} shadow-md`}>
                    <span className="text-white font-bold text-lg">{rating}</span>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-slate-200 font-semibold text-center truncate group-hover:text-sky-400">{title}</h3>
        </div>
    );
};

export default CatalogGameCard;