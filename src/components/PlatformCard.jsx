// src/components/PlatformCard.jsx
import React from 'react';

function PlatformCard({ imageSrc, title, description, price, isSale = false }) {
    return (
        <div className="bg-[#1f2128] rounded-lg overflow-hidden shadow-lg group transform transition-transform hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-white truncate">{title}</h3>
                <p className="text-sm text-slate-400 mt-1 h-10 overflow-hidden">{description}</p>
                <div className="mt-4">
                    <button className={`w-full py-2 rounded-md font-semibold text-white transition-colors ${isSale
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-400 hover:opacity-90'
                        : 'bg-gray-600/50 hover:bg-gray-500/50'
                        }`}>
                        {price}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlatformCard;