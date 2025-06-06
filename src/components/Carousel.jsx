// src/components/Carousel.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa os estilos do carrossel

function GameWikiCarousel() {
    return (
        <div className="max-w-4xl mx-auto my-8 rounded-lg overflow-hidden shadow-xl"> {/* Centraliza e estiliza o contêiner */}
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                interval={3000} // Troca a imagem a cada 3 segundos
                transitionTime={500} // Tempo da transição
            >
                <div>
                    <img src="./src/images/bg3.webp" alt="Baldur's Gate 3" className="w-full h-96 object-cover" />
                    {/* Você pode adicionar uma legenda aqui, se quiser */}
                    {/* <p className="legend">Baldur's Gate 3</p> */}
                </div>
                <div>
                    <img src="./src/images/eldenring.webp" alt="Elden Ring" className="w-full h-96 object-cover" />
                </div>
                <div>
                    <img src="./src/images/lies_of_p.webp" alt="Lies of P" className="w-full h-96 object-cover" />
                </div>
            </Carousel>
        </div>
    );
}

export default GameWikiCarousel;