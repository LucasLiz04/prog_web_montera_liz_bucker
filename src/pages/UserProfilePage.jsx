// src/pages/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import UserStats from '../components/UserStats';
import FriendList from '../components/FriendList';
import { MoreHorizontal } from 'react-feather';
import LoadingSpinner from '../components/LoadingSpinner';
import { BASE_URL } from '../services/api';

// Componentes internos (HighlightedGames e RecentlyPlayed) não precisam de alteração
const HighlightedGames = ({ games }) => (<div className="bg-[#1f2128]/80 p-6 rounded-2xl shadow-lg border border-slate-700/50"> <h3 className="text-xl font-bold text-white mb-4">Highlighted Games</h3> <div className="grid grid-cols-2 gap-4">{games.map(game => (<div key={game.id} className="group cursor-pointer"> <img src={game.coverUrl} alt={game.name} className="rounded-lg w-full h-auto aspect-square object-cover transition-transform group-hover:scale-105" /> <p className="text-center text-sm mt-2 text-slate-300 group-hover:text-white">{game.name}</p> </div>))}</div> </div>);
const RecentlyPlayed = ({ games }) => (<div className="bg-[#1f2128]/80 p-6 rounded-2xl shadow-lg border border-slate-700/50"> <h3 className="text-xl font-bold text-white mb-4">Recently Played</h3> <ul className="space-y-3">{games.map(game => (<li key={game.id} className="flex items-center justify-between p-2 rounded-md hover:bg-sky-500/10"> <div className="flex items-center gap-3"> <div className="bg-slate-700 w-10 h-10 rounded-md flex-shrink-0"></div> <div> <p className="font-semibold text-white">{game.name}</p> <p className="text-xs text-slate-400">{game.time}</p> </div> </div> <button className="text-slate-400 hover:text-white"><MoreHorizontal size={20} /></button> </li>))}</ul> </div>);


const UserProfilePage = () => {
    const { username } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username) return;

        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                // Exemplo de endpoint PostgREST para buscar um usuário pelo nome
                const response = await fetch(`${BASE_URL}/users?username=eq.${username}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if (data.length === 0) {
                    throw new Error('Usuário não encontrado.');
                }

                // PostgREST retorna um array, pegamos o primeiro resultado
                setUserProfile(data[0]);

            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch user profile:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [username]); // A busca é refeita sempre que o `username` na URL mudar

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500">Erro ao carregar o perfil: {error}</div>;
    if (!userProfile) return <div className="text-center text-white text-2xl">Perfil não encontrado.</div>;

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-8 items-start">
            <div className="lg:col-span-1 space-y-6">
                <HighlightedGames games={userProfile.highlightedGames || []} />
                <UserStats stats={userProfile.stats || {}} />
            </div>
            <div className="lg:col-span-2 space-y-6">
                <ProfileCard user={userProfile} />
                <RecentlyPlayed games={userProfile.recentlyPlayed || []} />
            </div>
            <div className="lg:col-span-1 bg-[#1f2128]/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-700/50 h-full">
                <FriendList />
            </div>
        </div>
    );
};

export default UserProfilePage;