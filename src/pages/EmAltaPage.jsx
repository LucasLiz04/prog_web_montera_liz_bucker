// src/pages/EmAltaPage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import Card from '../components/Card'; // Importe o componente Card

function EmAltaPage() {
    return (
        <>
            <HeroSection
                title="🔥 Em alta"
                description="Aqui ficam os lançamentos e coisas em alta no momento, como bate-papos viralizados, jogos bombados (no bom e mau sentido)."
            />
            <div className="container mx-auto px-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card
                        imageSrc="./src/images/DOOM_TheDarkAges_Standard_Keyart.webp"
                        title="Novo Lançamento: Doom The Dark Ages"
                        description="O tão esperado Doom The Dark Ages finalmente chegou! Confira nossas primeiras impressões e guias iniciais."
                        buttonText="Ver mais"
                        buttonVariant="primary"
                        footerText="Lançado em: 25/04/2025"
                        link="#"
                    />
                    <Card
                        imageSrc="./src/images/cyberpunk-recebe-atualizacao-2.2-912x569.webp"
                        title="Discussão Quente: Final de Cyberpunk 2.0"
                        description="A comunidade está debatendo intensamente sobre o novo final adicionado na última atualização. Participe!"
                        buttonText="Ir para o Bate-papo"
                        buttonVariant="warning"
                        footerText="Tópico em Destaque"
                        link="#"
                    />
                    <Card
                        imageSrc="./src/images/polemica.jpg"
                        title="Polêmica: Clash Royale e suas mudanças"
                        description="O famoso Clash Royale está sofrendo imenso hate dos jogadores desde a atualização que removeu os baús. 'O jogo está cavando a própria cova' - diz criador de conteúdo."
                        buttonText="Entenda o Caso"
                        buttonVariant="danger"
                        footerText="Notícia Importante"
                        link="#"
                    />
                </div>
            </div>
        </>
    );
}

export default EmAltaPage;