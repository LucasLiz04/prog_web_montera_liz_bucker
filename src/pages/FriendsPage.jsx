// src/pages/FriendsPage.jsx
import React from 'react';
import { Search, UserPlus } from 'react-feather';
import FriendCard from '../components/FriendCard';

// --- DADOS FICTÍCIOS ---
const friendsData = [
    { id: 1, name: 'CrimsonTiger67', username: 'CrimsonTiger67', status: 'Playing Valorant', avatarUrl: 'https://i.pravatar.cc/150?u=CrimsonTiger67', socialLinks: { github: '#' } },
    { id: 2, name: 'IceDragon', username: 'IceDragon', status: 'Online', avatarUrl: 'https://i.pravatar.cc/150?u=IceDragon', socialLinks: { instagram: '#', github: '#' } },
    { id: 3, name: 'NeonLovs', username: 'NeonLovs', status: 'Offline', avatarUrl: 'https://i.pravatar.cc/150?u=NeonLovs', socialLinks: { linkedin: '#' } },
    { id: 4, name: 'Phoenix_Rising', username: 'Phoenix_Rising', status: 'Online', avatarUrl: 'https://i.pravatar.cc/150?u=phoenix_rising', socialLinks: { whatsapp: '12345' } },
    { id: 5, name: 'Anny_Stage', username: 'Anny_Stage', status: 'Offline', avatarUrl: 'https://i.pravatar.cc/150?u=anny_stage', socialLinks: { instagram: '#' } },
    { id: 6, name: 'Anton', username: 'Anton', status: 'Playing Rocket League', avatarUrl: 'https://i.pravatar.cc/150?u=Anton', socialLinks: { github: '#' } },
];
// --- FIM DOS DADOS ---

const FriendsPage = () => {
    return (
        <div className="w-full">
            {/* Cabeçalho */}
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <h1 className="text-3xl font-bold text-white">
                    Friends <span className="text-lg bg-sky-500 text-white rounded-full px-3 py-1">{friendsData.length}</span>
                </h1>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:max-w-xs">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="search"
                            placeholder="Search friends..."
                            className="w-full bg-[#062448] border-2 border-transparent focus:border-[#50A6D9] text-white rounded-lg py-2.5 pl-12 pr-4 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors"
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors">
                        <UserPlus size={20} />
                        <span>Add</span>
                    </button>
                </div>
            </header>

            {/* Grade de Amigos */}
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {friendsData.map(friend => (
                    <FriendCard key={friend.id} friend={friend} />
                ))}
            </main>
        </div>
    );
};

export default FriendsPage;