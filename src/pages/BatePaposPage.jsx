// src/pages/BatePaposPage.jsx
import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import PrototypeAlert from '../components/PrototypeAlert';

function BatePaposPage() {
    const [isAlertOpen, setIsAlertOpen] = useState(true);

    const handleCloseAlert = () => {
        setIsAlertOpen(false);
    };

    return (
        <>
            <HeroSection
                title="Bate - Papos"
                description="Em breve."
            />
            {/* Você pode adicionar algum conteúdo básico aqui, se quiser, mesmo com o alerta */}
            <div className="text-center py-5">
                <p className="text-lg text-gray-300">A funcionalidade de bate-papos completa será adicionada em uma próxima atualização.</p>
            </div>

            <PrototypeAlert isOpen={isAlertOpen} onClose={handleCloseAlert} /> {/* Renderiza o alerta */}
        </>
    );
}
export default BatePaposPage;