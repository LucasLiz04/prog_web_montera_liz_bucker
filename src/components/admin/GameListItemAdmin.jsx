// src/components/admin/GameListItemAdmin.jsx
import React from 'react';
import { Edit, Trash2 } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const GameListItemAdmin = ({ game, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin/edit-game/${game.id}`);
    };

    return (
        <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-900 border border-slate-700">
            <img
                src={game.cover_url || 'https://via.placeholder.com/100x120'}
                alt={game.title}
                className="w-24 h-32 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex-grow">
                <h3 className="text-lg font-bold text-white">{game.title}</h3>
                <p className="text-sm text-slate-400 mt-1 line-clamp-2">{game.description}</p>
                <div className="text-xs mt-2">
                    <span className="font-semibold text-slate-300">ID:</span> {game.id}
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <button onClick={handleEdit} className="w-full flex justify-center items-center gap-2 bg-sky-600/50 hover:bg-sky-600 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors">
                    <Edit size={16} />
                    <span>Editar</span>
                </button>
                <button onClick={onDelete} className="w-full flex justify-center items-center gap-2 bg-red-600/50 hover:bg-red-600 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors">
                    <Trash2 size={16} />
                    <span>Excluir</span>
                </button>
            </div>
        </div>
    );
};

export default GameListItemAdmin;