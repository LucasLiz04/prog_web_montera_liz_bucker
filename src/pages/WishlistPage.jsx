// src/pages/WishlistPage.jsx
import React, { useState, useEffect } from 'react';
import WishlistItem from '../components/WishlistItem';
import { Heart } from 'react-feather';
import LoadingSpinner from '../components/LoadingSpinner';
import { BASE_URL } from '../services/api';

const WishlistPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch(`${BASE_URL}/wishlist`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setItems(data);
            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch wishlist:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchWishlist();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500">Erro ao carregar lista de desejos: {error}</div>;

    return (
        <div className="w-full">
            <header className="flex items-center gap-4 mb-8">
                <Heart size={32} className="text-red-500" />
                <h1 className="text-3xl font-bold text-white">Lista de Desejos</h1>
            </header>

            <main className="flex flex-col gap-6">
                {items.length > 0 ? (
                    items.map(item => (
                        <WishlistItem key={item.id} item={item} />
                    ))
                ) : (
                    <p className="text-center text-slate-400 text-lg py-10">Sua lista de desejos está vazia.</p>
                )}
            </main>
        </div>
    );
};

export default WishlistPage;