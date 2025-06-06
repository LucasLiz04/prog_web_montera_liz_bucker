// src/pages/EmBrevePage.jsx
import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import PrototypeAlert from '../components/PrototypeAlert';

function EmBrevePage() {
    const [isAlertOpen, setIsAlertOpen] = useState(true);

    const handleCloseAlert = () => {
        setIsAlertOpen(false);
    };

    return (
        <>
            <HeroSection
                title="Em breve..."
                description="Esta seção está sendo preparada para você. Volte em breve para novidades!"
            />
            <PrototypeAlert isOpen={isAlertOpen} onClose={handleCloseAlert} />
        </>
    );
}
export default EmBrevePage;