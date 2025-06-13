// src/pages/WishlistPage.jsx
import React from 'react';
import WishlistItem from '../components/WishlistItem';
import { Heart } from 'react-feather';

// --- DADOS FICTÍCIOS ---
const wishlistData = [
    {
        id: 1,
        title: 'Hollow Knight: Silksong',
        coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x9f.jpg',
        price: 'R$ 75,00',
        salePrice: null,
        dateAdded: '01 de jan, 2025',
    },
    {
        id: 2,
        title: 'Death Stranding 2: On The Beach',
        coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4j5w.png',
        price: 'R$ 350,00',
        salePrice: null,
        dateAdded: '15 de fev, 2025',
    },
    {
        id: 3,
        title: 'The Outer Worlds 2',
        coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3g54.jpg',
        price: 'R$ 299,00',
        salePrice: 'R$ 149,50',
        dateAdded: '20 de mar, 2025',
    },
];
// --- FIM DOS DADOS ---

const WishlistPage = () => {
    return (
        <div className="w-full">
            {/* Cabeçalho */}
            <header className="flex items-center gap-4 mb-8">
                <Heart size={32} className="text-red-500" />
                <h1 className="text-3xl font-bold text-white">Lista de Desejos</h1>
            </header>

            {/* Lista de Itens */}
            <main className="flex flex-col gap-6">
                {wishlistData.length > 0 ? (
                    wishlistData.map(item => (
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