// src/pages/GuiasPage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import ListItemCard from '../components/ListItemCard'; // Importe o componente ListItemCard

function GuiasPage() {
    return (
        <>
            <HeroSection
                title="Guias"
                description="Aqui vão ficar guias de conquistas, platinas, itens e detonados de jogos."
            />
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col">
                    <ListItemCard
                        imageSrc="../src/images/platina1.png" // <-- Mantendo o caminho que funciona para você
                        title="Guia de Platina - Sekiro"
                        description="Playlist de videos guia para platina de Sekiro, o vencedor do The Game Awards 2019"
                        link="https://www.youtube.com/watch?v=npWZVc3pRd8&list=PLQPo0Obfqe4A2zxvIaxiBt0yM89xTwESX"
                    />
                    <ListItemCard
                        imageSrc="../src/images/platina2.png" // <-- Mantendo o caminho que funciona para você
                        title="Guia de Platina - Lies Of P"
                        description="Playlist de videos guia para platina de Lies of P, jogo Indie indicado ao The Game Awards 2023"
                        link="https://www.youtube.com/watch?v=zMUmgcO--Zg&list=PLQPo0Obfqe4Cy-CLWEjFHO837zHxKis6R"
                    />
                    <ListItemCard
                        imageSrc="../src/images/platina3.png" // <-- Mantendo o caminho que funciona para você
                        title="Guia de Platina - Nioh"
                        description="Playlist de videos guia para platina de Nioh, jogo Souls Like no estilo da cultura japonesa"
                        link="https://www.youtube.com/watch?v=xX3mVA_7MGE&list=PLQPo0Obfqe4BYua0xavDm9v5DHiR89YS3"
                    />
                </div>
            </div>
        </>
    );
}
export default GuiasPage;