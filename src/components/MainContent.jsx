// src/components/MainContent.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

// Componentes
import HeroCarousel from './HeroCarousel';
import PlatformCard from './PlatformCard';

// Dados de exemplo atualizados com 'slug'
const trendingGames = [
    {
        id: 1,
        slug: 'death-stranding-2',
        imageSrc: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4j5w.png',
        title: 'Death Stranding 2',
        description: 'Um novo jogo de ação e aventura desenvolvido pela Kojima Productions.',
        price: 'R$ 299,90',
    },
    {
        id: 2,
        slug: 'doom-the-dark-ages',
        imageSrc: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6mxf.png',
        title: 'Doom: The Dark Ages',
        description: 'Um novo jogo de tiro em primeira pessoa desenvolvido pela id Software.',
        price: 'R$ 249,50',
        isSale: true,
    },
    {
        id: 3,
        slug: 'the-witcher-3-wild-hunt',
        imageSrc: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg',
        title: 'The Witcher 3',
        description: 'Cace monstros, explore terras e mude o destino do mundo.',
        price: 'R$ 199,90',
    },
    {
        id: 4,
        slug: 'the-outer-worlds-2',
        imageSrc: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3g54.jpg',
        title: 'The Outer Worlds 2',
        description: 'Um novo RPG de ação e ficção científica desenvolvido pela Obsidian Entertainment.',
        price: 'R$ 279,00',
    },
];

function MainContent() {
    return (
        <div className="w-full">
            <HeroCarousel />

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
                            slug={game.slug} // Passa o slug para o card
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