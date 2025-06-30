// src/pages/PurchaseConfirmPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, CheckCircle } from 'react-feather';

const PurchaseConfirmPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchGameDetails = async () => {
            if (!slug) return;
            setLoading(true);
            setError(null);
            try {
                const headers = { 'ngrok-skip-browser-warning': 'true' };
                const response = await fetch(`${BASE_URL}/rpc/fn_listar_todos_jogos`, { headers });
                if (!response.ok) throw new Error('Falha ao buscar a lista de jogos.');

                const allGames = await response.json();
                const foundGame = allGames.find(g => g.nome.toLowerCase().replace(/ /g, '-') === slug);

                if (foundGame) {
                    setGame(foundGame);
                } else {
                    throw new Error('Jogo não encontrado.');
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchGameDetails();
    }, [slug]);

    const handlePurchase = async () => {
        // NOVO: Obter informações do usuário logado do localStorage
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        const userId = userInfo?.id;
        const userEmail = userInfo?.email;

        // NOVO: Verificar se as informações do usuário estão disponíveis
        if (!userId || !userEmail) {
            alert('Erro: Informações do usuário não encontradas. Por favor, faça login novamente.');
            return;
        }

        setIsProcessing(true);
        try {
            const headers = {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            };

            // --- PASSO 1: Criar a chave de ativação ---
            const chaveId = crypto.randomUUID();
            const codigoChave = `GMWK-${crypto.randomUUID().toUpperCase().substring(0, 18)}`;
            const chaveData = {
                json_input: {
                    id: chaveId,
                    chave_ativacao: codigoChave,
                    id_jogo: game.id,
                    data_aquisicao: new Date().toISOString().split('T')[0]
                }
            };

            const chaveResponse = await fetch(`${BASE_URL}/rpc/fn_cadastrar_atualizar_chave`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(chaveData)
            });

            if (!chaveResponse.ok) {
                throw new Error("Falha ao criar a chave de ativação.");
            }

            // --- PASSO 2: Efetuar a venda (com ID do usuário logado dinâmico) ---
            const vendaData = {
                json_input: {
                    id: crypto.randomUUID(),
                    id_usuario: userId, // CORREÇÃO: Usar o ID do usuário logado
                    id_chave: chaveId,
                    data_venda: new Date().toISOString().split('T')[0],
                    valor_total: parseFloat(game.preco)
                }
            };

            const vendaResponse = await fetch(`${BASE_URL}/rpc/fn_efetuar_venda`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(vendaData)
            });

            if (!vendaResponse.ok) {
                throw new Error("Falha ao processar a venda.");
            }

            // --- PASSO 3: Enviar o e-mail de confirmação (com e-mail do usuário logado dinâmico) ---
            try {
                const emailData = {
                    email_destino: userEmail, // CORREÇÃO: Usar o e-mail do usuário logado
                    chave: codigoChave
                };
                await fetch(`${BASE_URL}/rpc/enviar_email_gmail_plpython`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(emailData)
                });
            } catch (emailError) {
                console.error("Ocorreu um erro ao tentar enviar o e-mail de confirmação, mas a compra foi concluída:", emailError);
            }

            alert(`Compra realizada com sucesso! Um e-mail de teste com sua chave foi enviado para ${userEmail}.`); // Mensagem ajustada
            navigate('/platform/buys');

        } catch (err) {
            alert(`Erro na compra: ${err.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
    if (!game) return null;

    return (
        <div className="max-w-4xl mx-auto">
            <Link to={`/platform/game/${slug}`} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-6">
                <ArrowLeft size={20} />
                Voltar para a página do jogo
            </Link>

            <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
                <div className="flex flex-col md:flex-row gap-8">
                    <img src={game.imagem_url} alt={game.nome} className="w-full md:w-48 h-auto object-cover rounded-lg" />
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold text-white">Confirmar Compra</h1>
                        <p className="text-slate-400 mt-1">Você está prestes a comprar o seguinte item:</p>

                        <div className="mt-6 bg-slate-900 p-4 rounded-md">
                            <h2 className="text-2xl font-semibold text-white">{game.nome}</h2>
                            <p className="text-lg text-sky-400 font-bold mt-2">R$ {game.preco}</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-700 my-8"></div>

                <div className="flex flex-col items-end">
                    <div className="text-right">
                        <p className="text-slate-400">Total a pagar:</p>
                        <p className="text-4xl font-extrabold text-white">R$ {game.preco}</p>
                    </div>
                    <button
                        onClick={handlePurchase}
                        disabled={isProcessing}
                        className="mt-6 w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                Processando...
                            </>
                        ) : (
                            <>
                                <CheckCircle size={20} />
                                Confirmar Compra e Pagar
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseConfirmPage;