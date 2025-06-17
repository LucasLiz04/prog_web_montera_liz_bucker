// src/pages/FriendsPage.jsx
import React, { useState, useEffect } from 'react';
import { Search, UserPlus } from 'react-feather';
import FriendCard from '../components/FriendCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { BASE_URL } from '../services/api';

const FriendsPage = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                // Exemplo de endpoint. Peça ao seu amigo o correto.
                const response = await fetch(`${BASE_URL}/friends`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFriends(data);
            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch friends:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchFriends();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500">Erro ao carregar amigos: {error}</div>;

    return (
        <div className="w-full">
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <h1 className="text-3xl font-bold text-white">
                    Friends <span className="text-lg bg-sky-500 text-white rounded-full px-3 py-1">{friends.length}</span>
                </h1>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:max-w-xs">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="search" placeholder="Search friends..." className="w-full bg-[#062448] border-2 border-transparent focus:border-[#50A6D9] text-white rounded-lg py-2.5 pl-12 pr-4 placeholder-gray-400 focus:outline-none focus:ring-0 transition-colors" />
                    </div>
                    <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"> <UserPlus size={20} /> <span>Add</span> </button>
                </div>
            </header>

            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {friends.map(friend => (
                    <FriendCard key={friend.id} friend={friend} />
                ))}
            </main>
        </div>
    );
};

export default FriendsPage;