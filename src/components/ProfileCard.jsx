// src/components/ProfileCard.jsx
import React from 'react';

const ProfileCard = ({ user }) => {
    return (
        <div className="bg-gradient-to-b from-[#0653AF]/30 to-[#020F55]/30 p-6 rounded-2xl shadow-lg text-center border border-sky-500/20">
            <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                    src={user.avatarUrl}
                    alt="Avatar"
                    className="rounded-full w-full h-full object-cover border-4 border-sky-400"
                />
                {/* Renderizar nível apenas se user.level não for nulo/undefined (continuará nulo por enquanto) */}
                {user.level && (
                    <div className="absolute -bottom-2 right-0 bg-[#020F55] w-10 h-10 rounded-full flex items-center justify-center border-2 border-sky-400">
                        <span className="text-white font-bold">{user.level}</span>
                    </div>
                )}
            </div>
            <h2 className="text-2xl font-bold text-white">{user.username}</h2>
            {user.email && ( // ADICIONADO: Exibir e-mail
                <p className="text-slate-300 mt-1 text-sm">{user.email}</p>
            )}
            {/* Renderizar "about" apenas se user.about não for nulo/undefined (continuará nulo por enquanto) */}
            {user.about && (
                <p className="text-slate-400 mt-2 text-sm max-w-xs mx-auto">"{user.about}"</p>
            )}
            {!user.about && !user.email && ( // Mensagem alternativa se 'about' e 'email' forem nulos
                <p className="text-slate-400 mt-2 text-sm max-w-xs mx-auto">Nenhuma descrição disponível.</p>
            )}
        </div>
    );
};

export default ProfileCard;