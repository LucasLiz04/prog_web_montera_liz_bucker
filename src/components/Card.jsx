// src/components/Card.jsx
import React from 'react';

function Card({ imageSrc, title, description, buttonText, buttonVariant = 'primary', footerText, link }) {
    // Mapeia o buttonVariant para classes Tailwind
    const buttonClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700',
        warning: 'bg-yellow-500 hover:bg-yellow-600',
        danger: 'bg-red-600 hover:bg-red-700',
        success: 'bg-green-600 hover:bg-green-700',
    };

    const finalButtonClass = `text-white font-bold py-2 px-4 rounded transition duration-200 mt-auto ${buttonClasses[buttonVariant] || buttonClasses.primary}`;

    return (
        <div className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-48 object-cover" // h-48 corresponde a 12rem ou ~192px
                />
            )}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-300 text-base flex-grow mb-4">{description}</p>
                {buttonText && link && (
                    <a href={link} className={finalButtonClass}>
                        {buttonText}
                    </a>
                )}
            </div>
            {footerText && (
                <div className="bg-gray-700 px-4 py-2 text-sm text-gray-400">
                    {footerText}
                </div>
            )}
        </div>
    );
}

export default Card;