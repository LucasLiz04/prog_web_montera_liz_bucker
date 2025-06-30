// src/components/PurchaseItem.jsx
import React from 'react';
// Ícone do recibo removido, pois o botão não existe mais
import { ShoppingCart } from 'react-feather';

const PurchaseItem = ({ purchase }) => {
    return (
        <div className="grid grid-cols-3 md:grid-cols-4 items-center gap-4 p-4 rounded-lg bg-slate-800 hover:bg-slate-700/50 transition-colors border border-transparent hover:border-sky-500/20">
            {/* Coluna 1: Jogo (ocupa mais espaço agora) */}
            <div className="md:col-span-2 flex items-center gap-4">
                <img
                    src={purchase.itemCoverUrl}
                    alt={purchase.itemName}
                    className="w-16 h-20 object-cover rounded-md flex-shrink-0"
                />
                <div>
                    <p className="font-bold text-white">{purchase.itemName}</p>
                    <p className="text-xs text-slate-400">ID do Pedido: {purchase.orderId}</p>
                </div>
            </div>

            {/* Coluna 2: Data */}
            <div className="text-left md:text-center">
                <p className="font-semibold text-slate-300">{purchase.date}</p>
            </div>

            {/* Coluna 3: Valor */}
            <div className="text-right md:text-center">
                <p className="font-bold text-lg text-sky-400">{purchase.price}</p>
            </div>

            {/* A coluna do botão de recibo foi removida. */}
        </div>
    );
};

export default PurchaseItem;