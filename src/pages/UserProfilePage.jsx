// src/pages/UserProfilePage.jsx
import React from 'react';
import ProfileCard from '../components/ProfileCard';
import UserStats from '../components/UserStats';
import FriendList from '../components/FriendList'; // Reutilizando o componente de amigos
import { MoreHorizontal } from 'react-feather';

// --- DADOS FICTÍCIOS ---
const userProfile = {
    username: "DoctorBunny00",
    level: 14,
    avatarUrl: `https://avatar.iran.liara.run/public/boy?username=DoctorBunny`,
    about: "A game addict. I have been playing games since when I was 9, so you can say it's part of my life.",
    stats: {
        gamesPlayed: 124,
        totalDuration: 286,
        achievements: 25,
    },
    highlightedGames: [
        { id: 1, name: 'Clash Of Clans', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vce.jpg' },
        { id: 2, name: 'Plants Vs Zombies', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.jpg' },
        { id: 3, name: 'Mini Militia', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1nqy.jpg' },
        { id: 4, name: 'Mario Kart', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tkv.jpg' }
    ],
    recentlyPlayed: [
        { id: 1, name: 'Mini Militia', time: 'Today at 14:33' },
        { id: 2, name: 'Plants Vs Zombies', time: 'Today at 12:33' },
        { id: 3, name: 'Mario Kart', time: 'Today at 12:15' },
    ]
};
// --- FIM DOS DADOS ---

const HighlightedGames = ({ games }) => (
    <div className="bg-[#1f2128]/80 p-6 rounded-2xl shadow-lg border border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-4">Highlighted Games</h3>
        <div className="grid grid-cols-2 gap-4">
            {games.map(game => (
                <div key={game.id} className="group cursor-pointer">
                    <img src={game.coverUrl} alt={game.name} className="rounded-lg w-full h-auto aspect-square object-cover transition-transform group-hover:scale-105" />
                    <p className="text-center text-sm mt-2 text-slate-300 group-hover:text-white">{game.name}</p>
                </div>
            ))}
        </div>
    </div>
);

const RecentlyPlayed = ({ games }) => (
    <div className="bg-[#1f2128]/80 p-6 rounded-2xl shadow-lg border border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-4">Recently Played</h3>
        <ul className="space-y-3">
            {games.map(game => (
                <li key={game.id} className="flex items-center justify-between p-2 rounded-md hover:bg-sky-500/10">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-700 w-10 h-10 rounded-md flex-shrink-0"></div>
                        <div>
                            <p className="font-semibold text-white">{game.name}</p>
                            <p className="text-xs text-slate-400">{game.time}</p>
                        </div>
                    </div>
                    <button className="text-slate-400 hover:text-white"><MoreHorizontal size={20} /></button>
                </li>
            ))}
        </ul>
    </div>
);

const UserProfilePage = () => {
    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-8 items-start">
            {/* Coluna Esquerda */}
            <div className="lg:col-span-1 space-y-6">
                <HighlightedGames games={userProfile.highlightedGames} />
                <UserStats stats={userProfile.stats} />
            </div>

            {/* Coluna Central */}
            <div className="lg:col-span-2 space-y-6">
                <ProfileCard user={userProfile} />
                <RecentlyPlayed games={userProfile.recentlyPlayed} />
            </div>

            {/* Coluna Direita (Reutilizando FriendList) */}
            <div className="lg:col-span-1 bg-[#1f2128]/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-700/50 h-full">
                <FriendList />
            </div>
        </div>
    );
};

export default UserProfilePage;