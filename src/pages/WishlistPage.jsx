// src/pages/WishlistPage.jsx
import React, { useState, useEffect } from 'react';
import WishlistItem from '../components/WishlistItem';
import { Heart } from 'react-feather';
import { BASE_URL } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWishlist = async () => {
        setLoading(true);
        setError(null);
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        const userId = userInfo?.id;

        if (!userId) {
            setError('Usuário não logado ou ID do usuário não encontrado.');
            setLoading(false);
            return;
        }

        try {
            const headers = { 'ngrok-skip-browser-warning': 'true' };
            const response = await fetch(`${BASE_URL}/rpc/fn_listar_lista_desejos_usuario?id_usuario_input=${userId}`, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                throw new Error('Falha ao buscar a lista de desejos.');
            }

            const data = await response.json();
            setWishlist(data);

        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    // REMOVIDO: A função handleRemoveFromWishlist não é mais necessária nesta página

    return (
        <div className="w-full">
            <header className="flex items-center gap-4 mb-8">
                <Heart size={32} className="text-red-500" />
                <h1 className="text-3xl font-bold text-white">Lista de Desejos</h1>
            </header>

            <main className="flex flex-col gap-6">
                {loading && <LoadingSpinner />}
                {error && <p className="text-center text-red-500 py-4">{error}</p>}

                {!loading && !error && wishlist.length === 0 && (
                    <p className="text-center text-slate-400 text-lg py-10">Sua lista de desejos está vazia.</p>
                )}

                {!loading && !error && wishlist.map(item => (
                    <WishlistItem
                        key={item.id}
                        item={{
                            id: item.id,
                            title: item.nome,
                            coverUrl: item.imagem_url,
                            price: `R$ ${item.preco}`,
                            salePrice: null,
                            dateAdded: ''
                        }}
                    // REMOVIDO: onRemove={...} não é mais passado
                    />
                ))}
            </main>
        </div>
    );
};

export default WishlistPage;