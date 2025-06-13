// src/components/HeroCarousel.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

// Dados de exemplo
const featuredGame = {
    title: "THE WITCHER",
    subtitle: "WILD HUNT",
    description: "The Witcher 3: Wild Hunt is a 2015 action role-playing game developed and published by the Polish studio CD Projekt.",
    image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2614/itb2352sLqDq7iEaCV4C9s5R.jpg',
    tags: ["Action", "Open World", "Adventure"],
    price: "$24.00",
    originalPrice: "$39.00"
};

function HeroCarousel() {
    return (
        <div className="relative h-[450px] rounded-lg overflow-hidden group">
            {/* Imagem de Fundo */}
            <img
                src={featuredGame.image}
                alt={featuredGame.title}
                className="w-full h-full object-cover object-top"
            />

            {/* Overlay Gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Conteúdo sobreposto */}
            <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="flex gap-2 mb-4">
                    {featuredGame.tags.map(tag => (
                        <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-md">{tag}</span>
                    ))}
                </div>
                <h1 className="text-4xl font-bold">{featuredGame.title}</h1>
                <h2 className="text-6xl font-extrabold -mt-2">{featuredGame.subtitle}</h2>
                <p className="text-slate-300 mt-3 max-w-lg text-sm">{featuredGame.description}</p>
                <div className="mt-6 flex items-center gap-4">
                    <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-md transition-transform hover:scale-105">
                        Buy now
                    </button>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">{featuredGame.price}</span>
                        <span className="text-slate-400 line-through">{featuredGame.originalPrice}</span>
                    </div>
                </div>
            </div>

            {/* Botões de Navegação */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft size={24} />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={24} />
            </button>
        </div>
    );
}

export default HeroCarousel;