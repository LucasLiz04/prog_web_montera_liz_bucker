// src/pages/BuysPage.jsx
import React from 'react';
import PurchaseItem from '../components/PurchaseItem';
import { ShoppingCart } from 'react-feather';

// --- DADOS FICTÍCIOS ---
const purchasesData = [
    {
        id: 1,
        itemName: 'Cyberpunk 2077: Phantom Liberty',
        itemCoverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6azc.jpg',
        orderId: 'A4B7-C9D2-E3F5',
        date: '10 de jun, 2025',
        price: 'R$ 99,90',
    },
    {
        id: 2,
        itemName: 'Hades',
        itemCoverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co260d.jpg',
        orderId: 'G8H1-I2J4-K5L7',
        date: '02 de mai, 2025',
        price: 'R$ 47,49',
    },
    {
        id: 3,
        itemName: 'Elden Ring',
        itemCoverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg',
        orderId: 'M9N2-O4P6-Q8R1',
        date: '15 de abr, 2025',
        price: 'R$ 249,90',
    },
];
// --- FIM DOS DADOS ---

const BuysPage = () => {
    return (
        <div className="w-full">
            {/* Cabeçalho */}
            <header className="flex items-center gap-4 mb-8">
                <ShoppingCart size={32} className="text-sky-400" />
                <h1 className="text-3xl font-bold text-white">Histórico de Compras</h1>
            </header>

            {/* Cabeçalho da Lista (visível em telas maiores) */}
            <div className="hidden md:grid grid-cols-5 gap-4 px-4 mb-2 text-sm font-semibold text-slate-400">
                <div className="col-span-2">Produto</div>
                <div className="text-center">Data</div>
                <div className="text-center">Valor</div>
                <div className="text-right">Detalhes</div>
            </div>

            {/* Lista de Compras */}
            <main className="space-y-4">
                {purchasesData.map(purchase => (
                    <PurchaseItem key={purchase.id} purchase={purchase} />
                ))}
            </main>
        </div>
    );
};

export default BuysPage;