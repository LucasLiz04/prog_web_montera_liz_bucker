// src/pages/BuysPage.jsx
import React, { useState, useEffect } from 'react';
import PurchaseItem from '../components/PurchaseItem';
import { ShoppingCart } from 'react-feather';
import LoadingSpinner from '../components/LoadingSpinner';
import { BASE_URL } from '../services/api';

const BuysPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await fetch(`${BASE_URL}/purchases?order=date.desc`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setPurchases(data);
            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch purchases:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchPurchases();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500">Erro ao carregar histórico de compras: {error}</div>;

    return (
        <div className="w-full">
            <header className="flex items-center gap-4 mb-8">
                <ShoppingCart size={32} className="text-sky-400" />
                <h1 className="text-3xl font-bold text-white">Histórico de Compras</h1>
            </header>

            <div className="hidden md:grid grid-cols-5 gap-4 px-4 mb-2 text-sm font-semibold text-slate-400">
                <div className="col-span-2">Produto</div>
                <div className="text-center">Data</div>
                <div className="text-center">Valor</div>
                <div className="text-right">Detalhes</div>
            </div>

            <main className="space-y-4">
                {purchases.map(purchase => (
                    <PurchaseItem key={purchase.id} purchase={purchase} />
                ))}
            </main>
        </div>
    );
};

export default BuysPage;