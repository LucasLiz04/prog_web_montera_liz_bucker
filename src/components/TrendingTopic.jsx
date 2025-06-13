// src/components/TrendingTopic.jsx
import React from 'react';

const TrendingTopic = ({ topic, rank }) => {
    // Define a cor da tag com base na categoria
    const getTagStyle = (category) => {
        switch (category.toLowerCase()) {
            case 'lançamento':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'comunidade':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'notícia':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-slate-600/50 text-slate-300 border-slate-500/30';
        }
    };

    return (
        <a href="#" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800 border border-transparent hover:border-sky-500/40 hover:bg-slate-700/50 transition-all duration-300">
            <span className="text-3xl font-bold text-slate-600">#{rank}</span>
            <div className="flex-grow">
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 px-2 py-0.5 rounded-full inline-block border ${getTagStyle(topic.category)}`}>
                    {topic.category}
                </p>
                <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
                <p className="text-sm text-slate-400">{topic.stat}</p>
            </div>
            <img
                src={topic.imageUrl}
                alt={topic.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            />
        </a>
    );
};

export default TrendingTopic;