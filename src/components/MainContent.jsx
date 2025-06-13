// src/components/MainContent.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

// Componentes
import HeroCarousel from './HeroCarousel';
import PlatformCard from './PlatformCard'; // Card adaptado

// Dados de exemplo (no futuro, viriam de uma API)
const trendingGames = [
    {
        id: 1,
        imageSrc: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4j5w.png',
        title: 'Death Stranding 2',
        description: 'Death Stranding 2: On The Beach is an upcoming 2028 action-adventure game developed by Kojima Productions',
        price: '$79.00',
    },
    {
        id: 2,
        imageSrc: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6mxf.png',
        title: 'Doom: The Dark Ages',
        description: 'Doom: The Dark Ages is an upcoming first-person shooter game developed by id Software',
        price: '$62.00',
        isSale: true,
    },
    {
        id: 3,
        imageSrc: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co294l.png',
        title: 'Ghost of Yōtei',
        description: 'Ghost of Yōtei is an upcoming action-adventure game developed by Sucker Punch Productions',
        price: '$55.00',
    },
    {
        id: 4,
        imageSrc: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x9f.png',
        title: 'The Outer Worlds 2',
        description: 'The Outer Worlds 2 is an upcoming action role-playing game developed by Obsidian Entertainment',
        price: '$35.00',
    },
];

function MainContent() {
    return (
        <div className="w-full">
            {/* Carrossel em Destaque */}
            <HeroCarousel />

            {/* Seção "Trending Now" */}
            <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">Trending now</h3>
                    <div className="flex gap-2">
                        <button className="bg-gray-700/50 p-2 rounded-md hover:bg-gray-600">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="bg-gray-700/50 p-2 rounded-md hover:bg-gray-600">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {trendingGames.map(game => (
                        <PlatformCard
                            key={game.id}
                            imageSrc={game.imageSrc}
                            title={game.title}
                            description={game.description}
                            price={game.price}
                            isSale={game.isSale}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainContent;