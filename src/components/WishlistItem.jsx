// src/components/WishlistItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// REMOVIDO: Importação do ícone X, pois não será mais usado

// O componente agora NÃO recebe mais uma função 'onRemove'
const WishlistItem = ({ item }) => { // onRemove foi removido das props
    const hasSale = item.salePrice && item.salePrice !== item.price;
    const slug = item.title.toLowerCase().replace(/ /g, '-');

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-800 border border-slate-700/50">
            <img
                src={item.coverUrl}
                alt={item.title}
                className="w-28 h-36 object-cover rounded-lg flex-shrink-0"
            />

            <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{item.dateAdded}</p>
            </div>

            <div className="flex flex-col items-center gap-3 ml-auto text-center">
                <div className="flex items-baseline gap-2">
                    {hasSale && (
                        <span className="text-slate-500 line-through">{item.price}</span>
                    )}
                    <span className="text-2xl font-bold text-sky-400">{hasSale ? item.salePrice : item.price}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <Link to={`/platform/buy/${slug}`} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                        Comprar
                    </Link>
                    {/* REMOVIDO: Botão de remover (o botão com o ícone X) */}
                </div>
            </div>
        </div>
    );
};

export default WishlistItem;