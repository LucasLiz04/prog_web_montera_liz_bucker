// src/pages/UserProfilePage.jsx
import React from 'react';
// 1. Importe o hook `useParams`
import { useParams } from 'react-router-dom';

import ProfileCard from '../components/ProfileCard';
import UserStats from '../components/UserStats';
import FriendList from '../components/FriendList';
import { MoreHorizontal } from 'react-feather';


// --- BANCO DE DADOS FICTÍCIO DE USUÁRIOS ---
// Agora temos dados para vários usuários, que podem ser buscados pelo `username`.
const usersDatabase = {
    Stiicky25: {
        username: "Stiicky25",
        name: "Stiicky25",
        level: 25,
        avatarUrl: `https://i.pravatar.cc/150?u=stiiicky25`,
        about: "The master of this domain. I design, I code, I conquer.",
        stats: { gamesPlayed: 350, totalDuration: 1024, achievements: 120 },
        highlightedGames: [
            { id: 1, name: 'Elden Ring', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg' },
            { id: 2, name: 'Cyberpunk 2077', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rft.jpg' },
            { id: 3, name: 'The Witcher 3', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wz4.jpg' },
            { id: 4, name: 'Hades', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co260d.jpg' }
        ],
        recentlyPlayed: [
            { id: 1, name: 'Elden Ring', time: 'Today at 19:45' },
            { id: 2, name: 'Hades', time: 'Yesterday at 22:10' },
        ]
    },
    CrimsonTiger67: {
        username: "CrimsonTiger67",
        name: "CrimsonTiger67",
        level: 18,
        avatarUrl: `https://i.pravatar.cc/150?u=CrimsonTiger67`,
        about: "Just here to have fun and play some games with friends.",
        stats: { gamesPlayed: 124, totalDuration: 286, achievements: 25 },
        highlightedGames: [
            { id: 1, name: 'Valorant', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co64cw.jpg' },
            { id: 2, name: 'Apex Legends', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5zmg.jpg' },
            { id: 3, name: 'Overwatch 2', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s4w.jpg' },
            { id: 4, name: 'CS:GO', coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5w0w.jpg' }
        ],
        recentlyPlayed: [
            { id: 1, name: 'Valorant', time: 'Today at 15:30' },
            { id: 2, name: 'Apex Legends', time: 'Today at 14:00' },
        ]
    }
    // Adicione os outros amigos aqui se quiser perfis completos para todos
};
// --- FIM DO BANCO DE DADOS ---


// Os componentes HighlightedGames e RecentlyPlayed não mudam.
const HighlightedGames = ({ games }) => (
    <div className="bg-[#1f2128]/80 p-6 rounded-2xl shadow-lg border border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-4">Highlighted Games</h3>
        <div className="grid grid-cols-2 gap-4">{games.map(game => (<div key={game.id} className="group cursor-pointer"> <img src={game.coverUrl} alt={game.name} className="rounded-lg w-full h-auto aspect-square object-cover transition-transform group-hover:scale-105" /> <p className="text-center text-sm mt-2 text-slate-300 group-hover:text-white">{game.name}</p> </div>))}</div>
    </div>
);
const RecentlyPlayed = ({ games }) => (
    <div className="bg-[#1f2128]/80 p-6 rounded-2xl shadow-lg border border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-4">Recently Played</h3>
        <ul className="space-y-3">{games.map(game => (<li key={game.id} className="flex items-center justify-between p-2 rounded-md hover:bg-sky-500/10"> <div className="flex items-center gap-3"> <div className="bg-slate-700 w-10 h-10 rounded-md flex-shrink-0"></div> <div> <p className="font-semibold text-white">{game.name}</p> <p className="text-xs text-slate-400">{game.time}</p> </div> </div> <button className="text-slate-400 hover:text-white"><MoreHorizontal size={20} /></button> </li>))}</ul>
    </div>
);


const UserProfilePage = () => {
    // 2. Pega o `username` da URL (ex: "Stiicky25" ou "CrimsonTiger67")
    const { username } = useParams();

    // 3. Busca os dados do usuário no nosso "banco de dados"
    // Se não encontrar o usuário, usa o do Stiicky25 como padrão.
    const userProfile = usersDatabase[username] || usersDatabase.Stiicky25;

    // Se nenhum usuário for encontrado, exibe uma mensagem.
    if (!userProfile) {
        return <div className="text-center text-white text-2xl">Usuário não encontrado.</div>;
    }

    return (
        // 4. A página agora renderiza os dados do `userProfile` encontrado
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-8 items-start">
            <div className="lg:col-span-1 space-y-6">
                <HighlightedGames games={userProfile.highlightedGames} />
                <UserStats stats={userProfile.stats} />
            </div>
            <div className="lg:col-span-2 space-y-6">
                <ProfileCard user={userProfile} />
                <RecentlyPlayed games={userProfile.recentlyPlayed} />
            </div>
            <div className="lg:col-span-1 bg-[#1f2128]/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-700/50 h-full">
                <FriendList />
            </div>
        </div>
    );
};

export default UserProfilePage;