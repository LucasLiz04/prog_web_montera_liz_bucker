// src/components/WishlistItem.jsx
import React from 'react';
import { ShoppingCart, X } from 'react-feather';

const WishlistItem = ({ item }) => {
    const hasSale = item.salePrice && item.salePrice !== item.price;

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-800 border border-slate-700/50">
            {/* Imagem */}
            <img
                src={item.coverUrl}
                alt={item.title}
                className="w-28 h-36 object-cover rounded-lg flex-shrink-0"
            />

            {/* Informações do Jogo */}
            <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 mt-1">Adicionado em: {item.dateAdded}</p>
            </div>

            {/* Preço e Ações */}
            <div className="flex flex-col items-center gap-3 ml-auto text-center">
                <div className="flex items-baseline gap-2">
                    {hasSale && (
                        <span className="text-slate-500 line-through">{item.price}</span>
                    )}
                    <span className="text-2xl font-bold text-sky-400">{hasSale ? item.salePrice : item.price}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-red-500/20 rounded-full transition-colors" title="Remove from Wishlist">
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishlistItem;