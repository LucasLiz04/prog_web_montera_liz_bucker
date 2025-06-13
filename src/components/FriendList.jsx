// src/components/FriendsList.jsx
import React from 'react';
import { Search } from 'react-feather';

// Dados de exemplo
const friends = [
    { id: 1, name: 'CrimsonTiger67', status: 'playing', game: 'Valorant', avatar: 'https://i.pravatar.cc/40?u=CrimsonTiger67' },
    { id: 2, name: 'IceDragon', status: 'playing', game: 'ROBLOX', avatar: 'https://i.pravatar.cc/40?u=IceDragon' },
    { id: 3, name: 'NeonLovs', status: 'playing', game: 'Join', avatar: 'https://i.pravatar.cc/40?u=NeonLovs' },
    { id: 4, name: 'phoenix_rising', status: 'playing', game: 'Rocket League', avatar: 'https://i.pravatar.cc/40?u=phoenix_rising' },
    { id: 5, name: 'anny_stage', status: 'offline', game: null, avatar: 'https://i.pravatar.cc/40?u=anny_stage' },
    { id: 6, name: 'Anton', status: 'offline', game: null, avatar: 'https://i.pravatar.cc/40?u=Anton' },
];

function FriendItem({ friend }) {
    const isOnline = friend.status !== 'offline';

    return (
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img
                        src={friend.avatar}
                        alt={friend.name}
                        className={`w-10 h-10 rounded-full transition-opacity ${!isOnline && 'opacity-50'}`}
                    />
                    {isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1f2128]"></div>}
                </div>
                <div>
                    <p className={`font-semibold ${isOnline ? 'text-white' : 'text-slate-400'}`}>{friend.name}</p>
                    {friend.status === 'playing' && <p className="text-xs text-slate-400">Playing {friend.game}</p>}
                </div>
            </div>
            {friend.game === 'Join' && (
                <button className="text-xs bg-sky-600 text-white px-3 py-1 rounded-md hover:bg-sky-700">Join</button>
            )}
        </div>
    );
}

function FriendsList() {
    return (
        <div className="h-full flex flex-col">
            <div className="relative mb-4">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="search"
                    placeholder="Search"
                    className="w-full bg-gray-700/60 rounded-md py-2 pl-10 pr-4 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </div>
            <h4 className="font-bold text-slate-200 mb-2 px-2">FRIENDS</h4>
            <div className="flex-grow overflow-y-auto -mr-2 pr-2 custom-scrollbar">
                <div className="space-y-1">
                    {friends.map(friend => <FriendItem key={friend.id} friend={friend} />)}
                </div>
            </div>
        </div>
    );
}

export default FriendsList;