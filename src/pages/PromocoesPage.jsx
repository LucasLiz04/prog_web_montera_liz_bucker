// src/pages/PromocoesPage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import Card from '../components/Card'; // Importe o componente Card

function PromocoesPage() {
    return (
        <>
            <HeroSection
                title="💰 Promoções Imperdíveis!"
                description="Confira as melhores ofertas de jogos e produtos relacionados ao mundo gamer."
            />
            <div className="container mx-auto px-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card
                        imageSrc="./src/images/gow.webp"
                        title="God of War Ragnarok em promoção!"
                        description="Aproveite um super desconto neste título aclamado pela crítica. De R$ 149,99 por R$ 89,90!"
                        buttonText="Aproveitar Oferta"
                        buttonVariant="success"
                        footerText="Válido até: 05/05/2025"
                        link="#"
                    />
                    <Card
                        imageSrc="./src/images/promocao_ow.webp"
                        title="Desconto em Skins"
                        description="Adquira skins pela GameWiki e receba 50% off em sua primeira compra!"
                        buttonText="Ver Detalhes"
                        buttonVariant="warning"
                        footerText="Oferta por tempo limitado!"
                        link="#"
                    />
                    <Card
                        imageSrc="./src/images/darksouls_bundle.webp"
                        title="Bundle Imperdível de Jogos"
                        description="Leve 3 jogos pelo preço de 2! Uma seleção fantástica para você se divertir."
                        buttonText="Confira o Bundle"
                        buttonVariant="primary"
                        footerText="Promoção especial!"
                        link="#"
                    />
                </div>
            </div>
        </>
    );
}
export default PromocoesPage;