// src/components/DownloadListItem.jsx
import React from 'react';
import { Download } from 'react-feather';

const DownloadListItem = ({ game }) => {
    return (
        <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/50">
            <img src={game.coverUrl} alt={game.title} className="w-20 h-20 object-cover rounded-md mr-4" />
            <div className="flex-grow">
                <h4 className="text-lg font-semibold text-white">{game.title}</h4>
                <p className="text-sm text-slate-400">{game.size}</p>
            </div>
            <button className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-sky-500/20 transition-colors">
                <Download size={22} />
            </button>
        </div>
    );
};

export default DownloadListItem;