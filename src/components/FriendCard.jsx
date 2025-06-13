// src/components/FriendCard.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { GitHub, Linkedin, Instagram, MessageSquare } from 'react-feather';

// Função para determinar a cor do status do amigo
const getStatusColor = (status) => {
    if (status.toLowerCase() === 'online') return 'text-green-400';
    if (status.toLowerCase().includes('playing')) return 'text-sky-400';
    return 'text-slate-500'; // Offline
};

const FriendCard = ({ friend }) => {
    const socialIconProps = { size: 18, className: "text-slate-400 hover:text-sky-400 transition-colors" };

    return (
        // O card inteiro é um link para o perfil do amigo
        <NavLink
            to={`/platform/profile/${friend.username}`}
            className="block bg-[#1f2128]/60 p-6 rounded-2xl text-center border border-slate-700/50 transform transition-all duration-300 hover:bg-sky-500/10 hover:border-sky-500/50 hover:-translate-y-1"
        >
            <img
                src={friend.avatarUrl}
                alt={`Avatar de ${friend.name}`}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-slate-600 shadow-md"
            />
            <h3 className="text-xl font-semibold text-white">{friend.name}</h3>
            <p className={`text-sm font-medium h-6 ${getStatusColor(friend.status)}`}>
                {friend.status}
            </p>

            {/* Links sociais (opcional) */}
            <div className="flex space-x-4 mt-5 pt-4 border-t border-slate-700 w-full justify-center">
                {friend.socialLinks?.instagram && <a href={friend.socialLinks.instagram} target="_blank" rel="noopener noreferrer"><Instagram {...socialIconProps} /></a>}
                {friend.socialLinks?.linkedin && <a href={friend.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin {...socialIconProps} /></a>}
                {friend.socialLinks?.github && <a href={friend.socialLinks.github} target="_blank" rel="noopener noreferrer"><GitHub {...socialIconProps} /></a>}
                {friend.socialLinks?.whatsapp && <a href={`https://wa.me/${friend.socialLinks.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"><MessageSquare {...socialIconProps} /></a>}
            </div>
        </NavLink>
    );
};

export default FriendCard;