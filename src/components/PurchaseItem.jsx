// src/components/PurchaseItem.jsx
import React from 'react';
import { FileText } from 'react-feather';

const PurchaseItem = ({ purchase }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 items-center gap-4 p-4 rounded-lg bg-slate-800 hover:bg-slate-700/50 transition-colors border border-transparent hover:border-sky-500/20">
            {/* Coluna 1: Jogo */}
            <div className="md:col-span-2 flex items-center gap-4">
                <img
                    src={purchase.itemCoverUrl}
                    alt={purchase.itemName}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
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
            <div className="text-left md:text-center">
                <p className="font-bold text-lg text-sky-400">{purchase.price}</p>
            </div>

            {/* Coluna 4: Recibo */}
            <div className="col-span-2 md:col-span-1 flex justify-end">
                <a
                    href="#"
                    className="flex items-center gap-2 bg-sky-600/50 hover:bg-sky-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                    title="Ver Recibo"
                >
                    <FileText size={16} />
                    <span className="hidden md:inline">Recibo</span>
                </a>
            </div>
        </div>
    );
};

export default PurchaseItem;