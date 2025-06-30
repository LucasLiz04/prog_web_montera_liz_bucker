// src/pages/GameDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BASE_URL } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, CheckCircle, Star, Video, Send, Heart } from 'react-feather';

// Removendo as definições dos componentes MediaGallery e ReviewForm

const GameDetailPage = () => {
    const { slug } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInWishlist, setIsInWishlist] = useState(false);

    const fetchGameDetails = async () => {
        if (!slug) return;
        setLoading(true);
        setError(null);
        try {
            const headers = { 'ngrok-skip-browser-warning': 'true' };
            const gameResponse = await fetch(`${BASE_URL}/rpc/fn_listar_todos_jogos`, { headers });
            if (!gameResponse.ok) throw new Error('Falha ao buscar a lista de jogos.');

            const allGames = await gameResponse.json();
            const foundGame = allGames.find(g => g.nome.toLowerCase().replace(/ /g, '-') === slug);

            if (foundGame) {
                setGame(foundGame);
                const userInfo = JSON.parse(localStorage.getItem('user_info'));
                const userId = userInfo?.id;

                if (userId) {
                    const wishlistResponse = await fetch(`${BASE_URL}/rpc/fn_listar_lista_desejos_usuario?id_usuario_input=${userId}`, { headers });
                    if (wishlistResponse.ok) {
                        const wishlistData = await wishlistResponse.json();
                        const isGameInWishlist = wishlistData.some(item => item.id === foundGame.id);
                        setIsInWishlist(isGameInWishlist);
                    } else {
                        console.error('Falha ao verificar lista de desejos.');
                    }
                }
            } else {
                throw new Error('Jogo não encontrado na lista.');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGameDetails();
    }, [slug]);

    const handleWishlistToggle = async () => {
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        const userId = userInfo?.id;

        console.log('userInfo do localStorage (no GameDetailPage):', userInfo);
        console.log('ID do Usuário para a API (no GameDetailPage):', userId);

        if (!userId) {
            alert('Você precisa estar logado para gerenciar a lista de desejos.');
            return;
        }
        if (!game) return;

        try {
            const headers = {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            };

            let response;
            if (isInWishlist) {
                const body = {
                    id_usuario_input: userId,
                    id_jogo_input: game.id
                };
                response = await fetch(`${BASE_URL}/rpc/fn_excluir_lista_desejos`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                });
            } else {
                const json_input_body = {
                    id_usuario_input: userId,
                    id_jogo_input: game.id
                };
                response = await fetch(`${BASE_URL}/rpc/fn_adicionar_jogo_lista_desejos`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ json_input: json_input_body })
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Falha ao ${isInWishlist ? 'remover' : 'adicionar'} da lista de desejos.`);
            }

            const actionMessage = isInWishlist ? 'removido da' : 'adicionado à';
            alert(`Jogo ${actionMessage} lista de desejos!`);
            setIsInWishlist(!isInWishlist);

        } catch (err) {
            alert(`Erro: ${err.message}`);
        }
    };

    const handlePurchase = async () => {
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        const userId = userInfo?.id;
        const userEmail = userInfo?.email;

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

            const vendaData = {
                json_input: {
                    id: crypto.randomUUID(),
                    id_usuario: userId,
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

            try {
                const emailData = {
                    email_destino: userEmail,
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

            alert(`Compra realizada com sucesso! Um e-mail de teste com sua chave foi enviado para ${userEmail}.`);
            navigate('/platform/buys');

        } catch (err) {
            alert(`Erro: ${err.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
    if (!game) return null;

    const headerImageUrl = game.imagem_url || 'https://via.placeholder.com/1280x720';
    const ratingColor = game.avaliacao >= 8 ? 'text-green-400' : game.avaliacao >= 6 ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className="max-w-6xl mx-auto">
            <Link to={`/platform/game/${slug}`} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-6">
                <ArrowLeft size={20} />
                Voltar para a página do jogo
            </Link>

            <header className="relative h-64 md:h-80 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${headerImageUrl})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                {game.avaliacao > 0 && (
                    <div className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-lg flex items-center gap-2">
                        <Star size={24} className={ratingColor} fill={ratingColor} />
                        <span className="text-3xl font-bold text-white">{game.avaliacao}</span>
                    </div>
                )}
            </header>

            <main className="-mt-20 md:-mt-32 relative p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0 w-full mx-auto md:mx-0 md:w-64 text-center">
                        <img src={game.imagem_url} alt={game.nome} className="w-full rounded-lg shadow-xl" />
                        <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                            <span className="text-3xl font-bold text-white">{game.preco ? `R$ ${game.preco}` : 'Grátis'}</span>
                            <Link to={`/platform/buy/${slug}`} className="block mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors text-center">
                                Comprar
                            </Link>
                            {/* BOTÃO DA LISTA DE DESEJOS AGORA É FUNCIONAL E DINÂMICO */}
                            <button
                                onClick={handleWishlistToggle}
                                className={`mt-2 w-full font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${isInWishlist ? 'bg-red-600/50 hover:bg-red-600 text-white' : 'bg-sky-600/50 hover:bg-sky-600 text-white'}`}
                            >
                                <Heart size={18} />
                                {isInWishlist ? 'Remover da Lista' : 'Adicionar à Lista'}
                            </button>
                        </div>
                    </div>

                    <div className="flex-grow">
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white">{game.nome}</h1>
                        <p className="mt-6 text-slate-200">{game.descricao}</p>
                        {/* Removido MediaGallery e ReviewForm */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GameDetailPage;