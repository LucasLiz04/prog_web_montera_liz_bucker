// src/components/HeroSection.jsx
import React from 'react';

function HeroSection({ title, description }) {
    return (
        <div className="text-center py-5">
            <h1 className="text-4xl font-bold text-white mb-3">{title}</h1>
            <p className="text-lg text-gray-300">{description}</p>
        </div>
    );
}

export default HeroSection;