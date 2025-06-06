// src/components/ListItemCard.jsx
import React from 'react';

function ListItemCard({ imageSrc, title, description, link }) {
    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-md flex items-center p-4 mb-4 space-x-4">
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-36 h-36 object-cover rounded" // w-36 h-36 para 150x150px no protótipo, ajustável
                />
            )}
            <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-1">{title}</h3>
                <p className="text-gray-300 text-base">{description}</p>
                {link && (
                    <a href={link} className="text-blue-400 hover:text-blue-600 mt-2 self-start">
                        Ver mais
                    </a>
                )}
            </div>
        </div>
    );
}

export default ListItemCard;