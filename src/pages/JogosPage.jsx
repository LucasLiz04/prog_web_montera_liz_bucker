// src/pages/JogosPage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import ListItemCard from '../components/ListItemCard'; // Importe o componente ListItemCard

function JogosPage() {
    return (
        <>
            <HeroSection
                title="Jogos"
                description="Aqui vai ficar o catálogo de jogos, cada um com suas abas de bate papos e críticas além de promoções e notas."
            />
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col"> {/* Use flex-col para uma lista vertical de cards */}
                    <ListItemCard
                        imageSrc="../src/images/forza.png" // <-- Mantendo o caminho que funciona para você
                        title="Forza Horizon 5"
                        description="Sua Maior Aventura Horizon espera por você! Explore as paisagens vibrantes de mundo aberto do México, com diversão e velocidade sem limites em um mundo em constante evolução, incluindo centenas dos melhores carros do mundo. Publicado por Xbox Game Studios Desenvolvido por Playground Games"
                        link="#"
                    />
                    <ListItemCard
                        imageSrc="../src/images/re4.png" // <-- Mantendo o caminho que funciona para você
                        title="Resident Evil 4 Remake"
                        description="A história segue Leon S. Kennedy, um agente especial do governo dos Estados Unidos, encarregado de resgatar Ashley Graham, filha do presidente, que foi sequestrada por um culto misterioso conhecido como Los Illuminados. A missão leva Leon a uma vila remota na Espanha, onde ele enfrenta horrores inimagináveis e descobre segredos sombrios por trás do sequestro."
                        link="#"
                    />
                    <ListItemCard
                        imageSrc="../src/images/balatro.png" // <-- Mantendo o caminho que funciona para você
                        title="Balatro"
                        description="O pôquer roguelike. Balatro é um jogo de criação de baralho hipnoticamente satisfatório em que você joga mãos de pôquer ilegais, descobre curingas que mudam o jogo e aciona combos escandalosos e cheios de adrenalina."
                        link="#"
                    />
                </div>
            </div>
        </>
    );
}

export default JogosPage;