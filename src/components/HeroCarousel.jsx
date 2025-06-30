// src/components/HeroCarousel.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa os estilos do carrossel

// O componente agora recebe uma lista de 'games' como propriedade (prop)
const HeroCarousel = ({ games = [] }) => {

    // Se, por algum motivo, a lista de jogos estiver vazia, exibe um placeholder
    if (games.length === 0) {
        return (
            <div className="relative h-[450px] rounded-lg bg-slate-800 flex items-center justify-center">
                <p className="text-slate-400">Nenhum jogo em destaque no momento.</p>
            </div>
        );
    }

    return (
        <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            className="rounded-lg overflow-hidden group"
        >
            {/* CORREÇÃO: Mapeia a lista de jogos recebida para criar um slide para cada um */}
            {games.map(game => (
                <div key={game.id} className="relative h-[450px]">
                    <img
                        src={game.imagem_url}
                        alt={game.nome}
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 text-white text-left">
                        <h2 className="text-5xl font-extrabold -mt-2">{game.nome}</h2>
                        <p className="text-slate-300 mt-3 max-w-lg text-sm line-clamp-2">{game.descricao}</p>
                        <div className="mt-6 flex items-center gap-4">
                            {/* O link agora usa o slug dinâmico de cada jogo */}
                            <Link to={`/platform/game/${game.nome.toLowerCase().replace(/ /g, '-')}`} className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-md transition-transform hover:scale-105">
                                Ver Detalhes
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default HeroCarousel;