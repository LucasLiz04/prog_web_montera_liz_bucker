// src/components/GuideCard.jsx
import React from 'react';
import { PlayCircle, FileText } from 'react-feather';

const GuideCard = ({ guide }) => {
    return (
        <a href={guide.link} target="_blank" rel="noopener noreferrer" className="block group rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/50 hover:border-sky-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            {/* Imagem com overlay */}
            <div className="relative h-40">
                <img
                    src={guide.imageUrl}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white group-hover:text-sky-400 transition-colors">
                    {guide.type === 'video' ? <PlayCircle size={24} /> : <FileText size={24} />}
                </div>
            </div>

            {/* Conteúdo */}
            <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                    {guide.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">{guide.title}</h3>
                <p className="text-sm text-slate-400 mt-1">por {guide.author}</p>
            </div>
        </a>
    );
};

export default GuideCard;