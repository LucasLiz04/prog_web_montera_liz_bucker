// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import GameWikiCarousel from '../components/Carousel';

function HomePage() {
    return (
        <>
            <HeroSection
                title="Bem-vindo à Game Wiki"
                description="Seu portal centralizado para informações, guias e novidades do mundo dos games."
            />
            <GameWikiCarousel />
        </>
    );
}

export default HomePage;