// src/pages/BuysPage.jsx
import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'react-feather'; // Ícone correto para sacola de compras
import PurchaseItem from '../components/PurchaseItem'; // CORREÇÃO: Importar PurchaseItem
import { BASE_URL } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner'; // Importar LoadingSpinner

const BuysPage = () => {
    const [buys, setBuys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBuys = async () => {
            setLoading(true);
            setError(null);
            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            const userId = userInfo?.id; // Já corrigido para 'id'

            if (!userId) {
                setError('Usuário não logado ou ID do usuário não encontrado.');
                setLoading(false);
                return;
            }

            try {
                const headers = { 'ngrok-skip-browser-warning': 'true' };
                const response = await fetch(`${BASE_URL}/rpc/fn_listar_vendas_usuario?id_usuario_input=${userId}`, {
                    method: 'GET',
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error('Falha ao buscar histórico de compras.');
                }

                const data = await response.json();
                // CORREÇÃO: A API já retorna uma lista PLANA de jogos comprados.
                // Não precisamos de flatMap(buy => buy.jogos_comprados || [])
                setBuys(data); // Define os dados diretamente

            } catch (e) {
                setError(e.message);
                console.error("Erro ao buscar histórico de compras:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchBuys();
    }, []);

    return (
        <div className="w-full">
            <header className="flex items-center gap-4 mb-8">
                <ShoppingBag size={32} className="text-sky-500" />
                <h1 className="text-3xl font-bold text-white">Histórico de Compras</h1>
            </header>

            <main className="flex flex-col gap-6">
                {loading && <LoadingSpinner />}
                {error && <p className="text-center text-red-500 py-4">{error}</p>}

                {!loading && !error && buys.length === 0 && (
                    <p className="text-center text-slate-400 text-lg py-10">Você ainda não fez nenhuma compra.</p>
                )}

                {!loading && !error && buys.map(item => (
                    <PurchaseItem // Usar o nome correto do componente
                        key={item.id} // CORREÇÃO: Use item.id diretamente da resposta da API
                        purchase={{ // A prop 'purchase' do PurchaseItem
                            itemName: item.nome, // CORREÇÃO: item.nome (não nome_jogo)
                            itemCoverUrl: item.imagem_url,
                            orderId: item.id, // CORREÇÃO: item.id (o ID da venda/item)
                            date: new Date(item.data_venda).toLocaleDateString('pt-BR'), // CORREÇÃO: data_venda (não data_compra)
                            price: `R$ ${item.valor_total.toFixed(2).replace('.', ',')}`, // CORREÇÃO: valor_total (não preco_pago)
                        }}
                    />
                ))}
            </main>
        </div>
    );
};

export default BuysPage;