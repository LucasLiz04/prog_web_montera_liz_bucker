// src/components/PlatformCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Função para definir a cor da nota com base no valor
const getRatingColor = (rating) => {
    if (rating >= 8.0) return 'bg-green-500'; // Ótimo
    if (rating >= 6.0) return 'bg-yellow-500'; // Bom
    if (rating > 0) return 'bg-red-500'; // Razoável/Ruim
    return 'bg-slate-600'; // Sem nota
};

function PlatformCard({ imageSrc, title, description, price, isSale = false, slug, rating }) {
    return (
        <Link to={`/platform/game/${slug}`} className="block bg-[#1f2128] rounded-lg overflow-hidden shadow-lg group transform transition-transform hover:-translate-y-2">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* ADICIONADO: Badge da nota (só aparece se houver uma nota) */}
                {rating && (
                    <div className={`absolute top-2 right-2 flex items-center justify-center w-12 h-8 rounded-lg shadow-md ${getRatingColor(rating)}`}>
                        <span className="text-white font-bold text-lg">{rating.toFixed(1)}</span>
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col h-full">
                <h3 className="text-lg font-bold text-white truncate">{title}</h3>
                <p className="text-sm text-slate-400 mt-1 h-10 overflow-hidden flex-grow">{description}</p>
                <div className="mt-4">
                    <div className={`w-full text-center py-2 rounded-md font-semibold text-white transition-colors ${isSale
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-400'
                        : 'bg-gray-600/50'
                        }`}>
                        {price}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PlatformCard;